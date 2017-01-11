# Flatman Component 0.7.0
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 4 tests pass

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

## Example
### Example.md ([top](#table-of-contents))

It must be initialized to add a facade to what ever constructor you are using.

```javascript
Component.facade([ Array of Methods ]);
```
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
   1. Create component................................................... ✅
   2. Count children..................................................... ✅
   3. Parent Component................................................... ✅
   4. Parent Node........................................................ ✅
```
