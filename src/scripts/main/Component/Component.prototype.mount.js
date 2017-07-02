Component.prototype.mount = function () {
  function triggerMount(element) {
    element.trigger('mount');

    if (element.document) {
      element.document.trigger('mount');
    }
  }

  triggerMount(this);
};
