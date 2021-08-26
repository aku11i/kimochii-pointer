import { VariableCursor } from "./src/variableCursor";

await new Promise<void>((resolve) =>
  window.addEventListener("DOMContentLoaded", () => resolve())
);

const cursor = new VariableCursor();

cursor.mount();
