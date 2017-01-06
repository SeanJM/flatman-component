Component.prototype.init = function (opt) {
  this.node = {};
  this.childNodes = [];

  this.dict = {
    disabledElements : [],
    isDisabled : false
  };

  for (var k in opt) {
    if (k.substr(0, 4) === 'once') {
      this.once(k.substr(4), opt[k]);
    } else if (k.substr(0, 2) === 'on') {
      this.on(k.substr(2), opt[k]);
    } else {
      this.dict[k] = opt[k];
    }
  }
};
