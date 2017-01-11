function getNode(element) {
  var target = element.node
    ? element.node
    : element;

  var str = target.toString();

  if (str.substr(1, 6) === 'object' && str.substr(-8, 7) === 'Element') {
    return target;
  }

  return getNode(element.node.document);
}