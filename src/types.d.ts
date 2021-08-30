export interface Pointer {
  get element(): HTMLElement;

  register(shape: Shape): void;

  unregister(shape: Shape): void;

  findRegisteredShape(name: string): Shape | undefined;

  attach(shape: Shape, target: HTMLElement): void;

  detach(): void;

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
