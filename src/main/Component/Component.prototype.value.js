Component.prototype.value = function (value) {
  if (typeof value === 'undefined') {
    return this.node.document.value();
  }
  
  this.node.document.value(value);
  return this;
};
