# Framework for bulding libraries for both browser and NodeJS

## Commands

- `npm login`
- `npm publish` - to publish / update a package
- `npm unpublish [package_name]` - to delete

---

## Framework structure

The purpose of this boilerplate/framework is to quickly enable you to start developing `NodeJS` and `Browser` libraries.

It allows you to write code in the form of `Typescript` that will be compiled in JavaScript `es6`.

As a starting point, it's assuming that the library will require to send requests using the `fetch` API in the browser and a custom library like `node-fetch` in NodeJS.

The output will be placed inside `dist` folder and it's represented by the following files.

- `browser.js` the output for browser (this file must be imported for a browser scenario)
- `node.js` the output for NodeJS (this file must be imported for a NodeJS scenario)
- `main.js` the common code between them
- `*.d.ts` - declaration for browser,main and node js

**!**

The toolchain will not bundle the `node_modules` libraries.
They are ommited using `externals: [nodeExternals()]` property in `webpack.config.js`,

As an example for this behavior `node-fetch` was installed. You can run `npm run build:prod` and inspect the code from `index.js`.

**!**

`Source Mapping` is enabled in webpack for `development` environment with `cheap-module-source-map` option by default.

You can modify it with your desired [value](https://webpack.js.org/configuration/devtool/)

---

### Webpack

Webpack exposes two config objects `nodeConfig` and `browserConfig`. Both of them extend `generalConfig`.

The configuration was inspired from their [documentation](https://webpack.js.org/concepts/targets/).

**! The library is exported as default**

#### Browser

In a browser scenario where the library will be added using a `script` tag, then the code will bind to global object `window` using the name from `browserConfig.output.library`. In this case `MyLibrary`.

---

## Testing

For testing, `Jest` is configured and contains a dummy example.

### Jest

`npm run test`
`npm run test:watch`
`npm run test:cov`

---

## Publishing

- Build before publish and expose the files for a more appealing import - you can add this property inside `package.json` in `scripts` object, if you need a hook before you publish your package. This command will be executed when you run `npm publish`, but before publishing the code.

  ```json
  "prepublishOnly": "webpack --mode=production && npm run expose",
  ```

- Versioning - each time you run `npm publish`, be sure to update the version in `"version": "1.0.0"` property inside `package.json`. Otherwise you won't be able to deploy a new version.

- Ignoring files - use `.npmgignore` in the same way as `.gitignore`, but for npm

**!**

No value for the properties `main`, `types` or `files` was specified in `package.json`, because here there is no main file, but rather two main files each one for a specific env.

The library must be imported

```
const Library = require("library/node");
```

```
import Library from "library/browser";
```

Where `browser` and `node` match the exact file name that will be created `browser.js` and `node.js`.

By default, these files are exported in the `dist` folder and the root of the module will be `./`. Therefore to import them, the following syntax is required `require("library/dist/node");`. To remove the need to specifying `/dist/` the `npm run expose` command is used which will unwrap the folder `dist` in the root folder.

To eliminate the need to manually delete files after publishing the package, these commands can be run in an ephemeral volume, such as a CI / CD pipe, or can be added manually in `.gitignore`
