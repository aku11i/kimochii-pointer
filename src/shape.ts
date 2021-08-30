import { KimochiiPointer } from "./kimochiiPointer";

export type Shape = {
  name: string;

  shouldFixPosition?: () => boolean;

  transform: (target: HTMLElement) => void;

  restore: () => void;
};

export type ShapeFactory<T extends Record<string, unknown>> = (
  pointer: KimochiiPointer,
  options?: T
) => Shape;
