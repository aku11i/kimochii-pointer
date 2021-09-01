import { Power2 } from "gsap";
import { Pointer, Shape } from "../types";

export type HiddenShapeOptions = {
  duration?: number;
  ease?: gsap.EaseFunction;
};

export const defaultHiddenShapeOptions: Required<HiddenShapeOptions> = {
  duration: 0.2,
  ease: Power2.easeOut,
};

export class HiddenShape implements Shape {
  readonly name: Shape["name"] = "hidden";

  private _pointer: Pointer;

  private _options: Required<HiddenShapeOptions>;

  private _backup: Required<Pick<gsap.TweenVars, "opacity">>;

  constructor(pointer: Pointer, options: HiddenShapeOptions = {}) {
    this._pointer = pointer;

    this._options = {
      ...defaultHiddenShapeOptions,
      ...options,
    };

    this._backup = {
      opacity: pointer.getProperty("opacity"),
    };
  }

  transform: Shape["transform"] = () => {
    this._pointer.apply({
      opacity: 0,
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
