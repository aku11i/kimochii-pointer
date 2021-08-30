import { Shape } from "./shape";

export type ShapeFactory<T extends Record<string, unknown>> = (
  pointer: HTMLElement,
  options?: T
) => Shape;
