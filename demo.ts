import { variableCursor } from "./src/variableCursor";

await new Promise<void>((resolve) =>
  window.addEventListener("DOMContentLoaded", () => resolve())
);

const cursor = variableCursor();
cursor.mount();
