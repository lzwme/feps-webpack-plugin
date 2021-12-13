function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

export class CalcTest {
  constructor() {
    console.log('CalcTest created');
  }
  async fibonacciAsync(n) {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  }

  fibonacciArrow = n => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  };

  fibonacciArrowAsync = async n => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  };
}
