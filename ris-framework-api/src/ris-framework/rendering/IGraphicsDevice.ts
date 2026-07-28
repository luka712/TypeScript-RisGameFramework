import {IGraphicsDeviceFeatures} from "./IGraphicsDeviceFeatures";

/**
 * The interface for a graphics device.
 */
export interface IGraphicsDevice {

/**
 * The vendor of the graphics device.
 */
  readonly vendor: string;

/**
 * The name of the graphics device.
 */
  readonly name: string;

/**
 * The features of the graphics device.
 */
  readonly features: IGraphicsDeviceFeatures;

}
