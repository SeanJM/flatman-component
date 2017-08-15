function getComponentRefs(component, node) {
  node.childNodes.forEach(function (child) {
    if (child.ref && !component.refs[child.ref]) {
      component.refs[child.ref] = child.component || child;
    }
    getComponentRefs(component, child);
  });
}