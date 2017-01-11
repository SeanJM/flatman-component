Component.prototype.enable = function () {
  var i = 0;
  var n = this.childNodes.length;
  var disabledElements = this.dict.disabledElements;

  this.dict.isDisabled = false;

  for (; i < n; i++) {
    if (disabledElements.indexOf(this.childNodes[i]) === -1) {
      this.childNodes[i].enable();
    }
  }

  this.node.document.enable();
  return this;
};
