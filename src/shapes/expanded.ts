import { ShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const NAME = "expanded";

export type ExpandedShapeOptions = {
  scale?: number;
  duration?: number;
  opacity?: number;
};

export const defaultExpandedShapeOptions: Required<ExpandedShapeOptions> = {
  scale: 2,
  duration: 0.2,
  opacity: 0.4,
};

export const expandedShapeFactory: ShapeFactory<ExpandedShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<ExpandedShapeOptions> = {
    ...defaultExpandedShapeOptions,
    ..._options,
  };

  const getter = gsap.getProperty(pointer);

  const width = getter("width") as number;
  const height = getter("height") as number;

  const backups: gsap.TweenVars = {
    width,
    height,
    opacity: getter("opacity"),
  };

  return {
    name: NAME,

    transform: ({ apply }) => {
      apply({
        width: width * options.scale,
        height: height * options.scale,
        opacity: options.opacity,
        duration: options.duration,
      });
    },

    restore: ({ apply }) => {
      apply({ ...backups, duration: options.duration, overwrite: true });
    },
  };
};
