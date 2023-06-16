# Terminal Application Boilerplate

Boilerplate template for terminal applications based on NodeJS.
- **Commands:** Add commands on the `index.js` file using the `yargs` library.
- **Behaviors:** Add the behavior of the application on the `controller/controllers.js` file.
- **Persistence:** Store information using the `Persistence` (`persistence/models`) algebraic structure based on the repository pattern.

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