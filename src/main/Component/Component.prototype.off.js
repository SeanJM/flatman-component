Component.prototype.off = function (name, callback) {
  var names = name.split(',').filter(function (a) {
    return a.length;
  });

  var i = 0;
  var n = names.length;
  var indexOf;
  var x;

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'undefined') {
      throw 'There are no subscribers for \'' + x + '\'';
    }

    indexOf = this.subscribers[x].indexOf(callback);

    if (indexOf !== -1) {
      this.subscribers[x].slice(indexOf, 1);
    }
  }

  return this;
};
