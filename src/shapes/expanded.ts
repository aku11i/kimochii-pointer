import { ShapeFactory } from "../types";
import { Power2 } from "gsap";

const NAME = "expanded";

export type ExpandedShapeOptions = {
  scale?: number;
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultExpandedShapeOptions: Required<ExpandedShapeOptions> = {
  scale: 2.5,
  duration: 0.13,
  opacity: 0.4,
  ease: Power2.easeOut,
};

export const expandedShapeFactory: ShapeFactory<ExpandedShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<ExpandedShapeOptions> = {
    ...defaultExpandedShapeOptions,
    ..._options,
  };

  const width = pointer.getProperty("width") as number;
  const height = pointer.getProperty("height") as number;

  const backups: gsap.TweenVars = {
    width,
    height,
    opacity: pointer.getProperty("opacity"),
  };

  return {
    name: NAME,

    transform: () => {
      pointer.apply({
        width: width * options.scale,
        height: height * options.scale,
        opacity: options.opacity,
        ease: options.ease,
        duration: options.duration,
      });
    },

    restore: () => {
      pointer.apply({
        ...backups,
        duration: options.duration,
        overwrite: true,
        ease: options.ease,
      });
    },
  };
};
