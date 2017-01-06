function getNode(element) {
  var str = element.node.toString();

  if (str.substr(1, 6) === 'object' && str.substr(-8, 7) === 'Element') {
    return element.node;
  }

  return getNode(element.node.document);
}