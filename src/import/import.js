var IS_NODE_JS = (
  typeof module !== 'undefined'
  && typeof require === 'function'
);

var el = IS_NODE_JS
  ? require('flatman').el
  : window.el;

var _ = IS_NODE_JS
  ? require('lodash')
  : window._;
