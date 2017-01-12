function isObjectEqual(a, b) {
  const isTypeEqual = require('./isTypeEqual');

  if (a == null || b == null) {
    return a == b;
  }

  for (let k in a) {
    if (!isTypeEqual(a[k], b[k])) {
      return false;
    }
  }

  return true;
}

module.exports = isObjectEqual;
