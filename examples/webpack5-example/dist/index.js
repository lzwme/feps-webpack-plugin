/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ArrayExpression.js":
/*!********************************!*\
  !*** ./src/ArrayExpression.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": () => (/* binding */ list)
/* harmony export */ });

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();

const list = [
  {
    add(a, b) { markTime('ArrayExpression.js:4-7'); const $r = (() => {
      return a + b;
    })(); markTime('ArrayExpression.js:4-7'); return $r;},
    div: (a, b) => { markTime('ArrayExpression.js:7-9'); const $r = (() => a / b)(); markTime('ArrayExpression.js:7-9'); return $r;},
  },
  function(a, b) { markTime('ArrayExpression.js:9-2'); const $r = (() => { return a + b })(); markTime('ArrayExpression.js:9-2'); return $r;},
  (a, b) => { markTime('ArrayExpression.js:10-2'); const $r = (() => a + b)(); markTime('ArrayExpression.js:10-2'); return $r;},
];


/***/ }),

/***/ "./src/ClassTest.js":
/*!**************************!*\
  !*** ./src/ClassTest.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalcTest": () => (/* binding */ CalcTest)
/* harmony export */ });

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();
function fibonacci(n) { markTime('fibonacci'); const $r = (() => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
})(); markTime('fibonacci'); return $r;}

class CalcTest {
  constructor() {
    console.log('CalcTest created');
  }
  async fibonacciAsync(n) { markTime('fibonacciAsync'); const $r = (async () => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  })(); markTime('fibonacciAsync'); return $r;}

  fibonacciArrow = n => { markTime('ClassTest.js:19-19'); const $r = (() => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  })(); markTime('ClassTest.js:19-19'); return $r;};

  fibonacciArrowAsync = async n => { markTime('ClassTest.js:26-24'); const $r = (async () => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  })(); markTime('ClassTest.js:26-24'); return $r;};
}


/***/ }),

/***/ "./src/LogicalExpression.js":
/*!**********************************!*\
  !*** ./src/LogicalExpression.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testFn": () => (/* binding */ testFn),
/* harmony export */   "abc": () => (/* binding */ abc)
/* harmony export */ });

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();
const fn = globalThis.ABC ? (a, b) => { markTime('LogicalExpression.js:1-28'); const $r = (() => a - b)(); markTime('LogicalExpression.js:1-28'); return $r;} : function(a, b) { markTime('LogicalExpression.js:1-46'); const $r = (() => { return a + b })(); markTime('LogicalExpression.js:1-46'); return $r;};

const testFn = fn || ((a, b) => { markTime('LogicalExpression.js:3-29'); const $r = (() => a + b)(); markTime('LogicalExpression.js:3-29'); return $r;});

const abc = globalThis.ABC || 'abc';

if (!globalThis.ABC) globalThis.ABC = (a, b) => { markTime('LogicalExpression.js:7-38'); const $r = (() => a + b)(); markTime('LogicalExpression.js:7-38'); return $r;};

if (((a, b) => { markTime('LogicalExpression.js:9-5'); const $r = (() => a + b)(); markTime('LogicalExpression.js:9-5'); return $r;})(1, 2)) {
  globalThis.ABC = (a, b) => { markTime('LogicalExpression.js:10-19'); const $r = (() => {
    return a - b;
  })(); markTime('LogicalExpression.js:10-19'); return $r;};
}

typeof (function(a, b) { markTime('LogicalExpression.js:15-8'); const $r = (() => { return a + b })(); markTime('LogicalExpression.js:15-8'); return $r;})() === 'undefined';


/***/ }),

/***/ "./src/func.ignore.js":
/*!****************************!*\
  !*** ./src/func.ignore.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fibonacciAsync": () => (/* binding */ fibonacciAsync),
/* harmony export */   "fibonacciArrow": () => (/* binding */ fibonacciArrow),
/* harmony export */   "fibonacciArrowAsync": () => (/* binding */ fibonacciArrowAsync)
/* harmony export */ });
function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

async function fibonacciAsync(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

const fibonacciArrow = n => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};

const fibonacciArrowAsync = async n => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};


/***/ }),

/***/ "./src/func.js":
/*!*********************!*\
  !*** ./src/func.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fibonacciAsync": () => (/* binding */ fibonacciAsync),
/* harmony export */   "fibonacciArrow": () => (/* binding */ fibonacciArrow),
/* harmony export */   "fibonacciArrowAsync": () => (/* binding */ fibonacciArrowAsync)
/* harmony export */ });

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();
function fibonacci(n) { markTime('fibonacci'); const $r = (() => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
})(); markTime('fibonacci'); return $r;}

async function fibonacciAsync(n) { markTime('fibonacciAsync'); const $r = (async () => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
})(); markTime('fibonacciAsync'); return $r;}

const fibonacciArrow = n => { markTime('fibonacciArrow'); const $r = (() => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
})(); markTime('fibonacciArrow'); return $r;};

const fibonacciArrowAsync = async n => { markTime('fibonacciArrowAsync'); const $r = (async () => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
})(); markTime('fibonacciArrowAsync'); return $r;};


/***/ }),

/***/ "./src/objectExpression.js":
/*!*********************************!*\
  !*** ./src/objectExpression.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "obj": () => (/* binding */ obj),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();
// @ts-check

const obj = {
  a: 1,
  add(a, b) { markTime('objectExpression.js:5-5'); const $r = (() => {
    return a + b;
  })(); markTime('objectExpression.js:5-5'); return $r;},
  div: function (a, b) { markTime('objectExpression.js:8-7'); const $r = (() => {
    return a / b;
  })(); markTime('objectExpression.js:8-7'); return $r;},
  sub: null,
}

obj.sub = (a, b) => { markTime('objectExpression.js:14-10'); const $r = (() => {
  return a - b;
})(); markTime('objectExpression.js:14-10'); return $r;}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  testAbc(a, b, c) { markTime('objectExpression.js:19-9'); const $r = (() => {
    console.log(a, b, c);
  })(); markTime('objectExpression.js:19-9'); return $r;}
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "obj": () => (/* reexport safe */ _objectExpression__WEBPACK_IMPORTED_MODULE_3__.obj),
/* harmony export */   "list": () => (/* reexport safe */ _ArrayExpression__WEBPACK_IMPORTED_MODULE_4__.list),
/* harmony export */   "abc": () => (/* reexport safe */ _LogicalExpression__WEBPACK_IMPORTED_MODULE_5__.abc),
/* harmony export */   "testFn": () => (/* reexport safe */ _LogicalExpression__WEBPACK_IMPORTED_MODULE_5__.testFn)
/* harmony export */ });
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./func */ "./src/func.js");
/* harmony import */ var _func_ignore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./func.ignore */ "./src/func.ignore.js");
/* harmony import */ var _ClassTest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClassTest */ "./src/ClassTest.js");
/* harmony import */ var _objectExpression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objectExpression */ "./src/objectExpression.js");
/* harmony import */ var _ArrayExpression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ArrayExpression */ "./src/ArrayExpression.js");
/* harmony import */ var _LogicalExpression__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LogicalExpression */ "./src/LogicalExpression.js");

const markTime = (() => {
      let lastLabel = null;
      const skipMap = new Map();
      const markTimeMap = new Map();

      return (label) => {
          try {
              if (typeof globalThis.logger !== 'function') return;
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
                  if (cost > 50) {
                      globalThis.logger('[Performance]', cost + 'ms', new Error().stack.replace(/\((\S+?)\)/g, '').replace(/at file\S+/g, '').replace(/\s+at\s+/g, ' <- ').replace('Error <- ', '').trim());
                  }
              }

              lastLabel = label;
          } else {
              markTimeMap.set(label, Date.now());
          }
      }
  })();
// @ts-check








const colors = ['red', 'green', 'blue'];
const desc = ['classTest', 'FUNC', 'funcIgnore'];
const clsTest = new _ClassTest__WEBPACK_IMPORTED_MODULE_2__.CalcTest();

globalThis.logger = (...args) => { markTime('index.js:14-20'); const $r = (() => {
  console.warn(...args);
  document.querySelector('#logger').innerHTML += `<li>${args.map((arg, idx) =>` <font color="${colors[idx]}">${arg}</font> `).join(' | ')}</li>`;
})(); markTime('index.js:14-20'); return $r;}

let count = 0;

[clsTest, _func__WEBPACK_IMPORTED_MODULE_0__, _func_ignore__WEBPACK_IMPORTED_MODULE_1__].forEach(function typeFor(fa, idx) {
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

})();

/******/ })()
;
//# sourceMappingURL=index.js.map