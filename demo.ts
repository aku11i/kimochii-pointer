import { KimochiiPointer, Pointer, Shape } from "./src";

await new Promise<void>((resolve) =>
  window.addEventListener("DOMContentLoaded", () => resolve())
);

const pointer = new KimochiiPointer();

pointer.mount();

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
    this._pointer.apply({ backgroundColor: "hotpink", overwrite: true });
  };

  restore: Shape["restore"] = () => {
    this._pointer.apply({ ...this._backup, overwrite: true });
  };
}

pointer.register(new PinkShape(pointer));
