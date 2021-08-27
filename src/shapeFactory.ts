import { Shape } from "./shape";

export type ShapeFactory = (pointer: HTMLElement) => Shape;

export const shapeFactory = (factory: ShapeFactory): ShapeFactory => factory;
