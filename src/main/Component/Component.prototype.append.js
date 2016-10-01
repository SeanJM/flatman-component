Component.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var children = [];
  var target = Component.prototype.target.call(this, this.node.document);

  for (; i < n; i++) {
    children.push(arguments[i]);
  }

  target.append.apply(target, children);
};
