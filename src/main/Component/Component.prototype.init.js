Component.prototype.init = function (opt) {
  this.node = {};
  this.dict = Object.assign({
    elements : [],
    disabledElements : [],
    isDisabled : false
  }, opt);
};
