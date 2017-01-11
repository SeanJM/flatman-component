Component.create = function (name, methods) {
  var FN = function () {};

  function wrapper(k) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      methods[k].apply(FN, $arguments);
    };
  }

  for (var k in methods) {
    FN.prototype[k] = wrapper(k);
  }

  FN.__name__ = name;
  window[name] = FN;
};
