import { Shape } from "../../src/types";

export const mockTransform = jest.fn();
export const mockRestore = jest.fn();

export const mockCustomShape = jest.fn<Shape, []>().mockImplementation(() => {
  return {
    name: "custom",
    transform: mockTransform,
    restore: mockRestore,
  };
});
