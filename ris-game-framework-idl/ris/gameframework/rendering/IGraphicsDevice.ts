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

  /**
   * The geometry builder.
   */
  readonly geometryBuilder: IGeometryBuilder;
}
