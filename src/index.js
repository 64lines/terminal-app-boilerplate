#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  getListCommand,
  getAddCommand,
  getRemoveCommand,
  getClearCommand,
} from "./controller/controller.js";

// Define your commands using yargs
yargs(hideBin(process.argv))
  .command("list", "List all the things", () => {
    getListCommand();
  })
  .command(
    "add",
    "Add a new thing",
    {
      name: {
        alias: "n",
        description: "Thing name",
        type: "string",
        demandOption: true,
      },
      description: {
        alias: "d",
        description: "Thing description",
        type: "string",
        demandOption: true,
      }
    },
    (argv) => {
      getAddCommand(argv);
    }
  )
  .command(
    "remove",
    "Remove an thing",
    {
      id: {
        describe: "Thing id",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      getRemoveCommand(argv);
    }
  )
  .command("clear", "Remove all things", () => {
    getClearCommand();
  })
  .help()
  .demandCommand()
  .parse();
