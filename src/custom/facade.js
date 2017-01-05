var facade = {
  append : function (append) {
    return function (children) {
      var parentNode = this;

      append.call(this, children);

      this.mapChildrenToNode(children);
      [].push.apply(this.childNodes, children);

      children.forEach(function (child) {
        child.parentNode = parentNode;
      });

      return this;
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
      return typeof result === 'undefined' || result == null ? this : result;
    };
  }
};