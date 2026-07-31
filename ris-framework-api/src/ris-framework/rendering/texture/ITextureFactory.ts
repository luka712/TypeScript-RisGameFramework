import {Color} from "../../data/Color";
import {TextureUsage} from "./TextureUsage";
import {TextureFormat} from "./TextureFormat";
import {ITexture2D} from "./ITexture2D";

/**
 * The texture factory.
 */
export interface ITextureFactory {

  /**
   * Creates empty texture.
   * @param width The texture width.
   * @param height The texture height.
   * @param defaultColor The optional color.
   * @param textureUsage Texture usage.
   * @param textureFormat Texture format.
   * @param label The label.
   */
  createEmpty(
      width: number, height: number,
      defaultColor?: Color,
      textureUsage?: TextureUsage,
      textureFormat?: TextureFormat,
      label?: string): ITexture2D;
}
