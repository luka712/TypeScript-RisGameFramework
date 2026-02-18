import type { SamplerCompareFunction, SamplerMinFilter } from "../../common/sampler-enums";
import type { Color } from "../math/color";
import type { ITexture2D } from "./texture";
import { SamplerMagFilter } from '../../common/sampler-enums';
import type { TextureFormat } from "../../common/texture-enums";
import { TextureUsage } from '../../common/texture-enums';

/**
 * The texture factory interface. This is used to create textures for the renderer.
 */
export interface ITextureFactory {

    /**
     * Creates the texture from the given data.
     * @param data The texture data.
     * @param width The width of the texture.
     * @param height The height of the texture.
     * @param channels The number of channels in the texture data.
     * @param minFilter The min filter. By default, Linear.
     * @param magFilter The mag filter. By default, Linear.
     * @param label The label. By default, empty.
     * @param useMipMaps True to generate mipmaps for the texture, false otherwise. By default, it is false.
     * @param textureUsage The texture usage. By default, it is TextureUsage.CopyDst_TextureBinding.
     * @returns The created texture.
     */
    create(data: ArrayBufferView,
        width: number, height: number, channels: number,
        minFilter?: SamplerMinFilter,
        magFilter?: SamplerMagFilter,
        label?: string | null,
        useMipMaps?: boolean,
        textureUsage?: TextureUsage): ITexture2D;

    /**
     * Creates an empty texture with the specified parameters.
     * @param width The width of the texture.
     * @param height The height of the texture.
     * @param color The default color of the texture. If null, the texture will not be written to, thus saving on write operations. This is useful for render targets which don't need to be written into.
     * @param minFilter The min filter. By default, Linear.
     * @param magFilter The mag filter. By default, Linear.
     * @param textureUsage The texture usage. By default, TextureUsage.CopyDst_TextureBinding. This makes it possible to write to texture and use it as shader resource by default.
     * @param textureFormat The texture format. By default, Undefined.
     * @param compareFunction The compare function. By default, SamplerCompareFunction.Never.
     * @param label The label. By default, empty.
     * @param useMipmap Should mip maps be generated for a texture. By default, it is set to false.
     * @return The created texture.
     */
    createEmpty(
        width: number, height: number,
        color?: Color | null,
        minFilter?: SamplerMinFilter | null,
        magFilter?: SamplerMagFilter | null,
        textureUsage?: TextureUsage | null,
        textureFormat?: TextureFormat | null,
        compareFunction?: SamplerCompareFunction | null,
        label?: string | null,
        useMipmap?: boolean): ITexture2D;
}