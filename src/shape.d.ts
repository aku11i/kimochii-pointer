export type Shape = {
  name: string;

  fixPosition?: boolean;

  transform: (target: HTMLElement) => gsap.TweenVars;

  restore: () => gsap.TweenVars;
};
