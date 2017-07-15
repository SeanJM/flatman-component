const watch = require('./watch');
const path = require('path');
const fs = require('fs');
const dir = 'src/scripts/';
const out = 'index.js';
const test = require('./test');

const files = [
  "getComponentNames",
  "createComponentMethodProxy",
  "createComponentConstructor",
  "main/Component",
  "main/Component.create",
  "main/Component.createWrapper",
  "main/Component.facade",
  "main/Component.find",
  "main/Component.off",
  "main/Component.onCreate",
  "main/Component.trigger",
  "main/Component.prototype.after",
  "main/Component.prototype.append",
  "main/Component.prototype.appendTo",
  "main/Component.prototype.before",
  "main/Component.prototype.closest",
  "main/Component.prototype.disable",
  "main/Component.prototype.is",
  "main/Component.prototype.enable",
  "main/Component.prototype.mapChildrenToNode",
  "main/Component.prototype.off",
  "main/Component.prototype.on",
  "main/Component.prototype.once",
  "main/Component.prototype.prepend",
  "main/Component.prototype.remove",
  "main/Component.prototype.trigger",
  "exports"
];

function render() {
  const str = [];

  console.log('Building \"' + out + '\" @ ' + new Date());

  files.forEach(filename => {
    str.push(
      fs.readFileSync(
        path.resolve(path.join(dir, filename + '.js')),
        "utf8"
      )
    );
  });

  fs.writeFileSync(
    path.resolve(out),
    str.join('\n\n')
  );
}

render();
test();

if (process.env.ENV !== 'prod') {
  watch('src/scripts/**/*.js', function () {
    render();
    test();
  });

  watch('test/**/*.js', function () {
    test();
  });
}