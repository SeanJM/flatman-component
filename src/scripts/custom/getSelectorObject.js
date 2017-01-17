function getSelectorObject(selector) {
  var classNames = selector.match(/\.[a-zA-Z0-9\-\_]+/g);
  var id = selector.match(/\#[a-zA-Z0-9\-\_]+/);
  var attr = selector.match(/\[[^\]]+?\]/g);
  var tagName = selector.match(/^[a-zA-Z0-9\-\_]+/);

  var selectorObject = {
    tagName : tagName ? tagName[0] : false,
    attributes : {}
  };

  if (classNames) {
    selectorObject.attributes.className = classNames.map(function (a) {
      return a.slice(1);
    });
  }

  if (id) {
    selectorObject.attributes.id = id[0].slice(1);
  }

  if (attr) {
    attr.forEach(function (string) {
      var value = string.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);
      value[1] = value[1] === 'class' ? 'className' : value[1];
      value[3] = value[3] ? value[3].slice(1, -1) : false;

      if (value[2]) {
        if (value[2] === '*') {
          selectorObject.attributes[value[1]] = new RegExp(value[3]);
        } else if (value[2] === '^') {
          selectorObject.attributes[value[1]] = new RegExp('^' + value[3]);
        } else if (value[2] === '$') {
          selectorObject.attributes[value[1]] = new RegExp(value[3] + '$');
        }
      } else if (value[3]) {
        selectorObject.attributes[value[1]] = new RegExp('^' + value[3] + '$');
      } else {
        selectorObject.attributes[value[1]] = new RegExp('.+');
      }
    });
  }

  return selectorObject;
}
