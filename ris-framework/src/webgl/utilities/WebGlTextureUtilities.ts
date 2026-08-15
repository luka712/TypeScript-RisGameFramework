import {WebGlConverter} from "./WebGlConverter.ts";
import {TextureFormat} from "ris-framework-api";

/**
 * The utilities for working with WebGL textures.
 */
export class WebGlTextureUtilities {

    /**
     * Creates a 2D texture.
     * @param gl The WebGL rendering context.
     * @param width The width of the texture.
     * @param height The height of the texture.
     * @param data The texture data. If null, an uninitialized texture will be created.
     * @param textureFormat The format of the texture. If not specified, BGRA_8_UNORM will be used.
     * @param useMipMaps True to generate mipmaps for the texture, false otherwise. By default, it is false.
     * @param anisotropy The level of anisotropic filtering to use when sampling the texture. A value of 1 means no anisotropic filtering, while higher values (e.g., 4, 8, 16) indicate increasing levels of anisotropic filtering. By default, it is 1 (no anisotropic filtering).
     * @param label The label for the texture. This can be used for debugging purposes to identify the texture in graphics debuggers.
     * @returns The created WebGL texture.
     */
    public createTexture2D(
        gl: WebGL2RenderingContext,
        width: number, height: number,
        data: Uint8Array | HTMLImageElement | null = null,
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

        const internalFormat = WebGlConverter.convertInternalFormat(gl, textureFormat);
        const format = WebGlConverter.convertToPixelFormat(gl, textureFormat);

        let mipLevels = 1;
        if (useMipMaps) {
            mipLevels = Math.floor(Math.log2(Math.max(width, height))) + 1;
        }

        gl.texStorage2D(gl.TEXTURE_2D, mipLevels, internalFormat, width, height);

        if (data instanceof HTMLImageElement) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, format, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof Uint8Array) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, format, gl.UNSIGNED_BYTE, data);
        } else if (!data) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, format, gl.UNSIGNED_BYTE, data);
        } else {
            throw new Error("unsupported data type");
        }

        // Generate mipmaps.
        if (mipLevels > 1) {
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
