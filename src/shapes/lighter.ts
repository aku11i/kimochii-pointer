import gsap from "gsap";
import { ShapeFactory } from "../shapeFactory";

const NAME = "lighter";

export type LighterShapeOptions = {
  duration?: number;
  opacity?: number;
};

export const defaultLighterShapeOptions: Required<LighterShapeOptions> = {
  duration: 0.2,
  opacity: 0.3,
};

export const lighterShapeFactory: ShapeFactory<LighterShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<LighterShapeOptions> = {
    ...defaultLighterShapeOptions,
    ..._options,
  };

  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    opacity: getter("opacity"),
  };

  return {
    name: NAME,

    transform: ({ apply }) => {
      apply({
        opacity: options.opacity,
        duration: options.duration,
      });
    },

    restore: ({ apply }) => {
      apply({ ...backups, duration: options.duration, overwrite: true });
    },
  };
};
