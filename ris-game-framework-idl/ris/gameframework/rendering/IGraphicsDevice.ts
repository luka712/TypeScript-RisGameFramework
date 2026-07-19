import {IGraphicsDeviceFeatures} from "../../../src";

/**
 * The interface for a graphics device.
 */
export interface IGraphicsDevice {
  /**
   * The features of the graphics device.
   */
  readonly features: IGraphicsDeviceFeatures;
}
