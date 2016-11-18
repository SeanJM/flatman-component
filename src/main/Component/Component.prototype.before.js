Component.prototype.before = function (a) {
  var target = Component.prototype.target.call(this, this.node.document);
  target.before(a);
};
