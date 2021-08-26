import { gsap, Power2 } from "gsap";

export const TYPE_ATTRIBUTE_NAME = "data-variable-cursor-type";

export enum VariableCursorType {
  NONE = "none",
  NORMAL = "normal",
  STICK = "stick",
  EXPAND = "expand",
}

export type VariableCursorOptions = {
  pointerSize?: number;
  pointerColor?: string;
  pointerOpacity?: number;
  pointerBorderRadius?: string;
  normalDuration?: number;
  stickDuration?: number;
  stickOpacity?: number;
  moveDuration?: number;
  expandScale?: number;
  expandDuration?: number;
  expandOpacity?: number;
  zIndex?: string;
};

export type VariableCursorResult = {
  element: HTMLElement;
  mount: (to?: HTMLElement) => void;
  unmount: () => void;
};

export function variableCursor(
  element: VariableCursorResult["element"] = document.createElement("div"),
  {
    pointerSize = 30,
    pointerColor = "gray",
    pointerOpacity = 0.5,
    pointerBorderRadius = "50%",
    normalDuration = 0.1,
    stickDuration = 0.15,
    stickOpacity = 0.3,
    moveDuration = 0.1,
    expandScale = 2,
    expandDuration = 0.1,
    expandOpacity = 0.4,
    zIndex = "100000",
  }: VariableCursorOptions = {}
): VariableCursorResult {
  let current: VariableCursorType = VariableCursorType.NONE;

  element.style.position = "absolute";
  element.style.transform = "translate(-50%, -50%)";
  element.style.zIndex = zIndex;
  element.style.pointerEvents = "none";

  gsap.set(element, {
    opacity: pointerOpacity,
    backgroundColor: pointerColor,
    borderRadius: pointerBorderRadius,
    width: pointerSize,
    height: pointerSize,
    top: -pointerSize,
    left: -pointerSize,
  });

  const normal = () => {
    if (current === VariableCursorType.NORMAL) return;

    current = VariableCursorType.NORMAL;

    gsap.to(element, {
      width: pointerSize,
      height: pointerSize,
      opacity: pointerOpacity,
      borderRadius: pointerBorderRadius,
      duration: normalDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  };

  const stick = (target: HTMLElement) => {
    if (current === VariableCursorType.STICK) return;

    current = VariableCursorType.STICK;

    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = target;

    gsap.to(element, {
      top: offsetTop + offsetHeight / 2,
      left: offsetLeft + offsetWidth / 2,
      width: offsetWidth,
      height: offsetHeight,
      opacity: stickOpacity,
      borderRadius: `${Math.min(offsetHeight, offsetWidth) * 0.1}px`,
      duration: stickDuration,
      ease: Power2.easeInOut,
      overwrite: true,
    });
  };

  const expand = () => {
    if (current === VariableCursorType.EXPAND) return;

    current = VariableCursorType.EXPAND;

    gsap.to(element, {
      width: pointerSize * expandScale,
      height: pointerSize * expandScale,
      opacity: expandOpacity,
      duration: expandDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { pageX, pageY, clientX, clientY } = event;

    if (current === VariableCursorType.NONE) {
      gsap.set(element, {
        top: pageY,
        left: pageX,
      });
      normal();
      return;
    }

    if (current !== VariableCursorType.STICK) {
      gsap.to(element, {
        top: pageY,
        left: pageX,
        duration: moveDuration,
      });
    }

    const target = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.hasAttribute(TYPE_ATTRIBUTE_NAME));

    if (!target) {
      if (current !== VariableCursorType.NORMAL) normal();
      return;
    }

    const cursorType =
      (target.getAttribute(TYPE_ATTRIBUTE_NAME) as VariableCursorType) ||
      VariableCursorType.NORMAL;

    switch (cursorType) {
      case VariableCursorType.STICK:
        stick(target as HTMLElement);
        return;
      case VariableCursorType.EXPAND:
        expand();
        return;
      default:
        return;
    }
  };

  const mount: VariableCursorResult["mount"] = (to = document.body) => {
    window.addEventListener("mousemove", handleMouseMove);
    to.appendChild(element);
  };

  const unmount: VariableCursorResult["unmount"] = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    element.remove();
  };

  return { element, mount, unmount };
}
