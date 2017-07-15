function createComponentMethodProxy(method, methods) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = methods[method].apply(this, $arguments);

    return result;
  };
}