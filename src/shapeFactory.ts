import { Shape } from "./shape";

export type ShapeFactory = (pointer: HTMLElement) => Shape;

export const createShapeFactory = (factory: ShapeFactory): ShapeFactory =>
  factory;
