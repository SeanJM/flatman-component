Component.prototype.contains = function (node) {
  return this.node.document.contains(
    el.getNode(node)
  );
};
