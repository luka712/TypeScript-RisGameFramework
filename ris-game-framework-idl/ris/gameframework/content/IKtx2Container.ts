/**
 * The interface for the KTX2 container.
 */
export interface IKtx2Container {
  /**
   * The texture format or Vulkan format.
   */
  readonly textureFormat: TextureFormat;

  /**
   * The base width of the texture.
   */
  readonly baseWidth: number;

  /**
   * The base height of the texture.
   */
  readonly baseHeight: number;

  /**
   * The number of mipmap levels.
   */
  readonly numLevels: number;
}
