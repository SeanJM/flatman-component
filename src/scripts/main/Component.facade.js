Component.facade = function (methods) {
  if (Array.isArray(methods)) {
    methods.forEach(function (method) {
      if (!Component.prototype[method]) {
        Component.prototype[method] = Component.facade.method(method);
      }
    });
  } else {
    throw 'Invalid argument for Component.facade. The argument must be an array of methods.';
  }
};

Component.facade.method = function (method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var root = this.document;
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = root[method].apply(root, $arguments);
    return typeof result === 'undefined' ? this : result;
  };
};