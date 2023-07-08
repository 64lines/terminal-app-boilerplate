#!/usr/bin/env node
import yargs from "yargs/yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";

/**
 * Define the commands you need using 
 * the yargs() function
 */
yargs(hideBin(process.argv))
  .command("search", "List all the things",({ argv }) => {
    const {_} = argv;
    const [, term] = _;

    if (!term) {
      return;
    }

    console.log(chalk.yellow(`Searching ${term}...`))
    execSync(`open -a Opera "https://www.google.com/search?q=${term}"`)
  })
  .help()
  .demandCommand()
  .parse();
