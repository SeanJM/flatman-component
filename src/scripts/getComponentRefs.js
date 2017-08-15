function getComponentRefs(component, node) {
  if (node.childNodes) {
    node.childNodes.forEach(function (child) {
      if (child.ref && !component.refs[child.ref]) {
        component.refs[child.ref] = child.component || child;
      }
      getComponentRefs(component, child);
    });
  }
}