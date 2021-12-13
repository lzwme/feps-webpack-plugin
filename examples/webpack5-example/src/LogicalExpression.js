const fn = globalThis.ABC ? (a, b) => a - b : function(a, b) { return a + b };

export const testFn = fn || ((a, b) => a + b);

export const abc = globalThis.ABC || 'abc';

if (!globalThis.ABC) globalThis.ABC = (a, b) => a + b;

if (((a, b) => a + b)(1, 2)) {
  globalThis.ABC = (a, b) => {
    return a - b;
  };
}

typeof (function(a, b) { return a + b })() === 'undefined';
