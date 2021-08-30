export type TransformProps = {
  target: HTMLElement;
  apply: (vars: gsap.TweenVars) => void;
  getProperty: (key: keyof gsap.TweenVars) => gsap.TweenValue;
  lock: (key: keyof gsap.TweenVars, value: gsap.TweenValue) => void;
  unlock: (key: keyof gsap.TweenVars) => void;
  isLocked: (key: keyof gsap.TweenVars) => boolean;
};

export type RestoreProps = Omit<TransformProps, "target">;

export type ShapeConstructorProps = {
  pointer: HTMLElement;
};

export type Shape = {
  name: string;

  shouldFixPosition?: () => boolean;

  transform: (props: TransformProps) => void;

  restore: (props: RestoreProps) => void;
};
