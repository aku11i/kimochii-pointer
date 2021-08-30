import { KimochiiPointer, ShapeFactory } from "./src";

await new Promise<void>((resolve) =>
  window.addEventListener("DOMContentLoaded", () => resolve())
);

const pointer = new KimochiiPointer();

pointer.mount();

// Create custom shape.
const pinkShapeFactory: ShapeFactory = (pointer) => {
  // Backup default pointer color.
  const backgroundColor = pointer.getProperty("backgroundColor");

  return {
    name: "pink",

    transform: () => {
      pointer.apply({ backgroundColor: "hotpink" });
    },

    restore: () => {
      pointer.apply({ backgroundColor });
    },
  };
};

const pinkShape = pinkShapeFactory(pointer);
pointer.register(pinkShape);
