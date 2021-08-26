import { gsap, Power2 } from "gsap";

export const TYPE_ATTRIBUTE_NAME = "data-variable-cursor-type";
export const POINTER_CLASS_NAME = "__variable-cursor-pointer";

export const enum VariableCursorType {
  NORMAL = "normal",
  STICK = "stick",
  EXPAND = "expand",
  _NONE = "none",
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

const defualtOptions: Required<VariableCursorOptions> = {
  pointerSize: 30,
  pointerColor: "gray",
  pointerOpacity: 0.5,
  pointerBorderRadius: "50%",
  normalDuration: 0.1,
  stickDuration: 0.15,
  stickOpacity: 0.3,
  moveDuration: 0.1,
  expandScale: 2,
  expandDuration: 0.1,
  expandOpacity: 0.4,
  zIndex: "100000",
} as const;

export type VariableCursorResult = {
  element: HTMLElement;
  mount: (to?: HTMLElement) => void;
  unmount: () => void;
};

export type VariableCursor = (
  options?: VariableCursorOptions
) => VariableCursorResult;

export const variableCursor: VariableCursor = (_options = {}) => {
  let current: VariableCursorType = VariableCursorType._NONE;

  const element = document.createElement("div");
  element.classList.add(POINTER_CLASS_NAME);

  const options: Required<VariableCursorOptions> = {
    ...defualtOptions,
    ..._options,
  };

  element.style.position = "absolute";
  element.style.transform = "translate(-50%, -50%)";
  element.style.zIndex = options.zIndex;
  element.style.pointerEvents = "none";

  gsap.set(element, {
    opacity: options.pointerOpacity,
    backgroundColor: options.pointerColor,
    borderRadius: options.pointerBorderRadius,
    width: options.pointerSize,
    height: options.pointerSize,
    top: -options.pointerSize,
    left: -options.pointerSize,
  });

  const normal = () => {
    if (current === VariableCursorType.NORMAL) return;

    current = VariableCursorType.NORMAL;

    gsap.to(element, {
      width: options.pointerSize,
      height: options.pointerSize,
      opacity: options.pointerOpacity,
      borderRadius: options.pointerBorderRadius,
      duration: options.normalDuration,
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
      opacity: options.stickOpacity,
      borderRadius: `${Math.min(offsetHeight, offsetWidth) * 0.1}px`,
      duration: options.stickDuration,
      ease: Power2.easeInOut,
      overwrite: true,
    });
  };

  const expand = () => {
    if (current === VariableCursorType.EXPAND) return;

    current = VariableCursorType.EXPAND;

    gsap.to(element, {
      width: options.pointerSize * options.expandScale,
      height: options.pointerSize * options.expandScale,
      opacity: options.expandOpacity,
      borderRadius: options.pointerBorderRadius,
      duration: options.expandDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { pageX, pageY, clientX, clientY } = event;

    if (current === VariableCursorType._NONE) {
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
        duration: options.moveDuration,
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
};
