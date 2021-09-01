import { Pointer, Shape } from "../types";
import { Power2 } from "gsap";

export type ExpandedShapeOptions = {
  scale?: number;
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultExpandedShapeOptions: Required<ExpandedShapeOptions> = {
  scale: 2.5,
  duration: 0.13,
  opacity: 0.4,
  ease: Power2.easeOut,
};

export class ExpandedShape implements Shape {
  readonly name: Shape["name"] = "expanded";

  private _pointer: Pointer;

  private _options: Required<ExpandedShapeOptions>;

  private _backup: Required<
    Pick<gsap.TweenVars, "width" | "height" | "opacity">
  >;

  constructor(pointer: Pointer, options: ExpandedShapeOptions = {}) {
    this._pointer = pointer;

    this._options = {
      ...defaultExpandedShapeOptions,
      ...options,
    };

    this._backup = {
      width: pointer.getProperty("width"),
      height: pointer.getProperty("height"),
      opacity: pointer.getProperty("opacity"),
    };
  }

  transform: Shape["transform"] = () => {
    this._pointer.apply({
      width: (this._backup.width as number) * this._options.scale,
      height: (this._backup.height as number) * this._options.scale,
      opacity: this._options.opacity,
      ease: this._options.ease,
      duration: this._options.duration,
    });
  };

  restore: Shape["restore"] = () => {
    this._pointer.apply({
      ...this._backup,
      duration: this._options.duration,
      overwrite: true,
      ease: this._options.ease,
    });
  };
}
