Component.prototype.append = function (a) {
  var target = Component.prototype.target.call(this, this.node.document);
  target.append(a);
};
