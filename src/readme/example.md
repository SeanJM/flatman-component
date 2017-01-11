It must be initialized to add a facade to what ever constructor you are using.

You don't need to include the function because the `facade` it creates will execute the methods on `this`.

```javascript
const el = flatman.el;
const proto = el('div').constructor.prototype;
const methods = Object.keys(proto);
Component.facade(methods);
```
