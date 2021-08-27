import { gsap, Power2 } from "gsap";

export const MODE_ATTRIBUTE_NAME = "data-kimochii-pointer";

export enum PointerMode {
  NORMAL = "normal",
  STICKY = "sticky",
  EXPANDED = "expanded",
  /** Only used for initializing. */
  _NONE = "none",
}

export type PointerOptions = {
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

export const pointerDefaultOptions: Required<PointerOptions> = {
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

export class KimochiiPointer {
  private readonly _options: Required<PointerOptions>;

  private readonly _element: HTMLElement;
  public get element(): HTMLElement {
    return this._element;
  }

  private _currentMode: PointerMode;
  public get currentMode(): PointerMode {
    return this._currentMode;
  }

  constructor(userOptions: PointerOptions = {}) {
    this._options = {
      ...pointerDefaultOptions,
      ...userOptions,
    };

    this._element = document.createElement("div");
    this._currentMode = PointerMode._NONE;

    this._element.style.position = "absolute";
    this._element.style.transform = "translate(-50%, -50%)";
    this._element.style.zIndex = this._options.zIndex;
    this._element.style.pointerEvents = "none";

    gsap.set(this._element, {
      opacity: this._options.pointerOpacity,
      backgroundColor: this._options.pointerColor,
      borderRadius: this._options.pointerBorderRadius,
      width: this._options.pointerSize,
      height: this._options.pointerSize,
      top: -this._options.pointerSize,
      left: -this._options.pointerSize,
    });
  }

  setNormalMode(): void {
    this._currentMode = PointerMode.NORMAL;

    gsap.to(this._element, {
      width: this._options.pointerSize,
      height: this._options.pointerSize,
      opacity: this._options.pointerOpacity,
      borderRadius: this._options.pointerBorderRadius,
      duration: this._options.normalDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  }

  setStickyMode(target: HTMLElement): void {
    this._currentMode = PointerMode.STICKY;

    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = target;

    gsap.to(this._element, {
      top: offsetTop + offsetHeight / 2,
      left: offsetLeft + offsetWidth / 2,
      width: offsetWidth,
      height: offsetHeight,
      opacity: this._options.stickyOpacity,
      borderRadius: `${Math.min(offsetHeight, offsetWidth) * 0.1}px`,
      duration: this._options.stickyDuration,
      ease: Power2.easeInOut,
      overwrite: true,
    });
  }

  setExpandedMode(): void {
    this._currentMode = PointerMode.EXPANDED;

    gsap.to(this._element, {
      width: this._options.pointerSize * this._options.expandedScale,
      height: this._options.pointerSize * this._options.expandedScale,
      opacity: this._options.expandedOpacity,
      borderRadius: this._options.pointerBorderRadius,
      duration: this._options.expandedDuration,
      ease: Power2.easeOut,
      overwrite: true,
    });
  }

  private _handleMouseMove = (event: MouseEvent): void => {
    const { pageX, pageY, clientX, clientY } = event;

    if (this._currentMode === PointerMode._NONE) {
      gsap.set(this._element, {
        top: pageY,
        left: pageX,
      });
      this.setNormalMode();
      return;
    }

    if (this.currentMode !== PointerMode.STICKY) {
      gsap.to(this._element, {
        top: pageY,
        left: pageX,
        duration: this._options.moveDuration,
      });
    }

    const target = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.hasAttribute(MODE_ATTRIBUTE_NAME));

    if (!target) {
      if (this._currentMode !== PointerMode.NORMAL) {
        this.setNormalMode();
      }
      return;
    }

    const cursorMode = target.getAttribute(MODE_ATTRIBUTE_NAME) as PointerMode;

    switch (cursorMode) {
      case PointerMode.NORMAL: {
        if (this._currentMode === PointerMode.NORMAL) break;
        this.setNormalMode();
        break;
      }

      case PointerMode.STICKY: {
        if (this._currentMode === PointerMode.STICKY) break;
        this.setStickyMode(target as HTMLElement);
        break;
      }

      case PointerMode.EXPANDED: {
        if (this._currentMode === PointerMode.EXPANDED) break;
        this.setExpandedMode();
        break;
      }
    }
  };

  mount(to = document.body): void {
    window.addEventListener("mousemove", this._handleMouseMove);
    to.appendChild(this._element);
  }

  unmount(): void {
    window.removeEventListener("mousemove", this._handleMouseMove);
    this._element.remove();
  }
}

export default KimochiiPointer;
