A Component function to work with `flatman-server` and `flatman`. Designed to act as a replacement for the node which `flatman-server` and `flatman` generate.

What it does is act as an interface between the component and the `this.node.document`.

Another thing it does is normalize the `Component` so that it behaves like a `DomNode` from `flatman-server` and `flatman`. Essentially making sure that if you pass a `component` around or a `DomNode` the behavior is consistent.

The `Component` must be initialized using the `facade` method.
