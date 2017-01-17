Component.prototype.is = function (selector) {
  const selectorObject = getSelectorObject(selector);

  if (selectorObject.tagName) {
    if (selectorObject.tagName !== this.tagName) {
      return false;
    }
  }

  for (var k in selectorObject.attributes) {
    if (k === 'className') {
      if (!this.hasClass(selectorObject.attributes[k]).filter(function (a) { return a; }).length) {
        return false;
      }
    } else if (selectorObject.attributes[k]) {
      if (typeof selectorObject.attributes[k] === 'string') {
        if (selectorObject.attributes[k] !== this.attributes[k]) {
          return false;
        }
      } else if (!selectorObject.attributes[k].test(this.attributes[k])) {
        return false;
      }
    }
  }

  return true;
};