# Framework for building libraries and npm packages for Back-End as a CLI (global node package)

## Commands

- `npm login`
- `npm publish` - to publish / update a package
- `npm unpublish [package_name]` - to delete

---

## Framework structure

The purpose of this boilerplate/framework is to quickly enable you to start developing `NodeJS` global packages that work as a **CLI** tool.

It allows you to write code in the form of `Typescript` that will be compiled in JavaScript `es6`.

The output will be placed inside `dist` folder and it's represented by two files.

- `index.js` - you JS and CSS code bundled in one file
- `src/*.d.ts` - types for your code (not required for a CLI tool, but they are there and you can disable them from `tsconfig.json` by settings `declaration:false`)

**!**

The toolchain will not bundle the `node_modules` libraries.
They are ommited using `externals: [nodeExternals()]` property in `webpack.config.js`,

As an example for this behavior `express` was installed. You can run `npm run build:prod` and inspect the code from `index.js`.

**!**

`Source Mapping` is enabled in webpack for `development` environment with `cheap-module-source-map` option by default.

You can modify it with your desired [value](https://webpack.js.org/configuration/devtool/)

---

## CLI behavior

The following config was created to have the CLI behavior and to make the package run globally

1. `bin` property from `package.json`

   ```json
   "bin": {
       "framework-for-building-back-end-libraries": "./bin/cli.js"
   },
   ```

   The property `framework-for-building-back-end-libraries` represents the command that you can write in your terminal to execute the package after it was installed

   `./bin/cli.js` represents the file that will be executed

2. main `js` file to be called when your command from `bin` is executed

   `bin/cli.js`

   ```js
   #!/usr/bin/env node
   require("../dist/index.js");
   ```

   The `cli.js` file will only load the bundled code `index.js`

   `#!/usr/bin/env node` - will allow npm to correctly generate an executable for this module

---

## Start developing your library (and testing)

0. The toolchain doesn't require any modification. In `package.json` just replace `framework-for-building-back-end-libraries` with your desired name for both `main` and `bin`.

1. To test your code just import it in any test file like in the example from `test` folder.

   _If you have problems related to imports while testing with Jest, you can set `esModuleInterop` to `true` in `compilerOptions` from `tsconfig.json`_

2. To manually test your code run `npm start:dev` and then execute the output from `dist` -> `$ node dist/index.js`
3. To that it works as global pacakge, firstly run `npm link` inside the root of your project and then run the command from `bin` property (in this example `framework-for-building-back-end-libraries`)

   _to remove the link, run `$ npm unlink`_

---

## Publishing

- Build before publish - you can add this property inside `package.json` in `scripts` object, if you need a hook before you publish your package. This command will be executed when you run `npm publish`, but before publishing the code.

  ```json
  "prepublishOnly": "webpack --mode=production",
  ```

- Versioning - each time you run `npm publish`, be sure to update the version in `"version": "1.0.0"` property inside `package.json`. Otherwise you won't be able to deploy a new version.

- Ignoring files - use `.npmgignore` in the same way as `.gitignore`, but for npm
