Component.create = function (tagName, methods) {
  if (Component.lib[tagName]) {
    throw new Error(
      'Cannot create Component function: duplicate name \'' + tagName + '\''
    );
  }

  if (typeof methods === 'function') {
    Component.lib[tagName] = Component.create(tagName, {
      render: function (props) {
        return methods(props);
      }
    });
  } else {
    Component.lib[tagName] = createComponentConstructor(
      tagName,
      methods
    );
  }

  return Component.lib[tagName];
};
