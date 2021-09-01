import gsap, { Power2 } from "gsap";
import { Pointer, Shape } from "../types";

export type TextShapeOptions = {
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultTextShapeOptions: Required<TextShapeOptions> = {
  duration: 0.1,
  opacity: 0.6,
  ease: Power2.easeOut,
};

export class TextShape implements Shape {
  readonly name: Shape["name"] = "text";

  private _pointer: Pointer;

  private _options: Required<TextShapeOptions>;

  private _backup: Required<
    Pick<gsap.TweenVars, "width" | "height" | "opacity" | "borderRadius">
  >;

  constructor(pointer: Pointer, options: TextShapeOptions = {}) {
    this._pointer = pointer;

    this._options = {
      ...defaultTextShapeOptions,
      ...options,
    };

    this._backup = {
      width: pointer.getProperty("width"),
      height: pointer.getProperty("height"),
      opacity: pointer.getProperty("opacity"),
      borderRadius: pointer.getProperty("borderRadius"),
    };
  }

  transform: Shape["transform"] = (target) => {
    const targetFontSize = gsap.getProperty(target, "fontSize") as number;
    const height = targetFontSize * 1.2;
    const width = 5 + targetFontSize * 0.05;

    this._pointer.apply({
      width,
      height,
      borderRadius: `${width / 2}px`,
      opacity: this._options.opacity,
      duration: this._options.duration,
      ease: this._options.ease,
    });
  };

  restore: Shape["restore"] = () => {
    this._pointer.apply({
      ...this._backup,
      duration: this._options.duration,
      ease: this._options.ease,
      overwrite: true,
    });
  };
}
