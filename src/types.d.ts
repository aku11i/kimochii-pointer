export interface Pointer {
  get element(): HTMLElement;

  addShape(shape: Shape): void;

  clearShape(): void;

  getShape(name: string): Shape | undefined;

  applyShape(shape: Shape, target: HTMLElement): void;

  mount(to?: HTMLElement): void;

  unmount(): void;

  apply(_vars: gsap.TweenVars): void;

  getProperty(key: keyof gsap.TweenVars): gsap.TweenValue;

  lock(key: keyof gsap.TweenVars, value: gsap.TweenValue): void;

  unlock(key: keyof gsap.TweenVars): void;

  isLocked(key: keyof gsap.TweenVars): boolean;
}

export type Shape = {
  name: string;

  shouldFixPosition?: () => boolean;

  transform: (target: HTMLElement) => void;

  restore: () => void;
};

export type ShapeFactory<T extends Record<string, unknown>> = (
  pointer: Pointer,
  options?: T
) => Shape;
