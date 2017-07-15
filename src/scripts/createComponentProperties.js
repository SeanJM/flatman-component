function createComponentProperties(tagName, props, children) {
  this.tagName = tagName;
  this.names = {};
  this.props = props;
  this.childNodes = [];

  if (typeof this.render === 'function') {
    this.document = this.render(props);
    this.node = this.document.node;
    if (this.document) {
      getComponentNames(this, this.document);
      this.append(children);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }
  }
}