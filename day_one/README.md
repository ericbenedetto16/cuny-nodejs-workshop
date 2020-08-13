# Node.js and Typescript Intro - Day One

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) | [Installation Video](https://www.youtube.com/watch?v=JINE4D0Syqw) (You Do Not Need Chocolatey)
- [PostMan](https://www.postman.com/downloads/)

### After Node Installation

- TypeScript | `npm i -g --save typescript`

## Understanding the Files

- `package.json` lists metadata about the project that is used for configuration
- `package-lock.json` is used to keep track of the modules installed

## [es6.ts](es6.ts)

This file shows how ES6 Syntax differs from Vanilla JavaScript, and also shows how Vanilla JavaScript is valid TypeScript

### Running es6.ts

- `tsc es6`
- `node es6.js`

## [strongtypes.ts](strongtypes.ts)

This file shows the main convention of TypeScript and how variables can be typed

### Running strongtypes.ts

- `tsc strongtypes`
- `node strongtypes`

## [Server.js](server.js)

This file contains the boilerplate code that shows the simplicity of creating an API with Express.js

### Running The Server

- `npm i && npm run dev`
