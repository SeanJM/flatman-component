Component.prototype.appendTo = function (target) {
  var node;

  if (typeof target === 'string') {
    node = document.querySelector(target);
  } else if (target && el.isElement(target)) {
    node = target;
  } else if (target && el.isElement(target.node)) {
    node = target.node;
  } else {
    throw 'error \'Component.prototype.appendTo\', invalid target \'' + Object.prototype.toString.call(target) + '\'';
  }

  this.node.document.appendTo(target);

  if (
    typeof this.trigger === 'function'
    && node
    && document.body.contains(node)
  ) {
    triggerMount(this);
  }

  return this;
};
