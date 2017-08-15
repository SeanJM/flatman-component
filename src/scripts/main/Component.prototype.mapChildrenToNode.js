Component.prototype.mapChildrenToNode = function (children) {
  var name;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    name = children[i].name && children[i].name();
    children[i].parentNode = this;
    this.childNodes.push(children[i]);
    if (name && !this.names[name]) {
      this.names[name] = children[i];
    }
  }

  return this;
};