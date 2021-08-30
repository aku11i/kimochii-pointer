export type TransformProps = {
  target: HTMLElement;
  apply: (vars: gsap.TweenVars) => void;
};

export type RestoreProps = {
  apply: (vars: gsap.TweenVars) => void;
};

export type ShapeConstructorProps = {
  pointer: HTMLElement;
};

export type Shape = {
  name: string;

  shouldFixPosition?: () => boolean;

  transform: (props: TransformProps) => void;

  restore: (props: RestoreProps) => void;
};
