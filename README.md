# Flatman Component 0.10.0
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 24 tests pass

## Table of Contents

#### Overview


- Description
  - [Description](#--description-top)

- Example
  - [Example](#--example-top)

- Installation
  - [Installation](#--installation-top)

- Notes
  - [Notes](#--notes-top)

- Component.create
  - [Component.create](#--component-create-top)
- [Tests](#tests)

## Description
### Description.md ([top](#table-of-contents))

A Component function to work with `flatman-server` and `flatman`. Designed to act as a replacement for the node which `flatman-server` and `flatman` generate.

What it does is act as an interface between the component and the `this.node.document`.

Another thing it does is normalize the `Component` so that it behaves like a `DomNode` from `flatman-server` and `flatman`. Essentially making sure that if you pass a `component` around or a `DomNode` the behavior is consistent.

The `Component` must be initialized using the `facade` method.

## Example
### Example.md ([top](#table-of-contents))

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

## Installation
### Installation.md ([top](#table-of-contents))

`npm i -S flatman-component`

## Notes
### Notes.md ([top](#table-of-contents))

This is a supporting library and is not intended to be used stand alone.

## Component.create
### Component.create.md ([top](#table-of-contents))

```javascript
Component.create('name', {
  constructor(props) {
    // optional
  }
  render() {
    return el('div');
  }
});
```

***

## Tests

```
   1. Add class.......................................................... ✅
   2. Add class on 'className' array..................................... ✅
   3. .append().......................................................... ✅
   4. .appendTo()........................................................ ✅
   5. .before().......................................................... ✅
   6. .closest()......................................................... ✅
   7. .closest() (string selector)....................................... ✅
   8. Create component................................................... ✅
   9. Create component (check constructor props)......................... ✅
  10. Create component (has return value)................................ ✅
  11. Create component thunk............................................. ✅
  12. Disable............................................................ ✅
  13. Component.find..................................................... ✅
  14. getNode().......................................................... ✅
  15. .is().............................................................. ✅
  16. Component.onCreate................................................. ✅
  17. Parent Component................................................... ✅
  18. Parent Node........................................................ ✅
  19. .remove().......................................................... ✅
  20. .removeChild()..................................................... ✅
  21. Remove class....................................................... ✅
  22. trigger().......................................................... ✅
  23. trigger() undefined 'on'........................................... ✅
  24. trigger() object................................................... ✅
```
