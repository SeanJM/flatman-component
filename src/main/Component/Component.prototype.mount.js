Component.prototype.mount = function () {
  function triggerMount(element) {
    element.trigger('mount');

    if (element.node.document) {
      element.node.document.trigger('mount');
    }

    if (element.elements) {
      element.elements.forEach(triggerMount);
    }
  }

  triggerMount(this);
};
