Component.prototype.remove = function () {
  var node = getNode(this.node.document);
  var parentNode = getNode(this.parentNode);
  var parentComponent = this.parentComponent;

  var index = this.parentNode.childNodes.indexOf(this);
  parentNode.removeChild(node);
  this.parentNode.childNodes.splice(index, 1);

  if (parentComponent) {
    index = parentComponent.childNodes.indexOf(this);
    parentComponent.childNodes.splice(index, 1);
  }

  return this;
};
