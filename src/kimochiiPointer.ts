import { gsap } from "gsap";
import { Shape } from "./shape";

import {
  stickyShapeFactory,
  expandedShapeFactory,
  hiddenShapeFactory,
  textShapeFactory,
  lighterShapeFactory,
} from "./shapes";

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
  clickedOpacity?: number;
};

export const pointerDefaultOptions: Required<PointerOptions> = {
  defaultStyles,
  pointerDuration: 0.06,
  clickedOpacity: 0.7,
} as const;

export type MousePosition = {
  x: number;
  y: number;
};

export class KimochiiPointer {
  private readonly _options: Required<PointerOptions>;

  private readonly _mousePosition: MousePosition;
  private _isClicking: boolean;

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
    this._isClicking = false;

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
    this.addShape(lighterShapeFactory(this._element));
  }

  addShape(shape: Shape): void {
    this._shapes[shape.name] = shape;
  }

  clearShape(): void {
    if (this._currentShape) {
      this._currentShape.restore({
        apply: this.apply.bind(this),
      });
    }

    this._currentShape = undefined;
  }

  getShape(name: string): Shape | undefined {
    return this._shapes[name];
  }

  applyShape(shape: Shape, target: HTMLElement): void {
    if (this._currentShape) {
      this._currentShape.restore({
        apply: this.apply.bind(this),
      });
    }

    this._currentShape = shape;

    shape.transform({
      apply: this.apply.bind(this),
      target,
    });
  }

  private _handleMouseMove = (event: MouseEvent): void => {
    const { pageX, pageY, clientX, clientY } = event;

    if (this._mousePosition.x < 0 && this._mousePosition.y < 0) {
      this.apply({ top: pageY, left: pageX });
    }

    this._mousePosition.x = pageX;
    this._mousePosition.y = pageY;

    if (!this._currentShape?.shouldFixPosition?.()) {
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

  private _handleMouseDown = () => {
    this._isClicking = true;
    this.apply({ opacity: this._options.clickedOpacity, duration: 0.2 });
  };

  private _handleMouseUp = () => {
    this._isClicking = false;
    this.apply({ opacity: this._options.defaultStyles.opacity, duration: 0.2 });
  };

  mount(to = document.body): void {
    window.addEventListener("mousemove", this._handleMouseMove);
    window.addEventListener("mousedown", this._handleMouseDown);
    window.addEventListener("mouseup", this._handleMouseUp);
    to.appendChild(this._element);
  }

  unmount(): void {
    window.removeEventListener("mousemove", this._handleMouseMove);
    window.removeEventListener("mousedown", this._handleMouseDown);
    window.removeEventListener("mouseup", this._handleMouseUp);
    this._element.remove();
  }

  apply(_vars: gsap.TweenVars): void {
    const vars: gsap.TweenVars = {
      ..._vars,

      ...(this._isClicking ? { opacity: this._options.clickedOpacity } : {}),
    };

    if (vars.duration) {
      gsap.to(this._element, vars);
    } else {
      gsap.set(this._element, vars);
    }
  }
}

export default KimochiiPointer;
