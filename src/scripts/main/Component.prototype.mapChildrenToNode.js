Component.prototype.mapChildrenToNode = function (children) {
  var ref;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    ref = children[i].props && children[i].props.ref;
    children[i].parentNode = this;
    this.childNodes.push(children[i]);
    if (ref && !this.refs[ref]) {
      this.refs[ref] = children[i];
    }
  }

  return this;
};