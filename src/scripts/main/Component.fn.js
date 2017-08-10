Component.fn = function (name, callback) {
  if (typeof name === "string" && typeof callback === "function") {
    Component.prototype[name] = callback;

    for (var k in Component.lib) {
      Component.lib[k].prototype[name] = callback;
    }

  } else if (typeof name !== "string") {
    throw new Error(
      "Component.fn is missing the \"name\" argument."
    );
  } else if (typeof callback !== "function") {
    throw new Error(
      "Component.fn is missing the \"callback\" argument."
    );
  }
};
