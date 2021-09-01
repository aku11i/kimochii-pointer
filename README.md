# kimochii-pointer

A smooth and variable mouse pointer for JavaScript.

[![](./assets/thumbnail.png)](https://twitter.com/aku11i/status/1430803913876271109 "preview (Twitter)")

## Demo

Used in my website.

https://akutagawa.dev/

## Supported platforms

Tested on latest version of major browsers (Chrome, Safari, Firefox).

## Installation

Install this package:

```sh
npm install --save kimochii-pointer
# yarn add kimochii-pointer
```

Install [GSAP](https://github.com/greensock/GSAP) for smooth animation:

```sh
npm install --save gsap@3.x
# yarn add gsap@3.x
```

## General usage

Initialize in your entry point:

```typescript
import { KimochiiPointer } from "kimochii-pointer";

const pointer = new KimochiiPointer();

pointer.mount(); // Pointer will be shown to the display.
```

Set a shape name to custom attribute `data-kimochii-pointer` of HTML element you want to change the shape of pointer.

e.g.:

```html
<button data-kimochii-pointer="sticky">BUTTON</button>
```

Pointer will be sticked to the element when you move to over the one.

If you want to hide default mouse cursor of operation system, add below style to your global css:

```css
* {
  cursor: none !important;
}
```

## Preinstalled shapes

There are preinstalled shapes.

You can use them without any steps.

### Expanded

Pointer expands its scale.

```html
<div data-kimochii-pointer="expanded"></div>
```

### Sticky

Pointer sticks to the element.

```html
<div data-kimochii-pointer="sticky"></div>
```

### Text

Pointer stretches vertically like a text cursor.

```html
<p data-kimochii-pointer="text"></p>
```

### Hidden

Pointer hides its shape.

```html
<div data-kimochii-pointer="hidden"></div>
```

### Lighter

Pointer decreases its opacity.

```html
<div data-kimochii-pointer="lighter"></div>
```

## Create a custom shape

`ShapeFactory` is usefull function type to create a custom shape.

Below is an example of custom shape that change pointer color to pink.

```typescript
import { ShapeFactory } from "kimochii-pointer";

// Create a custom shape.
class PinkShape implements Shape {
  name: Shape["name"] = "pink";

  private _pointer: Pointer;

  private _backup: Required<Pick<gsap.TweenVars, "backgroundColor">>;

  constructor(pointer: Pointer) {
    this._pointer = pointer;
    this._backup = {
      // Backup default pointer color to restore.
      backgroundColor: this._pointer.getProperty("backgroundColor"),
    };
  }

  transform: Shape["transform"] = () => {
    this._pointer.apply({ backgroundColor: "hotpink" });
  };

  restore: Shape["restore"] = () => {
    this._pointer.apply({ ...this._backup });
  };
}
```

Register to the pointer:

```typescript
import { KimochiiPointer, Shape } from "kimochii-pointer";

const pointer = new KimochiiPointer();
pointer.mount();

pointer.register(new PinkShape(pointer));
```

Use from HTML elemen.

```html
<div data-kimochii-pointer="pink"></div>
```

## Contribution

### Setup

```sh
git clone https://github.com/aku11i/kimochii-pointer.git
cd kimochii-pointer

yarn install
```

### Development

```sh
yarn dev
```

Demo page (`http://localhost:3000/demo.html`) will be opened automatically.

Then you can start development by editing `demo.html`, `demo.ts`, `src/`.

### Test

There are no tests yet. 😱
