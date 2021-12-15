function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

export async function fibonacciAsync(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

export const fibonacciArrow = n => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};

export const fibonacciArrowAsync = async n => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};

/** ArrowFunctionExpression, expression = true */
export const testArrowFuncExpression = (a) => (a > 0 ? 1 : -1);
