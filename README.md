# Auto Guardian

A command line utility to generate test cases for react components using AI.

![](https://media3.giphy.com/media/sx6Tlo7xrzF2m24mNs/giphy.gif)


## NOTE

This is a work in progress and is not ready for use. It originated from a talk I gave at React Nexus 2024.
Here are the [slides](https://slides.com/rajatvijay/ai-generated-test-cases/fullscreen) for the talk.

## Setup

1. `npm install`
2. `export OPENAI_API_KEY=<your-openai-api-key>`

## Usage

Run an example from the talk

1. `npm run auto-guardian -- -p ./src/talk-examples/hierarchy/ParentComponent.tsx -n ParentComponent`
2. `npm run auto-guardian -- -p ./src/talk-examples/redux-connected/Page.tsx -n Page`

## Contributing

There are no open issues right now but a few proposals on the [roadmap](https://github.com/users/rajatvijay/projects/1). Feel free to comment on any item in the roadmap you want to work on and I will create an issue and assign it to you.
If you have any other ideas, feel free to open an issue.
