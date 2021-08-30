import gsap, { Power2 } from "gsap";
import { ShapeFactory } from "../shapeFactory";

const NAME = "text";

export type TextShapeOptions = {
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultTextShapeOptions: Required<TextShapeOptions> = {
  duration: 0.1,
  opacity: 0.6,
  ease: Power2.easeOut,
};

export const textShapeFactory: ShapeFactory<TextShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<TextShapeOptions> = {
    ...defaultTextShapeOptions,
    ..._options,
  };

  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    width: getter("width"),
    height: getter("height"),
    opacity: getter("opacity"),
    borderRadius: getter("borderRadius"),
  };

  return {
    name: NAME,

    transform: ({ target, apply }) => {
      const targetFontSize = gsap.getProperty(target, "fontSize") as number;
      const height = targetFontSize * 1.2;
      const width = 5 + targetFontSize * 0.05;

      apply({
        width,
        height,
        borderRadius: `${width / 2}px`,
        opacity: options.opacity,
        duration: options.duration,
        ease: options.ease,
      });
    },

    restore: ({ apply }) => {
      apply({
        ...backups,
        duration: options.duration,
        ease: options.ease,
        overwrite: true,
      });
    },
  };
};
