Component.prototype.append = function (children) {
  var self = this;

  this.childNodes = this.childNodes || [];

  this.mapChildrenToNode(children);
  this.node.document.append(children);
  [].push.apply(this.childNodes, children);

  children.forEach(function (child) {
    child.parentNode = self;
  });

  return this;
};
