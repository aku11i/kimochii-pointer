export type Shape = {
  name: string;
  cancelPointerMove?: boolean;
  transform: (target: HTMLElement) => gsap.TweenVars;
  restore: () => gsap.TweenVars;
};
