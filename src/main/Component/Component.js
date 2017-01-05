function Component() {
  this.node = {
    document : el('div')
  };
}

(function () {
  var prototype = el('div').constructor.prototype;
  for (var method in prototype) {
    if (!Component.prototype[method]) {
      Component.prototype[method] = facade.component(method);
    }
  }
}());
