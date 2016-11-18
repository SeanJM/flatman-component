Component.prototype.hasParent = function (a) {
  var root = el.getNode(this.node.document);

  function hasParent(b) {
    return el.getNode(b).contains(root);
  }

  if (Array.isArray(a)) {
    return a.map(hasParent);
  }

  return hasParent(a);
};
