Component.prototype.on = function (name, callback) {
  var names = name.split(',').filter(function (a) {
    return a.length;
  });
  var i = 0;
  var n = names.length;
  var x;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'undefined') {
      this.subscribers[x] = [];
    }

    if (this.subscribers[x].indexOf(callback) === -1) {
      this.subscribers[x].push(callback);
    }
  }

  return this;
};
