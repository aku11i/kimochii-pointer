import { Pointer, Shape } from "../types";
import { Power2 } from "gsap";

export type StickyShapeOptions = {
  duration?: number;
  padding?: number;
  opacity?: number;
  radius?: number;
  ease?: gsap.EaseFunction;
};

export const defaultStickyShapeOptions: Required<StickyShapeOptions> = {
  duration: 0.15,
  padding: 0,
  opacity: 0.3,
  radius: 0.1,
  ease: Power2.easeOut,
};

export class StickyShape implements Shape {
  readonly name: Shape["name"] = "sticky";

  private _pointer: Pointer;

  private _options: Required<StickyShapeOptions>;

  private _backup: Required<
    Pick<gsap.TweenVars, "width" | "height" | "opacity" | "borderRadius">
  >;

  constructor(pointer: Pointer, options: StickyShapeOptions = {}) {
    this._pointer = pointer;

    this._options = {
      ...defaultStickyShapeOptions,
      ...options,
    };

    this._backup = {
      width: pointer.getProperty("width"),
      height: pointer.getProperty("height"),
      opacity: pointer.getProperty("opacity"),
      borderRadius: pointer.getProperty("borderRadius"),
    };
  }

  shouldFixPosition: Shape["shouldFixPosition"] = () => true;

  transform: Shape["transform"] = (target) => {
    const rect = target.getBoundingClientRect();
    const { top, left } = rect;
    const width = rect.width + this._options.padding;
    const height = rect.height + this._options.padding;

    this._pointer.apply({
      top: top + height / 2,
      left: left + width / 2,
      width,
      height,
      opacity: this._options.opacity,
      borderRadius: `${Math.min(width, height) * this._options.radius}px`,
      duration: this._options.duration,
      ease: this._options.ease,
      overwrite: true,
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
