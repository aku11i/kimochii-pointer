import { ShapeFactory } from "../shape";
import { Power2 } from "gsap";

const NAME = "sticky";

export type StickyShapeOptions = {
  duration?: number;
  padding?: number;
  opacity?: number;
  radius?: number;
  ease?: gsap.EaseFunction;
};

export const defaultStickyShapeOptions: Required<StickyShapeOptions> = {
  duration: 0.15,
  padding: 0,
  opacity: 0.3,
  radius: 0.1,
  ease: Power2.easeOut,
};

export const stickyShapeFactory: ShapeFactory<StickyShapeOptions> = (
  pointer,
  _options = {}
) => {
  const options: Required<StickyShapeOptions> = {
    ...defaultStickyShapeOptions,
    ..._options,
  };

  const backups: gsap.TweenVars = {
    width: pointer.getProperty("width"),
    height: pointer.getProperty("height"),
    opacity: pointer.getProperty("opacity"),
    borderRadius: pointer.getProperty("borderRadius"),
  };

  return {
    name: NAME,

    shouldFixPosition: () => true,

    transform: (target) => {
      const width = target.offsetWidth + options.padding;
      const height = target.offsetHeight + options.padding;

      pointer.apply({
        top: target.offsetTop + height / 2,
        left: target.offsetLeft + width / 2,
        width,
        height,
        opacity: options.opacity,
        borderRadius: `${Math.min(width, height) * options.radius}px`,
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
