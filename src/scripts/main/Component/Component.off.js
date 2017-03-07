Component.off = function (names, callback) {
  function each(name, callback) {
    var subscribers = Component.subscribers[name];
    subscribers.splice(subscribers.indexOf(callback), 1);
  }

  names = names.toLowerCase().split(',');
  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length && callback) {
      each(names[i], callback);
    } else while (Component.subscribers[names[i]].length) {
      each(names[i], Component.subscribers[names[i]][0]);
    }
  }

  return Component;
};
