Component.prototype.init = function (opt) {
  this.node = {};
  this.childNodes = [];
  this.dict = Object.assign({
    disabledElements : [],
    isDisabled : false
  }, opt);
};
