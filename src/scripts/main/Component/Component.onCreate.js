Component.onCreate = function (callback) {
  Component.onCreateListeners.push(callback);
  return Component;
};
