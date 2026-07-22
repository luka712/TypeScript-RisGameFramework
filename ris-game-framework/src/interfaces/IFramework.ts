import type {IGraphicsDevice} from "./rendering/IGraphicsDevice.ts";

/**
 * The framework interface.
 */
export interface IFramework {

  /**
   * The graphics device.
   */
  readonly graphicsDevice: IGraphicsDevice;

  /**
   * Called when the framework is rendered.
   */
  addOnRenderListener(event: () => void): void;

  /**
   * Called when the framework is rendered.
   */
  removeOnRenderListener(event: () => void): void;

  /**
   * Initializes the framework.
   */
  initialize(): void;
}
