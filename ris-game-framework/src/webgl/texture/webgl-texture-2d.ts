import { ATexture2D } from "../../core/texture/texture";
import { SamplerAddressMode, SamplerMagFilter, SamplerMinFilter, SamplerCompareFunction } from '../../common/sampler-enums';
import { TextureFormat, TextureUsage } from "../../common/texture-enums";
import type { IFramework } from "../../core/framework-interface";
import type { vec2 } from "gl-matrix";
import { asWebGLRenderer } from "../cast/cast";
import { State } from "../../common/state";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { IImageData } from "../../core/data/image-data";

export class WebGLTexture2D extends ATexture2D {

    private readonly _gl: WebGL2RenderingContext;
    private _texture: WebGLTexture | null = null;

    /**
     * The constructor.
     * @param _framework The framework instance.
     * @param _size The size of the texture.
     * @param _data The texture data. It can be null, in which case an empty texture will be created.
     * @param _usage The texture usage.
     * @param _format The texture format.
     * @param minFilter The min filter. By default, it is Linear.
     * @param magFilter The mag filter. By default, it is Linear.
     * @param addressModeU The address mode for u coordinate. By default, it is ClampToEdge.
     * @param addressModeV The address mode for v coordinate. By default, it is ClampToEdge.
     * @param addressModeW The address mode for w coordinate. By default, it is ClampToEdge.
     * @param _label The label.
     */
    constructor(
        private readonly _framework: IFramework,
        size: vec2,
        private readonly _data: IImageData | null,
        textureUsage: TextureUsage,
        textureFormat: TextureFormat,
        minFilter: SamplerMinFilter = SamplerMinFilter.Linear,
        magFIlter: SamplerMagFilter = SamplerMagFilter.Linear,
        addressModeU: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        addressModeV: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        addressModeW: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        samplerCompareFunction: SamplerCompareFunction = SamplerCompareFunction.Never,
        useMipMaps: boolean = false,
        label: string | null = null,
    ) {
        super(size[0], size[1], textureUsage, textureFormat,
            minFilter, magFIlter,
            addressModeU, addressModeV, addressModeW,
            samplerCompareFunction,
            label, useMipMaps);

        this._gl = asWebGLRenderer(this._framework.renderer).gl!;
    }

    /**
     * Gets the underlying WebGL texture.
     */
    public get texture(): WebGLTexture {
        return this._texture!;
    }

    /** @inheritdoc */
    public initialize(): void {
        if (this._state == State.Initialized) {
            throw new Error("Texture is already initialized.");
        }
        else if (this._state == State.Disposed) {
            throw new Error("Texture is already disposed.");
        }

        this._state = State.Initialized;
        const data = this._data?.data;
        this._texture = WebGLUtilities.texture.createTexture2D(
            this._gl,
            this.width, this.height,
            data,
            this._textureFormat,
            this._minFilter, this._magFilter,
            this._compareFunction,
            this._useMipMaps,
            this._anisotropy,
            this._label
        );
    }


    /** @inheritdoc */
    public dispose(): void {

        if (this._state == State.Disposing || this._state == State.Disposed) {
            return;
        }

        this._gl.deleteTexture(this._texture);
        this._texture = null;
        this._state = State.Disposed;
    }

}