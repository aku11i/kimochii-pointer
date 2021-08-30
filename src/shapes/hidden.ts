import { Power2 } from "gsap";
import { ShapeFactory } from "../types";

const NAME = "hidden";

export type HiddenShapeOptions = {
  duration?: number;
  ease?: gsap.EaseFunction;
};

export const defaultHiddenShapeOptions: Required<HiddenShapeOptions> = {
  duration: 0.2,
  ease: Power2.easeOut,
};

export const hiddenShapeFactory: ShapeFactory<HiddenShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<HiddenShapeOptions> = {
    ...defaultHiddenShapeOptions,
    ..._options,
  };

  const backups: gsap.TweenVars = {
    opacity: pointer.getProperty("opacity"),
  };

  return {
    name: NAME,

    transform: () => {
      pointer.apply({
        opacity: 0,
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
