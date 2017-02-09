Component.find = function (name) {
  var matches = [];
  for (var k in Component.lib) {
    if (name.test(k)) {
      matches.push(k);
    }
  }
  return matches;
};
