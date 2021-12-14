/*
 * @Author: lzw
 * @Date: 2021-12-13 09:44:19
 * @LastEditors: lzw
 * @LastEditTime: 2021-12-14 15:18:33
 * @Description:
 */
// @ts-check

const FEPSDependency = require('./FEPSDependency');
const comm = require('./common');
const PLUGIN_NAME = comm.PLUGIN_NAME;

let totalFiles = 0;

module.exports = class FEPSPlugin {
  options = comm.getDefaultOptions();
  stats = { total: 0, matchFiles: 0, };
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
    if (this.options.disabled === true) return;

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      // @ts-ignore
      compilation.dependencyTemplates.set(FEPSDependency, new FEPSDependency.Template());
    });

    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (factory) => {
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
        parser.state.module.ast = ast;
        parser.state.module.addDependency(new FEPSDependency(relativePath, this.options, parser.state.module));
      }

      if (this.options.debug) {
        const prefix = desc ? `[${PLUGIN_NAME}][${desc}]` : `[${PLUGIN_NAME}]`;
        console.log(prefix, isMatch ? '[matched]' : '[ignored]', `${this.stats.matchFiles}/${this.stats.total}`, totalFiles, relativePath);
      }
    });
  }
};
