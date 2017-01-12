var facade = {
  append : function (append) {
    return function (children) {
      var self = this;

      append.call(this, children);

      this.mapChildrenToNode(children);

      children.forEach(function (child) {
        child.parentComponent = self;
        self.childNodes.push(child);
      });

      return this;
    };
  },
  remove : function (remove) {
    return function () {
      remove.call(this);
      return Component.prototype.remove.call(this);
    };
  },
  removeChild : function (removeChild) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);

      for (; i < n; i++) {
        $arguments[i] = arguments[i];
      }

      removeChild.apply(this, $arguments);
      return Component.prototype.removeChild.apply(this, $arguments);
    };
  },
  component : function (method) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);
      var root = this.node.document;
      var result;

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      result = root[method].apply(root, $arguments);
      return typeof result === 'undefined' ? this : result;
    };
  }
};
