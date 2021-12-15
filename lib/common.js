/*
 * @Author: lzw
 * @Date: 2021-12-13 18:45:53
 * @LastEditors: lzw
 * @LastEditTime: 2021-12-15 14:31:14
 * @Description:
 */
// @ts-check

/** @typedef {import("estree").Program} Program */
/** @typedef {import("estree").Node} AnyNode */
/** @typedef {import("webpack/lib/javascript/JavascriptParser")} JavascriptParser */
/** @typedef {import("webpack-sources").ReplaceSource} ReplaceSource */
/** @typedef {import("webpack/lib/Dependency")} Dependency */
/** @typedef {import("webpack/lib/DependencyTemplate").DependencyTemplateContext} DependencyTemplateContext */

/**
 * @typedef {{
 * debug?: boolean;
 * disabled?: boolean;
 * timeLimit?: number;
 * logger?: string; // 'console.warn'
 * rootDir?: string;
 * include?: (string | RegExp)[] | ((p: string) => boolean);
 * exclude?: (string | RegExp)[] | ((p: string) => boolean);
 * excludeNodeType?: AnyNode['type'][];
 *}} FepsOptions
 */

const PLUGIN_NAME = 'FEPSPlugin';
exports.PLUGIN_NAME = PLUGIN_NAME;

function getMarkTimeCode(timeLimit = 50, logger = 'console.warn') {
  return `\nconst markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof ${logger} !== 'function') return;
          } catch(e) {
              if (globalThis.console) console.error(e);
              return;
          }
          const skip = skipMap.get(label);
          if (skip) return;
          const start = markTimeMap.get(label);

          if (start) {
              markTimeMap.delete(label);
              if (lastLabel === label) {
                  skipMap.set(label, true);
              } else {
                  const cost = Date.now() - start;
                  if (cost > ${timeLimit}) {
                      ${logger}('[Performance]', cost + 'ms', new Error().stack.replace(/\\((\\S+?)\\)/g, '').replace(/at file\\S+/g, '').replace(/\\s+at\\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();\n`;
}
exports.getMarkTimeCode = getMarkTimeCode;

/**
 * @param {JavascriptParser} parser
 * @param {FepsOptions} options
 * @param {(isMatch: boolean, ast: Program, relativePath: string) => void} callback
 */
function astHandler(parser, options, callback) {
  parser.hooks.program.tap(PLUGIN_NAME, (ast, _comments) => {
    if (!parser.state || !parser.state.module) return;

    let isMatch = true;
    /** @type string */
    let relativePath = parser.state.module.resource.replace(options.rootDir, '');

    if (process.platform === 'win32') relativePath = relativePath.replace(/\\/g, '/');

    if (typeof options.exclude === 'function') {
      isMatch = options.exclude(relativePath);
    } else if (options.exclude.length) {
      const isExMatch = options.exclude.some(d => {
        if (typeof d === 'string') return relativePath.includes(d);
        if (d instanceof RegExp) return d.test(relativePath);
      });
      isMatch = !isExMatch;
    }

    if (isMatch) {
      if (typeof options.include === 'function') {
        isMatch = options.include(relativePath);
      } else if (options.include.length) {
        isMatch = options.include.some(d => {
          if (typeof d === 'string') return relativePath.includes(d);
          if (d instanceof RegExp) return d.test(relativePath);
        });
      }
    }

    callback(isMatch, ast, relativePath);
  });
}
exports.astHandler = astHandler;

exports.getDefaultOptions = () => {
  /** @type {FepsOptions} */
  const options = {
    debug: !!process.env.DEBUG,
    rootDir: process.cwd(),
    timeLimit: 50,
    include: [/(jsx?|tsx?)$/],
    exclude: ['node_modules'],
    excludeNodeType: [],
    logger: 'console.warn',
    disabled: false,
  };
  return options;
};
