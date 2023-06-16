#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  getListCommand,
  getAddCommand,
  getRemoveCommand,
  getClearCommand,
} from "./controller/controller.js";

/**
 * Define the commands you need using 
 * the yargs() function
 */
yargs(hideBin(process.argv))
  .command("list", "List all the things", () => {
    //TODO: Add the behavior of your command here
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
      //TODO: Add the behavior of your command here
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
      //TODO: Add the behavior of your command here
      getRemoveCommand(argv);
    }
  )
  .command("clear", "Remove all things", () => {
    getClearCommand();
  })
  .help()
  .demandCommand()
  .parse();
