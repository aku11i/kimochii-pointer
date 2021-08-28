import { createShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const NAME = "sticky";

export const stickyShapeFactory = createShapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    width: getter("width"),
    height: getter("height"),
    opacity: getter("opacity"),
    borderRadius: getter("borderRadius"),
  };

  return {
    name: NAME,

    fixPosition: true,

    transform: (target) => {
      return {
        top: target.offsetTop + target.offsetHeight / 2,
        left: target.offsetLeft + target.offsetWidth / 2,
        width: target.offsetWidth,
        height: target.offsetHeight,
        opacity: 0.3,
        borderRadius: `${
          Math.min(target.offsetHeight, target.offsetWidth) * 0.1
        }px`,
        duration: 0.1,
      };
    },

    restore: () => {
      return { ...backups, duration: 0.1, overwrite: true };
    },
  };
});