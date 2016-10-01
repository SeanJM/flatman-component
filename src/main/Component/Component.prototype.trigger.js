Component.prototype.trigger = function (name, e) {
  var names = name.split(',').filter(function (a) {
    return a.length;
  });

  var i = 0;
  var n = names.length;
  var index;
  var x;
  var j;
  var k;

  if (typeof e === 'undefined') {
    e = {
      type : name,
      target : this
    };
  } else if (typeof e.type === 'undefined') {
    e.type = name;
    e.target = this;
  }

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'object') {
      for (j = 0, k = this.subscribers[x].length; j < k; j++) {
        this.subscribers[x][j].call(this, e);
      }
    }
  }

  return this;
};
