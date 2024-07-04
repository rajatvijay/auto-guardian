import { Command } from 'commander';
import { generateUnitTests } from './testGenerator';

const program = new Command();

program
  .version('1.0.0')
  .description('Auto Guardian')
  .requiredOption('-p, --path <path>', 'Path to the React component file')
  .requiredOption('-n, --name <name>', 'Name of the React component')
  .option('-g, --guidelines <guidelines>', 'Path to the guidelines file')
  .action(async (options) => {
    const { path, name, guidelines } = options;
    await generateUnitTests(name, path, guidelines);
  });

program.parse(process.argv);
