import { Power2 } from "gsap";
import { ShapeFactory } from "../shape";

const NAME = "lighter";

export type LighterShapeOptions = {
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultLighterShapeOptions: Required<LighterShapeOptions> = {
  duration: 0.2,
  opacity: 0.3,
  ease: Power2.easeOut,
};

export const lighterShapeFactory: ShapeFactory<LighterShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<LighterShapeOptions> = {
    ...defaultLighterShapeOptions,
    ..._options,
  };

  const backups: gsap.TweenVars = {
    opacity: pointer.getProperty("opacity"),
  };

  return {
    name: NAME,

    transform: () => {
      pointer.apply({
        opacity: options.opacity,
        duration: options.duration,
        ease: options.ease,
      });
    },

    restore: () => {
      pointer.apply({
        ...backups,
        duration: options.duration,
        ease: options.ease,
        overwrite: true,
      });
    },
  };
};
