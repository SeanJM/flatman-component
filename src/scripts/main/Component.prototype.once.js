Component.prototype.once = function (names, callback) {
  var self = this;

  function ref(e) {
    callback.call(self, e);
    self.off(names, ref);
  }

  if (callback) {
    this.on(names, ref);
  }

  return this;
};
