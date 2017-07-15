function getComponentNames(component, node) {
  if (node.children) {
    node.children().forEach(function (child) {
      var name = child.name && child.name();
      if (name && !component.names[name]) {
        component.names[name] = child.component || child;
      }
      getComponentNames(component, child);
    });
  }
}