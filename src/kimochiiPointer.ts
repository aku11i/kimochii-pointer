import { gsap, Power2 } from "gsap";
import { Shape } from "./shape";

import stickyShapeFactory from "./shapes/sticky";
import expandedShapeFactory from "./shapes/expanded";
import hiddenShapeFactory from "./shapes/hidden";
import textShapeFactory from "./shapes/text";

export const MODE_ATTRIBUTE_NAME = "data-kimochii-pointer";

export const defaultStyles: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: "100000",
  pointerEvents: "none",

  opacity: "0.5",
  backgroundColor: "gray",
  borderRadius: "50%",

  top: "-30px",
  left: "-30px",
  width: "30px",
  height: "30px",
};

export type PointerOptions = {
  defaultStyles?: Partial<CSSStyleDeclaration>;
  pointerDuration?: number;
};

export const pointerDefaultOptions: Required<PointerOptions> = {
  defaultStyles,
  pointerDuration: 0.06,
} as const;

export type MousePosition = {
  x: number;
  y: number;
};

export class KimochiiPointer {
  private readonly _options: Required<PointerOptions>;

  private readonly _mousePosition: MousePosition;

  private readonly _element: HTMLElement;
  public get element(): HTMLElement {
    return this._element;
  }

  private _targetElement: Element | undefined;

  private _currentShape: Shape | undefined;

  private _shapes: Record<string, Shape | undefined>;

  constructor(userOptions: PointerOptions = {}) {
    this._options = {
      ...pointerDefaultOptions,
      ...userOptions,
    };

    this._mousePosition = { x: -1, y: -1 };

    this._element = document.createElement("div");

    Object.entries(this._options.defaultStyles).forEach(([key, value]) => {
      // @ts-ignore
      this._element.style[key] = value;
    });

    this._shapes = {};

    this.addShape(stickyShapeFactory(this._element));
    this.addShape(expandedShapeFactory(this._element));
    this.addShape(hiddenShapeFactory(this._element));
    this.addShape(textShapeFactory(this._element));
  }

  addShape(shape: Shape): void {
    this._shapes[shape.name] = shape;
  }

  clearShape(): void {
    if (this._currentShape) {
      this.apply(this._currentShape.restore());
    }

    this._currentShape = undefined;
  }

  getShape(name: string): Shape | undefined {
    return this._shapes[name];
  }

  applyShape(shape: Shape, target: HTMLElement): void {
    if (this._currentShape) {
      this.apply(this._currentShape.restore());
    }

    this._currentShape = shape;

    const vars = shape.transform(target);
    this.apply(vars);
  }

  private _handleMouseMove = (event: MouseEvent): void => {
    const { pageX, pageY, clientX, clientY } = event;

    if (this._mousePosition.x < 0 && this._mousePosition.y < 0) {
      this.apply({ top: pageY, left: pageX });
    }

    this._mousePosition.x = pageX;
    this._mousePosition.y = pageY;

    if (!this._currentShape?.fixPosition) {
      this.apply({
        top: pageY,
        left: pageX,
        duration: this._options.pointerDuration,
      });
    }

    const newTarget = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.getAttribute(MODE_ATTRIBUTE_NAME));

    if (!newTarget) {
      this._targetElement = undefined;
      if (this._currentShape) {
        this.clearShape();
      }
      return;
    }

    if (this._targetElement === newTarget) return;
    this._targetElement = newTarget;

    const shapeName = newTarget.getAttribute(MODE_ATTRIBUTE_NAME) as string;
    const shape = this.getShape(shapeName);
    if (!shape) {
      console.warn(`The shape "${shapeName}" is not found.`);
      return;
    }

    this.applyShape(shape, newTarget as HTMLElement);
  };

  mount(to = document.body): void {
    window.addEventListener("mousemove", this._handleMouseMove);
    to.appendChild(this._element);
  }

  unmount(): void {
    window.removeEventListener("mousemove", this._handleMouseMove);
    this._element.remove();
  }

  apply(vars: gsap.TweenVars): void {
    gsap.to(this._element, {
      duration: 0,
      ease: Power2.easeInOut,
      ...vars,
    });
  }
}

export default KimochiiPointer;
