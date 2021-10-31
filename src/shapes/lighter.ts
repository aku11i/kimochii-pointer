import { Power2 } from "gsap";
import { Pointer, Shape } from "../types";

export type LighterShapeOptions = {
  duration?: number;
  opacity?: number;
  ease?: gsap.EaseFunction;
};

export const defaultLighterShapeOptions: Required<LighterShapeOptions> = {
  duration: 0.2,
  opacity: 0.3,
  ease: Power2.easeOut,
};

export class LighterShape implements Shape {
  readonly name: Shape["name"] = "lighter";

  private _pointer: Pointer;

  private _options: Required<LighterShapeOptions>;

  private _backup: Required<Pick<gsap.TweenVars, "opacity">>;

  constructor(pointer: Pointer, options: LighterShapeOptions = {}) {
    this._pointer = pointer;

    this._options = {
      ...defaultLighterShapeOptions,
      ...options,
    };

    this._backup = {
      opacity: pointer.getProperty("opacity"),
    };
  }

  transform: Shape["transform"] = () => {
    this._pointer.apply({
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
