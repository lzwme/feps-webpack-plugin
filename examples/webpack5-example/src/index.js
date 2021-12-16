// @ts-check
import * as FUNC from './func';
import * as funcIgnore from './func.ignore';
import { CalcTest } from './ClassTest';

export * from './objectExpression';
export * from './ArrayExpression';
export * from './LogicalExpression';

const colors = ['gray', 'red', 'green', 'blue'];
const desc = ['classTest', 'FUNC', 'funcIgnore'];
const clsTest = new CalcTest();

globalThis.logger = (...args) => {
  console.warn(...args);
  document.querySelector('#logger').innerHTML += `<li>${args.map((arg, idx) =>` <font color="${colors[idx]}">${arg}</font> `).join(' | ')}</li>`;
}

let count = 0;

[clsTest, FUNC, funcIgnore].forEach(function typeFor(fa, idx) {
  const keys = Object.keys(fa);

  if (fa === clsTest) keys.push('fibonacci', 'fibonacciAsync');

  keys.forEach(async function methodFor(prop) {
    if (typeof fa[prop] !== 'function') return;

    const label = `${++count}-${desc[idx]}.${prop}`;
    console.time(label);
    await fa[prop](30 + Math.ceil(Math.random() * 6));
    console.timeEnd(label);
  });
});
