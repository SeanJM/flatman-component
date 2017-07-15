Component.prototype.mapChildrenToNode = function (children) {
  var name;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    name = children[i].name && children[i].name();
    children[i].parentNode = this;
    if (name && !this.node[name]) {
      this.node[name] = children[i];
    }
  }

  [].push.apply(this.childNodes, children);
  return this;
};