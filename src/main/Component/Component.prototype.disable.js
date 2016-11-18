Component.prototype.disable = function () {
  var i = 0;
  var elements = this.dict.elements;
  var n = this.dict.elements.length;

  this.dict.disabledElements = elements.filter(a => a.dict.isDisabled);
  this.dict.isDisabled = true;

  for (; i < n; i++) {
    elements[i].disable();
  }

  this.node.document.disable();
  return this;
};
