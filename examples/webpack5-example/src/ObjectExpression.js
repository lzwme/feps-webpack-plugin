// @ts-check

export const obj = {
  a: 1,
  add(a, b) {
    return a + b;
  },
  div: function (a, b) {
    return a / b;
  },
  sub: null,
}

obj.sub = (a, b) => {
  return a - b;
}

export default {
  testAbc(a, b, c) {
    console.log(a, b, c);
  }
};
