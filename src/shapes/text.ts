import { createShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const NAME = "text";

export const textShapeFactory = createShapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    width: getter("width"),
    height: getter("height"),
    opacity: getter("opacity"),
    borderRadius: getter("borderRadius"),
  };

  return {
    name: NAME,

    transform: (target) => {
      const targetFontSize = gsap.getProperty(target, "fontSize") as number;

      return {
        width: 4,
        height: targetFontSize * 1.2,
        borderRadius: "2px",
        opacity: 0.5,
        duration: 0.1,
      };
    },

    restore: () => {
      return { ...backups, duration: 0.1, overwrite: true };
    },
  };
});
