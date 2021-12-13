/*
 * @Author: lzw
 * @Date: 2021-12-13 09:43:42
 * @LastEditors: lzw
 * @LastEditTime: 2021-12-13 20:10:52
 * @Description:
 */
// @ts-check

const FEPSDependency = require('./FEPSDependency');
const comm = require('./common');
const PLUGIN_NAME = comm.PLUGIN_NAME;

let totalFiles = 0;

module.exports = class FEPSPlugin {
  options = comm.getDefaultOptions();
  stats = { total: 0, matchFiles: 0 };
  /**
   * @param {comm.FepsOptions} options
   */
  constructor(options = null) {
    if (options && options !== this.options) {
      Object.keys(this.options).forEach(key => {
        if (options[key] != null) this.options[key] = options[key];
      });
      this.options.timeLimit = Math.max(10, this.options.timeLimit);
    }
  }
  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    // const pluginName = this.constructor.name;
    if (this.options.disabled === true) return;

    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      // @ts-ignore
      compilation.dependencyTemplates.set(FEPSDependency, new FEPSDependency.Template());
    });

    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, factory => {
      factory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, parser => this.handler(parser, compiler.name));
    });
  }
  /**
   * @param {comm.JavascriptParser} parser
   * @param {string} desc
   */
  handler(parser, desc) {
    comm.astHandler(parser, this.options, (isMatch, ast, relativePath) => {
      totalFiles++;
      this.stats.total++;

      if (isMatch) {
        this.stats.matchFiles++;
        // @ts-ignore
        parser.state.module.addDependency(new FEPSDependency(parser.state.module, ast, relativePath, this.options));
      }

      if (this.options.debug) {
        // const logger = compilation.getLogger(PLUGIN_NAME);
        const prefix = desc ? `[${PLUGIN_NAME}][${desc}]` : `[${PLUGIN_NAME}]`;
        console.log(prefix, isMatch ? '[matched]' : '[ignored]', `${this.stats.matchFiles}/${this.stats.total}`, totalFiles, relativePath);
      }
    });
  }
};
