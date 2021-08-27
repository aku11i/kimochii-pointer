import { shapeFactory } from "../shapeFactory";
import gsap from "gsap";

export default shapeFactory((pointer) => {
  const getter = gsap.getProperty(pointer);

  const backups: gsap.TweenVars = {
    width: getter("width"),
    height: getter("height"),
    opacity: getter("opacity"),
    backgroundColor: getter("backgroundColor"),
    borderRadius: getter("borderRadius"),
    borderWidth: getter("borderWidth"),
    borderStyle: getter("borderStyle"),
    borderColor: getter("borderColor"),
  };

  return {
    name: "outline",

    fixPosition: true,

    transform: (target) => {
      return {
        top: target.offsetTop + target.offsetHeight / 2,
        left: target.offsetLeft + target.offsetWidth / 2,
        width: target.offsetWidth,
        height: target.offsetHeight,
        opacity: 0.3,
        backgroundColor: "transparent",
        borderRadius: target.style.borderRadius,
        borderWidth:
          1 + Math.max(target.offsetHeight, target.offsetWidth) * 0.03,
        borderStyle: "solid",
        borderColor: backups.backgroundColor,
        duration: 0.2,
      };
    },

    restore: () => {
      return { ...backups, duration: 0.1, overwrite: true };
    },
  };
});
