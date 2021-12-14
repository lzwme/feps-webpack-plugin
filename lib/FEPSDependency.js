/*
 * @Author: lzw
 * @Date: 2021-12-13 19:09:25
 * @LastEditors: lzw
 * @LastEditTime: 2021-12-14 15:24:25
 * @Description:
 */
// @ts-check

const webpack = require('webpack');
const path = require('path');
const comm = require('./common');
const DependencyTemplate = require('webpack/lib/DependencyTemplate');

class FEPSTemplate extends DependencyTemplate {
  /**
   * @param {FEPSDependency} dep the dependency for which the template should be applied
   * @param {comm.ReplaceSource} source the current replace source which can be modified
   * @param {comm.DependencyTemplateContext} templateContext the context object
   * @returns {void}
   */
  // @ts-ignore
  apply(dep, source, templateContext) {
    const module = dep.moduleProxy || templateContext.module; // templateContext.moduleGraph.getModule(dep)
    /** @type {comm.Program} */
    // @ts-ignore
    const ast = module.ast;
    if (!ast) return;
    // @ts-ignore
    delete module.ast;
    // module.cleanupForCache();

    /** @type {comm.AnyNode[]} */
    const result = [];
    const recursiveProps = node => {
      let hit = false;
      Object.keys(node).forEach(key => {
        const item = node[key];
        if (!item || typeof item !== 'object') return;
        if (Array.isArray(item)) {
          item.forEach(d => {
            if (recursiveProps(d)) hit = true;
          });
        } else {
          if (item.type && item.loc && item.range) {
            travel(item);
            hit = true;
          }
        }

        return hit;
      });

      return hit;
    };
    /**
     * @param {comm.AnyNode | comm.AnyNode[]} nodes
     */
    const travel = nodes => {
      if (!Array.isArray(nodes)) nodes = [nodes];

      nodes.forEach(n => {
        if (!n) return;

        switch (n.type) {
          case 'Literal':
          case 'Identifier':
          case 'TaggedTemplateExpression':
          case 'TemplateLiteral':
          case 'ExportAllDeclaration':
          case 'ImportDeclaration':
            // case 'NewExpression':
            // 忽略的类型
            break;
          case 'VariableDeclaration':
            if (n.declarations[0].init) {
              const node = n.declarations[0];
              // @ts-ignore
              if (!node.init.id) node.init.id = node.id;
              travel(node.init);
              break;
            }
          case 'ArrowFunctionExpression':
            // 忽略表达式返回
            // if (!n.expression)
            result.push(n);
            break;
          case 'FunctionExpression':
          case 'FunctionDeclaration':
            result.push(n);
            break;
          case 'ClassExpression':
          case 'ClassDeclaration':
            travel(n.body.body);
            break;
          case 'MethodDefinition':
            if (n.kind === 'method') {
              result.push(n);
            } else if (n.kind === 'constructor') {
              travel(n.value.body.body);
            }
            break;
          case 'ExpressionStatement':
            travel(n.expression);
            break;
          case 'ExportNamedDeclaration':
            travel(n.declaration);
            break;
          case 'Property':
          case 'PropertyDefinition':
            travel(n.value);
            break;
          case 'ObjectExpression':
            travel(n.properties);
            break;
          case 'ExportDefaultDeclaration':
            travel([n.declaration]);
            break;
          case 'ArrayExpression':
            // case 'ArrayPattern':
            travel(n.elements);
            break;
          case 'LogicalExpression':
            travel([n.left, n.right]);
            break;
          case 'ConditionalExpression':
            travel([n.test, n.alternate, n.consequent]);
            break;
          case 'MemberExpression':
            travel(n.property);
            break;
          case 'IfStatement':
            travel([n.test, n.alternate, n.consequent]);
            break;
          case 'CallExpression':
            travel(n.callee);
            break;
          default: {
            if (!recursiveProps(n)) {
              console.warn(`[${comm.PLUGIN_NAME}][warn]`, '未处理的节点类型:', n.type, dep.relativePath, n);
            } else if (dep.options.debug) {
              // console.log(`[${PLUGIN_NAME}][warn]`, '该节点类型使用了通用处理逻辑', n.type, dep.relativePath, n);
            }
          }
        }
      });
    };

    travel(ast.body);

    if (!result.length) return;

    let isInjected = false;
    /**
     * @param {string} name
     * @param {*} node
     */
    const reWrite = (name, node) => {
      if (!node.body || node.__feps) return;
      node.__feps = true;
      source.insert(node.body.start, `{ markTime('${name}'); const $r = (${node.async ? 'async ' : ''}() => `);

      source.insert(node.body.end, `)(); markTime('${name}'); return $r;}`);

      isInjected = true;
    };

    result.forEach(node => {
      if (node.type === 'MethodDefinition') {
        // @ts-ignore
        reWrite(node.key.name, node.value);
      } else {
        // @ts-ignore
        let nodeDesc = node.id && node.id.name;
        if (!nodeDesc) nodeDesc = path.basename(dep.relativePath) + `:${node.loc.start.line}-${node.loc.start.column}`;
        reWrite(nodeDesc, node);
      }
    });

    if (isInjected) source.insert(0, dep.markTimeCode);
  }
};

class FEPSDependency extends webpack.Dependency {
  // @ts-ignore
  get type() {
    return comm.PLUGIN_NAME;
  }
  /**
   * Use the constructor to save any information you need for later
   * @param {string} relativePath
   * @param {comm.FepsOptions} options
   * @param {import('webpack').Module} module
   */
  constructor(relativePath, options, module = null) {
    super();
    this.relativePath = relativePath;
    this.options = options;
    this.moduleProxy = module;
    this.markTimeCode = comm.getMarkTimeCode(options.timeLimit, options.logger);
  }

  serialize(context) {
      const { write } = context;
      write(this.options);
      write(this.relativePath);
      super.serialize(context);
  }
  deserialize(context) {
    super.deserialize(context);
  }
}

// for webpack5
if (webpack.util.serialization) {
  webpack.util.serialization.register(FEPSDependency, './BenchmarkPlugin', null, {
    serialize(instance, context) {
        instance.serialize(context);
    },
    deserialize(context) {
        const { read } = context;
        const dep = new FEPSDependency(read(), read());
        dep.deserialize(context);
        return dep;
    }
  });
}

FEPSDependency.Template = FEPSTemplate;
module.exports = FEPSDependency;
