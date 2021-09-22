import { KimochiiPointer } from "./kimochiiPointer";

test("The pointer is mounted to the dom.", () => {
  const pointer = new KimochiiPointer();
  pointer.mount();

  expect(document.body.lastChild).toBe(pointer.element);
});
