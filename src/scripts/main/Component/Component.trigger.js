Component.trigger = function () {
  var subscribers = Component.subscribers;
  var names;
  var detail;

  if (typeof arguments[0] === 'string') {
    names = arguments[0];
    detail = arguments[1] || {};
  } else {
    names = arguments[0].type;
    detail = arguments[0];
  }

  names = names.toLowerCase().split(',');

  if (!Component.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback(Object.assign({}, detail, { type : name }));
        });
      }
    });
  }

  return Component;
};
