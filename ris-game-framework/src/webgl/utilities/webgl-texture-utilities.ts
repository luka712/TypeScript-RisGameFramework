import { TextureFormat } from "../../common/texture-enums";
import { WebGLConverter } from "./webgl-converter";

/**
 * The utilities for working with WebGL textures.
 */
export class WebGLTextureUtilities {

    /**
     * Creates a 2D texture.
     * @param gl The WebGL rendering context.
     * @param width The width of the texture.
     * @param height The height of the texture.
     * @param data The texture data. If null, an uninitialized texture will be created.
     * @param textureFormat The format of the texture. If not specified, BGRA_8_Unorm will be used.
     * @param useMipMaps True to generate mipmaps for the texture, false otherwise. By default, it is false.
     * @param anisotropy The level of anisotropic filtering to use when sampling the texture. A value of 1 means no anisotropic filtering, while higher values (e.g., 4, 8, 16) indicate increasing levels of anisotropic filtering. By default, it is 1 (no anisotropic filtering).
     * @param label The label for the texture. This can be used for debugging purposes to identify the texture in graphics debuggers.
     * @returns The created WebGL texture.
     */
    public createTexture2D(
        gl: WebGL2RenderingContext,
        width: number, height: number,
        data: ArrayBufferView<ArrayBufferLike> | null = null,
        textureFormat = TextureFormat.BGRA_8_UNORM,
        useMipMaps = false,
        anisotropy = 1.0,
        label: string | null = null
    ): WebGLTexture {

        const texture = gl.createTexture();

        if (label != null) {
            (texture as any).__SPECTOR_Metadata = {
                name: label,
            };
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);

        const internalFormat = WebGLConverter.convertInternalFormat(gl, textureFormat);
        const format = WebGLConverter.convertToPixelFormat(gl, textureFormat);
        const textureType = WebGLConverter.convertToTextureType(gl, textureFormat);


        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, textureType, data);


        // Generate mipmaps.
        if (useMipMaps) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        // Set anisotropy.
        if (anisotropy > 1.0) {
            throw new Error("Not implemented yet.");
            //OpenGLESUtilities.Anisotropy.SetAnisotropy(gl, texture, anisotropy);
        }

        return texture;
    }
}
