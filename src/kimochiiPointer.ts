import { gsap, Power2 } from "gsap";
import { Shape } from "./shape";
import {
  expandedShapeFactory,
  hiddenShapeFactory,
  lighterShapeFactory,
  stickyShapeFactory,
  textShapeFactory,
} from "./shapes";

export const ATTRIBUTE_NAME = "data-kimochii-pointer";

export const defaultStyles: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: "100000",
  pointerEvents: "none",

  opacity: "0.5",
  backgroundColor: "gray",
  borderRadius: "50%",

  top: "-20px",
  left: "-20px",
  width: "20px",
  height: "20px",
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

  private _lockedProperties: Map<keyof gsap.TweenVars, gsap.TweenValue>;

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
    this._lockedProperties = new Map();

    this._element = document.createElement("div");

    Object.entries(this._options.defaultStyles).forEach(([key, value]) => {
      // @ts-ignore
      this._element.style[key] = value;
    });

    this._shapes = {};

    this.addShape(expandedShapeFactory(this));
    this.addShape(stickyShapeFactory(this));
    this.addShape(textShapeFactory(this));
    this.addShape(hiddenShapeFactory(this));
    this.addShape(lighterShapeFactory(this));
  }

  addShape(shape: Shape): void {
    this._shapes[shape.name] = shape;
  }

  clearShape(): void {
    if (this._currentShape) {
      this._currentShape.restore();
    }

    this._currentShape = undefined;
  }

  getShape(name: string): Shape | undefined {
    return this._shapes[name];
  }

  applyShape(shape: Shape, target: HTMLElement): void {
    if (this._currentShape) {
      this._currentShape.restore();
    }

    this._currentShape = shape;

    shape.transform(target);
  }

  private _handleMouseMove = (event: MouseEvent): void => {
    const { pageX, pageY, clientX, clientY } = event;

    if (this._mousePosition.x < 0 && this._mousePosition.y < 0) {
      this.apply({ top: pageY, left: pageX });
    }

    this._mousePosition.x = pageX;
    this._mousePosition.y = pageY;

    const newTarget = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.getAttribute(ATTRIBUTE_NAME));

    if (!newTarget) {
      this._targetElement = undefined;
      if (this._currentShape) {
        this.clearShape();
      }
    } else if (newTarget !== this._targetElement) {
      this._targetElement = newTarget;

      const shapeName = newTarget.getAttribute(ATTRIBUTE_NAME) as string;
      const shape = this.getShape(shapeName);
      if (shape) {
        this.applyShape(shape, newTarget as HTMLElement);
      } else {
        console.warn(`The shape "${shapeName}" is not added.`);
      }
    }

    if (this._currentShape?.shouldFixPosition?.()) return;

    this.apply({
      top: pageY,
      left: pageX,
      duration: this._options.pointerDuration,
      ease: Power2.easeOut,
    });
  };

  private _handleMouseDown = () => {
    this.apply({ opacity: this._options.clickedOpacity, duration: 0.2 });
    this.lock("opacity", this._options.clickedOpacity);
  };

  private _handleMouseUp = () => {
    this.unlock("opacity");
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
    const vars = Object.fromEntries([
      ...Object.entries(_vars),
      ...this._lockedProperties.entries(),
    ]);

    if (vars.duration) {
      gsap.to(this._element, vars);
    } else {
      gsap.set(this._element, vars);
    }
  }

  getProperty(key: keyof gsap.TweenVars): gsap.TweenValue {
    return gsap.getProperty(this._element, key as string);
  }

  lock(key: keyof gsap.TweenVars, value: gsap.TweenValue): void {
    this._lockedProperties.set(key, value);
  }

  unlock(key: keyof gsap.TweenVars): void {
    this._lockedProperties.delete(key);
  }

  isLocked(key: keyof gsap.TweenVars): boolean {
    return this._lockedProperties.has(key);
  }
}

export default KimochiiPointer;
