import { KimochiiPointer } from "./src";

await new Promise<void>((resolve) =>
  window.addEventListener("DOMContentLoaded", () => resolve())
);

const pointer = new KimochiiPointer();

pointer.mount();
