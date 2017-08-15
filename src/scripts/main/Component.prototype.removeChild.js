Component.prototype.removeChild = function (child) {
  this.document.removeChild(child);
  this.childNodes.splice(this.childNodes.indexOf(child), 1);
  return this;
};
