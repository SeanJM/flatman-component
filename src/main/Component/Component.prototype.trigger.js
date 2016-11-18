Component.prototype.trigger = function (name, e) {
  var names = _.filter(name.split(','), function (a) {
    return a.length;
  });
  var i = 0;
  var n = names.length;
  var index;
  var x;
  var j;

  if (typeof e === 'undefined') {
    e = {
      type : name,
      target : this
    };
  }

  if (typeof e.type === 'undefined') {
    e.type = name;
  }

  if (e.target === 'undefined') {
    e.target = this;
  }

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'object') {
      for (j = this.subscribers[x].length - 1; j >= 0; j--) {
        this.subscribers[x][j].call(this, e);
      }
    }
  }

  return this;
};
