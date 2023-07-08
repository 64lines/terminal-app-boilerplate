# Terminal Application Boilerplate

Boilerplate template for terminal applications based on NodeJS.
- **Commands:** You can add commands on the `index.js` file using the `yargs` library.
- **Behaviors:** You can add the behavior of the application on the `controller/controllers.js` file. More on the Behaviors section.
- **Persistence:** You can store information using the `Persistence` (`persistence/models`) algebraic structure based on the repository pattern. More on the Persistence section.

Run the application using the following command:

```bash
yarn start
```

This will show the application documentation, from there you can execute any command by using `yarn start <command>`

```text
apps <command>

Commands:
  apps list    List all the applications
  apps add     Add a new application
  apps remove  Remove an application

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

You can install the application by using the following command:

```bash
yarn install:app
```

Once installed you can call the application in your terminal by using the name defined on the `package.json` file, e.g.:
```bash
$ untitled-terminal-app list 
```

## Behaviors

You can execute commands using the following code snippet.

```js
import { execSync } from "child_process";

execSync(`open -a Opera "https://www.yahoo.co.jp"`)
```

You can also change the terminal text  color using the following snippet.

```js
import chalk from "chalk";

console.log(chalk.yellow(`Searching ${term}...`));
```

## Persistence

To persist information as a JSON file you can use the following `Persistence` algebraic structure.

```js
import fs from "fs";

/**
 * Persistence Algebraic Structure, it allows to create a CRUD of any data object
 * using a local JSON File.
 * @param {*} storage: localStorage or sessionStorage.
 * @returns { start, clear, create, edit, get, delete, getAll }
 */
export const Persistence = (filename) => ({
  store: (list) => {
    fs.writeFileSync(filename, JSON.stringify({ data: list }));
    return Persistence(filename);
  },
  load: () => {
    try {
      const dataFile = fs.readFileSync(filename, "utf-8");
      return JSON.parse(dataFile).data;
    } catch (e) {
      return Persistence(filename).start().load();
    }
  },
  start: () => {
    Persistence(filename).store([]);
    return Persistence(filename);
  },
  clear: () => {
    Persistence(filename).start();
    return Persistence(filename);
  },
  create: (data) => {
    const dataList = Persistence(filename).getAll();
    Persistence(filename).store([
      ...dataList,
      { id: dataList.length + 1, ...data },
    ]);
    return Persistence(filename);
  },
  edit: (data) => {
    Persistence(filename).store([
      ...Persistence(filename)
        .getAll()
        .filter((item) => item.id !== data.id),
      data,
    ]);
    return Persistence(filename);
  },
  get: (id) => {
    return Persistence(filename)
      .getAll()
      .find((item) => item.id === id);
  },
  delete: (id) => {
    Persistence(filename).store(
      Persistence(filename)
        .getAll()
        .filter((item) => item.id !== id)
    );
    return Persistence(filename);
  },
  getAll: () => {
    return Persistence(filename).load();
  },
});
```

Also you can use the following functions to implement the `Persistence` algebraic structure in your code. The `Persistence` algebraic structure will store and get any information you handle with your controller from the `data/data.json` file.

```js
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import { Persistence } from "../persistence/persistence.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PERSISTENCE_LOCATION = path.join(__dirname, "../../data/data.json");

const persistence = Persistence(PERSISTENCE_LOCATION);

export function getListCommand() {
  const appsList = persistence.getAll();

  if (!appsList.length) {
    console.log(chalk.yellow(`(i) No things available.\n`));
    return;
  }

  appsList.forEach((item) => {
    console.log(
      `${chalk.yellow(`${item.id}.`)} ${chalk.bold.green(item.name)}: ${
        item.description
      }`
    );
  });

  // Additional Space
  console.log("");
}

export function getAddCommand(argv) {
  const { name, description, command } = argv;
  persistence.create({ name, description, command });
  console.log(chalk.bold.yellow(`\nThe new thing \"${name}\" was created!\n`));
}

export function getRemoveCommand(argv) {
  const id = Number(argv.id);
  const application = persistence.get(id);
  persistence.delete(id);
  console.log(
    chalk.bold.red(`\nThe new thing \"${application.name}\" was removed!\n`)
  );
}

export function getClearCommand() {
  persistence.clear();
  console.log(
    chalk.bold.red(`\nAll the things were removed from the database!\n`)
  );
}

```