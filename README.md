# Taguig City University Website

[![Logo](https://upload.wikimedia.org/wikipedia/en/1/17/TCUNewLogo.jpg)](#)

Front-End

## Software requirements

- [Node.js](https://nodejs.org/en)

## Initialization (One-time execution)

Assuming that node.js is already installed

1. Install [yarn](https://www.npmjs.com/package/yarn) (Optional)

   ```bash
   npm install -g yarn
   ```

1. Install application dependencies

   ```bash
   yarn install
   ```

1. Setup [environment variables](https://en.wikipedia.org/wiki/Environment_variable)

   - [local environment](.env.local)
   - [Machine](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html)

1. Generate database models

   ```bash
    yarn run prisma generate
   ```

## Commands

| Command        | Description               |
| -------------- | ------------------------- |
| yarn run build | build                     |
| yarn run start | start                     |
| yarn run dev   | start in development mode |
