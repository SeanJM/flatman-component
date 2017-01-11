It must be initialized to add a facade to what ever constructor you are using.

You don't need to include the function because the `facade` it creates will execute the methods on `this`.

```javascript
const el = flatman.el;
const proto = el('div').constructor.prototype;
const methods = Object.keys(proto);
Component.facade(methods);
```

What happens here is let's create a compoment.

```javascript
Component.create('A', {
  render() {
    // will be set to the `node` property as 'this.node.document'
    return el('div');
  }
});
```

The `Component` will expose every method that `this.node.document` has. So that, additionally to the `render` method, you inherit anything else that `this.node.document` prototype exposes.

eg: `.remove()`, `.append()`, `addClass()` etc. Unless these methods are prototypes of the component they will be applied to `this.node.document`.
