export interface Pointer {
  /**
   * HTML element of the pointer.
   */
  get element(): HTMLElement;

  /**
   * Register the shape to the pointer.
   *
   * Registered shapes can be used in custom attribute of HTML.
   *
   * e.g.
   * ```html
   * <button data-kimochii-pointer="sticky">STICKY BUTTON</button>
   * ```
   */
  register(shape: Shape): void;

  /**
   * Unregister the shape from the pointer.
   *
   * The shape can not be used in custom attribute of HTML.
   */
  unregister(shape: Shape): void;

  /**
   * Find a shape from them that is registered.
   */
  findRegisteredShape(name: string): Shape | undefined;

  getAllRegisteredShapes(): Shape[];

  /**
   * Attach shape to the pointer.
   * @param target An element that is under the cursor.
   */
  attach(shape: Shape, target: HTMLElement): void;

  /**
   * Detach shape from the pointer.
   */
  detach(): void;

  /**
   * The pointer will be shown to display by mounting to DOM.
   * @param to Default: `document.body`
   */
  mount(to?: HTMLElement): void;

  /**
   * The pointer will be hidden from display by delete from DOM.
   * It's able to remount by calling `mount` again.
   */
  unmount(): void;

  /**
   * Apply the styles to the pointer.
   */
  apply(_vars: gsap.TweenVars): void;

  /**
   * Get the property of the pointer.
   */
  getProperty(key: keyof gsap.TweenVars): gsap.TweenValue;

  /**
   * Lock the style property of the pointer.
   * Until `unlock` is called, locked property will never be changed.
   */
  lock(key: keyof gsap.TweenVars, value: gsap.TweenValue): void;

  /**
   * Unlock the style property of the pointer.
   */
  unlock(key: keyof gsap.TweenVars): void;

  /**
   * Whether the property is locked.
   */
  isLocked(key: keyof gsap.TweenVars): boolean;
}

export type Shape = {
  /**
   * Used to check that custom attribute name of HTML element is matched to.
   *
   * e.g.
   * ```html
   * <button data-kimochii-pointer="{name}"></button>
   * ```
   */
  name: string;

  /**
   * If `true` is returned, the pointer will not move by mouse event.
   */
  shouldFixPosition?: () => boolean;

  /**
   * It's called when the shape will be attached to the pointer.
   */
  transform: (target: HTMLElement) => void;

  /**
   * It's called when the shape will be detached to the pointer.
   */
  restore: () => void;
};

/**
 * A utility function to create shape.
 */
export type ShapeFactory<T extends Record<string, unknown>> = (
  pointer: Pointer,
  options?: T
) => Shape;
