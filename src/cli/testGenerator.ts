import fs from "fs-extra";
import path from "path";
import { confirm, input } from "@inquirer/prompts";
// import chalk from "chalk";
import { highlight } from "cli-highlight";
import { OpenAI } from "openai";
import { ASSITANT_INSTRUCTION, MODEL_NAME } from "./config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const readFileContent = async (filePath: string): Promise<string> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    logToTerminal(`Error reading file ${filePath}: ${err}`, { level: "error" });
    throw err;
  }
};

const getLocalImports = (code: string, dir: string): string[] => {
  const localImports: string[] = [];
  const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
  const extensions = [".js", ".jsx", ".ts", ".tsx"];
  let match;

  while ((match = importRegex.exec(code)) !== null) {
    let importPath = match[1];
    if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
      continue;
    }

    let fullImportPath = path.resolve(dir, importPath);
    if (!fs.existsSync(fullImportPath)) {
      for (const ext of extensions) {
        if (fs.existsSync(fullImportPath + ext)) {
          fullImportPath += ext;
          break;
        }
      }
    }

    if (fs.existsSync(fullImportPath)) {
      localImports.push(fullImportPath);
    } else {
      logToTerminal(`Could not resolve import path: ${importPath}`, {
        level: "warn",
      });
    }
  }

  return localImports;
};

const collectChildComponentCodes = async (
  filePath: string
): Promise<string[]> => {
  const visited = new Set<string>();
  const toVisit = [filePath];
  const codes: string[] = [];

  while (toVisit.length > 0) {
    const currentPath = toVisit.pop();
    if (!currentPath || visited.has(currentPath)) continue;
    visited.add(currentPath);

    const code = await readFileContent(currentPath);
    codes.push(code);

    const dir = path.dirname(currentPath);
    const localImports = getLocalImports(code, dir);

    toVisit.push(...localImports);
  }

  // The first element is the parent code itself, which should be removed. The rest are child components.
  return codes.slice(1);
};

// TODO: Handle error
// TODO: Make more user friendly to read the output
export const generateUnitTests = async (
  componentName: string,
  componentFilePath: string,
  guidelinesFilePath?: string
): Promise<void> => {
  const componentCode = await readFileContent(componentFilePath);
  const childComponentCodes =
    await collectChildComponentCodes(componentFilePath);
  const guidelines = guidelinesFilePath ? await readFileContent(guidelinesFilePath) : "";

  const assistant = await openai.beta.assistants.create({
    name: "AutoGuardian - Component Test Generator",
    model: MODEL_NAME,
    instructions: ASSITANT_INSTRUCTION,
  });

  const thread = await openai.beta.threads.create();

  let message = generateInitalMessage(
    componentName,
    componentCode,
    childComponentCodes,
    guidelines
  );

  while (true) {
    await addMessageToThread(thread.id, message);
    logToTerminal("\n\n");
    await streamThread(thread.id, assistant.id);
    const wantToMakeUpdates = await confirm({
      message: "\n\nDo you want to make changes to the code?",
      default: false,
    });
    if (wantToMakeUpdates) {
      // TODO: Add descriptive message for the user
      message = await input({ message: "What changes would you like to make?" });
    } else {
      break;
    }
  }
};

async function addMessageToThread(threadId: string, content: string) {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content,
  });
}

function generateInitalMessage(
  componentName: string,
  componentCode: string,
  childComponentCodes: string[],
  guidelines: string
) {
  const contextCode = [componentCode, ...childComponentCodes].join("\n");
  const firstLine = `Write integration test cases for component named ${componentName}.`
  const guidelinesMessage = guidelines ? `The guidelines for the test cases are as follows:\n${guidelines}` : "";
  const contextMessage = `The component hierarchy code is as follows:\n${contextCode}`;
  return `${firstLine}\n\n${guidelinesMessage}\n\n${contextMessage}`;
}

function streamThread(threadId: string, assistantId: string) {
  return new Promise((resolve) => {
    openai.beta.threads.runs
      .stream(threadId, {
        assistant_id: assistantId,
      })
      .on("textDelta", (textDelta, snapshot) => {
        logToTerminal(outputMarkdown(textDelta.value || ""), { stream: true });
      })
      .on("end", () => {
        resolve(true);
      });
  });
}

function outputMarkdown(content: string) {
  const highlightOptions = {
    language: "typescript",
    ignoreIllegals: true,
  };
  return highlight(content, highlightOptions);
}

function logToTerminal(
  content: string,
  options?: {
    level?: "log" | "info" | "warn" | "error";
    stream?: boolean;
  }
) {
  const { level = "info", stream = false } = options || {};
  if (stream) {
    process.stdout.write(content);
  } else {
    console[level](content);
  }
}
