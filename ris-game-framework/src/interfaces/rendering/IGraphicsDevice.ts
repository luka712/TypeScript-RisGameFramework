import type {IGraphicsDeviceFeatures} from "./IGraphicsDeviceFeatures.ts";

/**
 * The interface for a graphics device.
 */
export interface IGraphicsDevice {

  /**
   * The name of the graphics device.
   */
  readonly name: string;

  /**
   * The vendor of the graphics device.
   */
  readonly vendor: string;

  /**
   * The features of the graphics device.
   */
  readonly features: IGraphicsDeviceFeatures;
}
