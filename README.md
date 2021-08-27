# kimochii-pointer

A smooth and variable mouse pointer for JavaScript.

## Installation

Install this library:

```sh
npm install --save kimochii-pointer
# yarn add kimochii-pointer
```

Install [GSAP](https://github.com/greensock/GSAP) for smooth animation:

```sh
npm install --save gsap@3.x
# yarn add gsap@3.x
```

## Usage

Initialize in your entry point.

```typescript
import { KimochiiPointer } from "kimochii-pointer";

const pointer = new KimochiiPointer();
pointer.mount();
```

Add custom attribute `data-kimochii-pointer` to Element which you want to change cursor.

e.g.:

```html
<!-- Pointer sticks to the button. -->
<button data-kimochii-pointer="sticky">BUTTON</button>

<!-- Pointer is extended while it is on the link. -->
<a data-kimochii-pointer="extended">LINK</a>
```
