import { createShapeFactory } from "../shapeFactory";
import gsap from "gsap";

const scale = 2;

export default createShapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    width: getter("width"),
    height: getter("height"),
    opacity: getter("opacity"),
  };

  const width = (getter("width") as number) * scale;
  const height = (getter("height") as number) * scale;

  return {
    name: "expanded",

    transform: () => {
      return {
        width,
        height,
        opacity: 0.4,
        duration: 0.1,
      };
    },

    restore: () => {
      return { ...backups, duration: 0.1, overwrite: true };
    },
  };
});
