Component.prototype.enable = function () {
  var i = 0;
  var n = this.dict.elements.length;
  var elements = this.dict.elements;
  var disabledElements = this.dict.disabledElements;

  this.dict.isDisabled = false;

  for (; i < n; i++) {
    if (disabledElements.indexOf(elements[i]) === -1) {
      elements[i].enable();
    }
  }

  this.node.document.enable();
  return this;
};
