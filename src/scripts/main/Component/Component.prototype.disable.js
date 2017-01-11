Component.prototype.disable = function () {
  var i = 0;
  var n = this.childNodes.length;

  this.dict.disabledElements = this.childNodes.filter(function (a) { return a.dict.isDisabled; });
  this.dict.isDisabled = true;

  for (; i < n; i++) {
    this.childNodes[i].disable();
  }

  this.node.document.disable();
  return this;
};
