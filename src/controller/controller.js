import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import { Persistence } from "../persistence/persistence.js";
import { exec } from "child_process";

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

export function getExecCommand(argv) {
  const [ , appName ] = argv._;

  if (!appName) {
    return;
  }

  const application = persistence.getAll().find(item => item.name === appName)

  if (!application) {
    return;
  }

  exec(application.command, (error, stdout, stderr) => {
    if (error) {
        console.log(error.message);
        return;
    }
    if (stderr) {
        console.log(stderr);
        return;
    }
    console.log(stdout);
  });
}