import { shapeFactory } from "../shapeFactory";
import gsap from "gsap";

export default shapeFactory((pointer) => {
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
