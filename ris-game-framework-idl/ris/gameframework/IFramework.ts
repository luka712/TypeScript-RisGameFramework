/**
 * The framework interface.
 */
export interface IFramework {
  /**
   * The renderer used by the framework.
   */
  readonly renderer: IRenderer;
  /**
   * Called when the framework is rendered.
   */
  addOnRenderListener(event: () => void): void;
  /**
   * Called when the framework is rendered.
   */
  removeOnRenderListener(event: () => void): void;  /**
   * Initializes the framework.
   */
  initialize(): void;
}
