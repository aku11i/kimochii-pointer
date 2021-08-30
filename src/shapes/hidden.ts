import gsap from "gsap";
import { ShapeFactory } from "../shapeFactory";

const NAME = "hidden";

export type HiddenShapeOptions = {
  duration?: number;
};

export const defaultHiddenShapeOptions: Required<HiddenShapeOptions> = {
  duration: 0.2,
};

export const hiddenShapeFactory: ShapeFactory<HiddenShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<HiddenShapeOptions> = {
    ...defaultHiddenShapeOptions,
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
        opacity: 0,
        duration: options.duration,
      });
    },

    restore: ({ apply }) => {
      apply({ ...backups, duration: options.duration, overwrite: true });
    },
  };
};
