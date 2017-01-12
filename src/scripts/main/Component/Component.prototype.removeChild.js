Component.prototype.removeChild = function (maybeChild) {
  if (Array.isArray(maybeChild)) {
    maybeChild.forEach(function (child) {
      child.remove();
    });
  } else {
    maybeChild.remove();
  }
  return this;
};
