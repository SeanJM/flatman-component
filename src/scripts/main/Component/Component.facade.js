Component.facade = function (methods) {
  if (Array.isArray(methods)) {
    methods.forEach(function (method) {
      if (!Component.prototype[method]) {
        Component.prototype[method] = facade.component(method);
      }
    });
  } else {
    throw 'Invalid argument for Component.facade. The argument must be an array of methods.';
  }
};
