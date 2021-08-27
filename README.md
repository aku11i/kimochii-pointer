# kimochii-pointer

A smooth and variable mouse pointer for JavaScript.

[![](./assets/thumbnail.png)](https://twitter.com/aku11i/status/1430803913876271109 "preview (Twitter)")

## Supported Platforms

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

## Usage

Initialize in your entry point.

```typescript
import { KimochiiPointer } from "kimochii-pointer";

const pointer = new KimochiiPointer();

pointer.mount();
```

If you want to hide default mouse cursor of operation system, add below style to your global css:

```css
* {
  cursor: none !important;
}
```

Add custom attribute `data-kimochii-pointer` to the element you want to change cursor.

e.g.:

```html
<!-- Pointer sticks to the button. -->
<button data-kimochii-pointer="sticky">BUTTON</button>

<!-- Pointer is expanded while it is on the link. -->
<a data-kimochii-pointer="expanded">LINK</a>
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

Then you can start development by editing `demo.html`, `demo.ts`, `src/kimochiiPointer.ts`.

### Test

There are no tests yet. 😱
