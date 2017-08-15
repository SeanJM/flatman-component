Component.prototype.mapChildrenToNode = function (children) {
  var ref;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    ref = children[i].ref;
    children[i].parentNode = this;
    if (ref && !this.refs[ref]) {
      this.refs[ref] = children[i];
    }
  }

  return this;
};