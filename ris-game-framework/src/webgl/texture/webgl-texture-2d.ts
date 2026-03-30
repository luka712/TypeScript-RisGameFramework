import { TextureFormat, TextureUsage } from "../../common/texture-enums";
import type { IFramework } from "../../core/framework-interface";
import type { vec2 } from "gl-matrix";
import { asWebGLGraphicsDevice } from "../cast/cast";
import { State } from "../../common/state";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { IImageData } from "../../core/data/image-data";
import { ATexture2D } from "../../core/rendering/texture/texture";
import type { TextureViewDescriptor, ITextureView } from "../../core/rendering/texture/texture-view/texture-view";

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
     * @param _label The label.
     */
    constructor(
        private readonly _framework: IFramework,
        size: vec2,
        private readonly _data: IImageData | null,
        textureUsage: TextureUsage,
        textureFormat: TextureFormat,
        useMipMaps: boolean = false,
        label: string | null = null,
    ) {
        super(size[0], size[1], textureUsage, textureFormat,
            label, useMipMaps);

        this._gl = asWebGLGraphicsDevice(this._framework.renderer.graphicsDevice).gl!;
    }

    /**
     * Gets the underlying WebGL texture.
     * @returns The WebGL texture. 
     */
    public get glTexture(): WebGLTexture {
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
            this._useMipMaps,
            this._anisotropy,
            this._label
        );
    }

    /** @inheritdoc */
    public createView(descriptor?: TextureViewDescriptor): ITextureView {
        throw new Error("Method not implemented.");
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