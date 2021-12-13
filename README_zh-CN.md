[![@lzwme/feps-webpack-plugin](https://nodei.co/npm/@lzwme/feps-webpack-plugin.png)][npm-url]

# @lzwme/feps-webpack-plugin

[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
[![npm download][download-badge]][download-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]
[![minzipped size][bundlephobia-badge]][bundlephobia-url]

**函数执行性能统计插件。**

此插件用于函数执行性能统计，通过注入统计代码的方式计算执行耗时发现慢函数。

## Getting Started

首先在项目中安装插件依赖。示例:

```console
pnpm install -D @lzwme/feps-webpack-plugin
```

然后在 `webpack` 配置中添加插件配置。示例：

**webpack.config.js**

```js
// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const FEPSPlugin = require('@lzwme/feps-webpack-plugin');

module.exports = {
  plugins: [
    new FEPSPlugin({
      // debug: true,
      // disabled: false,
      rootDir: __dirname,
      timeLimit: 50,
      logger: 'console.warn', // 'globalThis.logger.report',
      include: [/\.(tsx?|jsx?)$/],
      exclude: ['node_modules', /\.ignore\./],
    }),
  ],
};
```

## Options


|     Name    |    Type    |     Default      | Description                                      |
| :---------: | :--------: | :--------------: | :----------------------------------------------- |
| `debug`     | `{boolean}`| `false`          | debug for print details info |
| `disabled`  | `{boolean}`| `false`          | Disable the plugin |
| `rootDir`   | `{String}` | `process.cwd()`  | Project root directory |
| `logger`    | `{String}` | `console.warn`   | 指定打印慢函数日志信息的全局方法 |
| `timeLimit` | `{Number}` | `50`             | 慢函数执行耗时阈值。<br>执行时间大于该值则会调用 `options.logger` 指定的全局方法 |
| `include` | `{(String \| RegExp)[]}` |  `[/(jsx?\|tsx?)$/]`  | Specifies a list of patterns that match files to be included in compilation |
| `exclude` | `{(String \| RegExp)[]}` |  `['node_modules']`  | Specifies a list of patterns that match files to be excluded from compilation |

## Examples

- [webpack5-example](https://github.com/lzwme/feps-webpack-plugin/tree/main/examples/webpack5-example/)


!![yarn-dev.png](docs/snapshot/yarn-dev.png)


!![webpack5-example.png](docs/snapshot/webpack5-example.png)

## Development

```bash
git clone https://github.com/lzwme/feps-webpack-plugin.git
pnpm install
pnpm run dev
```

## License

`@lzwme/feps-webpack-plugin` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。


[stars-badge]: https://img.shields.io/github/stars/lzwme/feps-webpack-plugin.svg
[stars-url]: https://github.com/lzwme/feps-webpack-plugin/stargazers
[forks-badge]: https://img.shields.io/github/forks/lzwme/feps-webpack-plugin.svg
[forks-url]: https://github.com/lzwme/feps-webpack-plugin/network
[issues-badge]: https://img.shields.io/github/issues/lzwme/feps-webpack-plugin.svg
[issues-url]: https://github.com/lzwme/feps-webpack-plugin/issues
[npm-badge]: https://img.shields.io/npm/v/@lzwme/feps-webpack-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@lzwme/feps-webpack-plugin
[node-badge]: https://img.shields.io/badge/node.js-%3E=_14.0.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-badge]: https://img.shields.io/npm/dm/@lzwme/feps-webpack-plugin.svg?style=flat-square
[download-url]: https://npmjs.org/package/@lzwme/feps-webpack-plugin
[bundlephobia-url]: https://bundlephobia.com/result?p=@lzwme/feps-webpack-plugin@latest
[bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/@lzwme/feps-webpack-plugin@latest
