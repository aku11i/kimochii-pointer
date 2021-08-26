import { gsap, Power2 } from "gsap";

export const MODE_ATTRIBUTE_NAME = "data-variable-cursor";

export const enum VariableCursorMode {
  NORMAL = "normal",
  STICKY = "sticky",
  EXPANDED = "expanded",
  /** Only used in initializing. */
  _NONE = "none",
}

export type VariableCursorOptions = {
  pointerSize?: number;
  pointerColor?: string;
  pointerOpacity?: number;
  pointerBorderRadius?: string;
  normalDuration?: number;
  stickyDuration?: number;
  stickyOpacity?: number;
  moveDuration?: number;
  expandedScale?: number;
  expandedDuration?: number;
  expandedOpacity?: number;
  zIndex?: string;
};

const defualtOptions: Required<VariableCursorOptions> = {
  pointerSize: 30,
  pointerColor: "gray",
  pointerOpacity: 0.5,
  pointerBorderRadius: "50%",
  normalDuration: 0.1,
  stickyDuration: 0.15,
  stickyOpacity: 0.3,
  moveDuration: 0.1,
  expandedScale: 2,
  expandedDuration: 0.1,
  expandedOpacity: 0.4,
  zIndex: "100000",
} as const;

export type VariableCursorResult = {
  element: HTMLElement;
  mount: (to?: HTMLElement) => void;
  unmount: () => void;
  normalMode: () => void;
  stickyMode: (target: HTMLElement) => void;
  expandedMode: () => void;
  getCurrentMode: () => VariableCursorMode;
};

export type VariableCursor = (
  options?: VariableCursorOptions
) => VariableCursorResult;

export const variableCursor: VariableCursor = (_options = {}) => {
  let current: VariableCursorMode = VariableCursorMode._NONE;
  const getCurrentMode: VariableCursorResult["getCurrentMode"] = () => current;

  const element = document.createElement("div");

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

  const normalMode: VariableCursorResult["normalMode"] = () => {
    if (current === VariableCursorMode.NORMAL) return;

    current = VariableCursorMode.NORMAL;

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

  const stickyMode: VariableCursorResult["stickyMode"] = (target) => {
    if (current === VariableCursorMode.STICKY) return;

    current = VariableCursorMode.STICKY;

    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = target;

    gsap.to(element, {
      top: offsetTop + offsetHeight / 2,
      left: offsetLeft + offsetWidth / 2,
      width: offsetWidth,
      height: offsetHeight,
      opacity: options.stickyOpacity,
      borderRadius: `${Math.min(offsetHeight, offsetWidth) * 0.1}px`,
      duration: options.stickyDuration,
      ease: Power2.easeInOut,
      overwrite: true,
    });
  };

  const expandedMode: VariableCursorResult["expandedMode"] = () => {
    if (current === VariableCursorMode.EXPANDED) return;

    current = VariableCursorMode.EXPANDED;

    gsap.to(element, {
      width: options.pointerSize * options.expandedScale,
      height: options.pointerSize * options.expandedScale,
      opacity: options.expandedOpacity,
      borderRadius: options.pointerBorderRadius,
      duration: options.expandedDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { pageX, pageY, clientX, clientY } = event;

    if (current === VariableCursorMode._NONE) {
      gsap.set(element, {
        top: pageY,
        left: pageX,
      });
      normalMode();
      return;
    }

    if (current !== VariableCursorMode.STICKY) {
      gsap.to(element, {
        top: pageY,
        left: pageX,
        duration: options.moveDuration,
      });
    }

    const target = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.hasAttribute(MODE_ATTRIBUTE_NAME));

    if (!target) {
      if (current !== VariableCursorMode.NORMAL) normalMode();
      return;
    }

    const cursorType =
      (target.getAttribute(MODE_ATTRIBUTE_NAME) as VariableCursorMode) ||
      VariableCursorMode.NORMAL;

    switch (cursorType) {
      case VariableCursorMode.STICKY:
        stickyMode(target as HTMLElement);
        return;
      case VariableCursorMode.EXPANDED:
        expandedMode();
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

  return {
    element,
    mount,
    unmount,
    getCurrentMode,
    normalMode,
    stickyMode,
    expandedMode,
  };
};
