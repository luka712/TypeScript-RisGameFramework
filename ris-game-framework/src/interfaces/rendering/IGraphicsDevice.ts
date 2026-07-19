import type {IGraphicsDeviceFeatures} from "./IGraphicsDeviceFeatures.ts";

/**
 * The interface for a graphics device.
 */
export interface IGraphicsDevice {
  /**
   * The features of the graphics device.
   */
  readonly features: IGraphicsDeviceFeatures;
}
