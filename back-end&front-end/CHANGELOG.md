# Changelog

All notable changes to `back-end&front-end` will be documented in this file.

# [v1.1.0]

### Chore

- update in `webpack` file under `browserConfig.output`; the output now has `umdNamedDefine:true` and `library:MyLibrary`; this is necessary so that, if it is added using a `script` tag in the browser, the output is bonded to the global window object with a predefined value
