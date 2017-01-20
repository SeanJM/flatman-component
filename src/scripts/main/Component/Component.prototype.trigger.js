Component.prototype.trigger = function () {
  var self = this;
  var names = arguments[0];
  var object = arguments[1];
  var $names;

  function filterNames(names) {
    var split = names.split(',');
    var filter = [];
    for (i = 0, n = split.length; i < n; i++) {
      split[i] = split[i].trim();
      if (split[i].length && self.subscribers[split[i]]) {
        filter.push(split[i]);
      }
    }
    return filter;
  }

  this.subscribers = this.subscribers || {};

  if (typeof names === 'string') {
    $names = filterNames(names.toLowerCase());
    object = object || { target : this };
  } else {
    $names = filterNames(object.type.toLowerCase());
    object.target = object.target || this;
  }

  $names.forEach(function (name) {
    self.subscribers[name]
      .slice()
      .forEach(function (callback) {
        var $object = Object.assign(
          {},
          object,
          { type : name }
        );
        callback.call(self, $object);
      });
  });

  return this;
};
