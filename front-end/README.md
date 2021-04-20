# Framework for building libraries and npm packages for Front-End

## Commands

- `npm login`
- `npm publish` - to publish / update a package
- `npm unpublish [package_name]` - to delete

## Framework structure

The framework allows you to write code in the form of Typescript and SCSS, code that will be compiled in JavaScript and CSS.

The output will be placed inside `dist` folder and it's represented by two files.

- `my-library.js` - you JS and CSS code bundled in one file
- `my-library.d.ts` - types for your code

**The SCSS files need to be imported in the main TypeScript file.**

Default, Webpack is configured to include the CSS code inside the JavaScript file which will create the `<style></style>` tag and populate it with the corresponding style.

If you want to place the CSS output in a separate file and have them both included in your application then cut these lines from `config` object

```javascript
{
test: /\.s?css$/,
use: [
    'style-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: 'postcss.config.js',
            },
        },
    },
    'sass-loader',
    ],
},
```

and place them here

```javascript
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // * add some development rules here
  } else if (argv.mode === 'production') {
    // * add some prod rules here
  } else {
    throw new Error('Specify env');
  }

  return config;
};
```

Full example:

```javascript
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // * scss
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js',
            },
          },
        },
        'sass-loader',
      ],
    });
  } else if (argv.mode === 'production') {
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'postcss.config.js',
            },
          },
        },

        'sass-loader',
      ],
    });
  } else {
    throw new Error('Specify env');
  }

  return config;
};
```

## Start developing your library (and testing)

1. Inside src folder, change the name of the main file, from `my-library.ts` to the desired filename.
2. Update this name inside `package.json` in `main` and `types` properties.
3. Update this name in `webpack.config.js` in `entry` and `output` properties.
4. To test your code just import it in any test file like in the example from `test` folder.
5. To test the code on the UI, update the `<script></script>` tag in `index.html` file from `demo` folder.
6. Open `index.html` with a Live Server or as a simple file and test the library.

## Browser or node

If your library it's made to be used by the browser, then set the `target` to `web`. If it's made to be used in the NodeJS environment, then set it to `node`.

In order for the library to be used both as a module and as a global object available in `window`, then use this properties:

```javascript
libraryTarget: 'umd',
globalObject: 'this',
umdNamedDefine: true,
```

`webpack.config.js`

```javascript
target: 'web',
entry: {
    index: './src/my-library.ts',
},
output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'my-library.js',
    library: 'MyLibrary',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
},
```

The exports are available under the name set in `library` property.

`index.html`

```html
<script src="./dist/my-library.js"></script>
<script>
  const { isPrimeNumber } = window.MyLibrary;
</script>
```

`.js or .ts file`

```javascript
import { isPrimeNumber } from '../src/my-library';
```

## Default export

If you want to export by default, you can add the following property, `libraryExport: 'default'`, in `webpack.config.js` under `config.output`.

Then, in your main library file use `export default`, for example `export default class MyClass{}`.

## Publishing

- In `package.json` add a new property named `files`, with the location to your distribution code.

  ```json
  "files": [
      "dist"
  ],
  ```

- Build before publish - you can add this property inside `package.json` in `scripts` object, if you need a hook before you publish your package. This command will be executed when you run `npm publish`, but before publishing the code.

  ```json
  "prepublishOnly": "webpack --mode=production",
  ```

- Versioning - each time you run `npm publish`, be sure to update the version in `"version": "1.0.0"` property inside `package.json`. Otherwise you won't be able to deploy a new version.

- Ignoring files - use `.npmgignore` in the same way as `.gitignore`, but for npm

## Testing

For more indeepth testing, `Jest` and `Cypress` are configured and they both contain a dummy example.

### Jest

`npm run test`
`npm run test:watch`
`npm run test:cov`

### Cypress

- start a live server to serve the `index.html` file from `demo` folder.
- in `cypress/integration/test.spec.js` update the `URL` if required.
- run `npx cypress open`

## CDN

Each npm package is available on [UNPKG](https://unpkg.com/).
This fits very well if your library is made for the web.
