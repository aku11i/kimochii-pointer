import { createShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const NAME = "hidden";

export const hiddenShapeFactory = createShapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    opacity: getter("opacity"),
  };

  return {
    name: NAME,

    transform: () => {
      return {
        opacity: 0,
        duration: 0.1,
      };
    },

    restore: () => {
      return { ...backups, duration: 0.1, overwrite: true };
    },
  };
});
