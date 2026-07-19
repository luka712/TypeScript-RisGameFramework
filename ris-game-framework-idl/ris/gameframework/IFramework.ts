import {IGraphicsDevice} from "../../src";

/**
 * The framework interface.
 */
export interface IFramework {
  /**
   * The graphics device.
   */
  readonly graphicsDevice: IGraphicsDevice;
  /**
   * Initializes the framework.
   */
  initialize(): void;
}
