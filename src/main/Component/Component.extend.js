Component.extend = function () {
  var i = 0;
  var n = arguments.length;

  function each(a) {
    if (!a._extended_) {
      if (typeof a.prototype.append === 'function') {
        a.prototype.append = facade.append(a.prototype.append);
      }

      if (typeof a.prototype.remove === 'function') {
        a.prototype.remove = facade.remove(a.prototype.remove);
      }

      for (var k in Component.prototype) {
        if (typeof a.prototype[k] === 'undefined') {
          a.prototype[k] = Component.prototype[k];
        }
      }

      a._extended_ = true;
    }
  }

  for (; i < n; i++) {
    each(arguments[i]);
  }
};
