import { inject, injectable } from "tsyringe";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import type { IFramework } from "../../core/framework-interface";
import { TextureFormat, TextureUsage } from "../../common/texture-enums";
import { Color } from "../../core/math/color";
import { WebGLTexture2D } from "./webgl-texture-2d";
import { vec2 } from "gl-matrix";
import { GenericImageData } from "../../core/data/image-data";
import type { ITextureFactory } from "../../core/rendering/texture/texture-factory";
import type { ITexture2D } from "../../core/rendering/texture/texture";

@injectable()
export class WebGLTextureFactory implements ITextureFactory {

    /**
     * The constructor for the WebGLTextureFactory class.
     * @param _framework The framework instance.
     */
    constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {
    }

    /** @inheritdoc */
    public create(
        data: ArrayBufferView,
        width: number, height: number, channels: number,
        label: string | null | undefined = null,
        useMipMaps = false,
        textureUsage = TextureUsage.COPY_DST_TEXTURE_BINDING): ITexture2D {

        if (!data) {
            throw new Error("Data must not be null.");
        }
        if (width == 0 || height == 0) {
            throw new Error("width and height must be greater than 0.");
        }

        if (channels == 0) {
            throw new Error("channels must be greater than 0.");
        }

        const imageData = new GenericImageData(data, width, height, channels);

        const texture = new WebGLTexture2D(
            this._framework,
            vec2.fromValues(width, height),
            imageData,
            textureUsage,
            TextureFormat.BGRA_8_UNORM,
            useMipMaps,
            label
        );

        texture.initialize();
        return texture;
    }

    /** @inheritdoc */
    public createEmpty(
        width: number, height: number,
        color: Color | null = null,
        textureUsage = TextureUsage.COPY_DST_TEXTURE_BINDING,
        textureFormat = TextureFormat.UNDEFINED,
        label: string | null = null,
        useMipmap = false): ITexture2D {

        if (width == 0 || height == 0) {
            throw new Error("Width and height must be greater than 0.");
        }

        if (textureFormat == TextureFormat.UNDEFINED) {
            textureFormat = this._framework.renderer.preferredTextureFormat;
        }

        // Fast path: avoid generating & uploading a big CPU-side buffer when not needed.
        if (!color || color.equals(Color.black())) {
            const texture = new WebGLTexture2D(
                this._framework,
                vec2.fromValues(width, height),
                null,
                textureUsage,
                textureFormat,
                useMipmap ?? false,
                label ?? ""
            );

            texture.initialize();
            return texture;
        }

        // Fill CPU-side pixels (BGRA layout to match TextureFormat.BGRA_8_Unorm usage elsewhere).
        const byteSize = width * height * 4;
        const bytes = new Uint8Array(byteSize);

        for (let i = 0; i < byteSize; i += 4) {
            bytes[i + 0] = color.b * 255;
            bytes[i + 1] = color.g * 255;
            bytes[i + 2] = color.r * 255;
            bytes[i + 3] = color.a * 255;
        }

        return this.create(bytes, width, height, 4, label, useMipmap, textureUsage);
    }
}
