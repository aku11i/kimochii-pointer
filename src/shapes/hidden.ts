import { createShapeFactory } from "../shapeFactory";
import gsap from "gsap";

export default createShapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    opacity: getter("opacity"),
  };

  return {
    name: "hidden",

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
