import { ShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const NAME = "sticky";

export type StickyShapeOptions = {
  duration?: number;
  padding?: number;
  opacity?: number;
  radius?: number;
};

export const defaultStickyShapeOptions: Required<StickyShapeOptions> = {
  duration: 0.2,
  padding: 0,
  opacity: 0.3,
  radius: 0.1,
};

export const stickyShapeFactory: ShapeFactory<StickyShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<StickyShapeOptions> = {
    ...defaultStickyShapeOptions,
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

    shouldFixPosition: () => true,

    transform: ({ target, apply }) => {
      const width = target.offsetWidth + options.padding;
      const height = target.offsetHeight + options.padding;

      apply({
        top: target.offsetTop + height / 2,
        left: target.offsetLeft + width / 2,
        width,
        height,
        opacity: options.opacity,
        borderRadius: `${Math.min(width, height) * options.radius}px`,
        duration: options.duration,
      });
    },

    restore: ({ apply }) => {
      apply({ ...backups, duration: options.duration, overwrite: true });
    },
  };
};
