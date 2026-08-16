import { vec2 } from "gl-matrix";
import { WebGlUtilities } from "../utilities/WebGlUtilities.ts";
import {
    type IFramework, State,
    TextureFormat,
    TextureUsage,
    type ITextureView,
    type TextureViewDescriptor, TextureUtilities
} from "ris-framework-api";
import type {WebGlGraphicsDevice} from "../WebGlGraphicsDevice.ts";
import {ATexture2D} from "../../core/rendering/texture/texture.ts";

/**
 * The WebGL implementation of ITexture2D.
 */
export class WebGlTexture2D extends ATexture2D {

    private readonly _graphicsDevice: WebGlGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private _texture: WebGLTexture | null = null;

    /**
     * The constructor.
     * @param _framework The framework instance.
     * @param size
     * @param _data The texture data. It can be null, in which case an empty texture will be created.
     * @param textureUsage
     * @param textureFormat
     * @param useMipMaps
     * @param label
     */
    constructor(
        private readonly _framework: IFramework,
        size: vec2,
        private readonly _data: Uint8Array | HTMLImageElement | null,
        textureUsage: TextureUsage,
        textureFormat: TextureFormat,
        useMipMaps: boolean = false,
        label: string | null = null,
    ) {
        super(size[0], size[1], textureUsage, textureFormat,
            label, useMipMaps);

        this._graphicsDevice = this._framework.renderer.graphicsDevice as WebGlGraphicsDevice;
        this._gl = this._graphicsDevice.gl!;
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
        if (this._state == State.INITIALIZED) {
            throw new Error("Texture is already initialized.");
        }
        else if (this._state == State.DISPOSED) {
            throw new Error("Texture is already disposed.");
        }

        this._state = State.INITIALIZED;
        const data = this._data;
        this._texture = WebGlUtilities.texture.createTexture2D(
            this._gl,
            this.width, this.height,
            data,
            this.textureFormat,
            this._useMipMaps,
            this._anisotropy,
            this._label
        );

        let width = this.width;
        let height = this.height;
        this._mipLevels = this._useMipMaps ? TextureUtilities.mipLevels(width, height) : 1;
        this._size = 0;

        for(let i = 0; i < this.mipLevels; i++) {
            this._size += TextureUtilities.bytesPerPixel(this.textureFormat) * width * height;
            width /= 2;
            height /= 2;
        }

    }

    /** @inheritdoc */
    public createView(_descriptor?: TextureViewDescriptor): ITextureView {
        throw new Error("Method not implemented.");
    }


    /** @inheritdoc */
    public dispose(): void {

        if (this._state == State.DISPOSING || this._state == State.DISPOSED) {
            return;
        }

        this._gl.deleteTexture(this._texture);
        this._texture = null;
        this._state = State.DISPOSED;

        for(const listener of this._disposedListeners)
        {
            listener(this);
        }
    }

    private static _defaultFilled: WebGlTexture2D | null = null;

    /**
     * Creates a default 1x1 white texture if it doesn't already exist and returns it.
     * This can be used as a placeholder texture when a texture is expected but not available.
     * @param framework The framework instance.
     * @returns The default 1x1 white texture.
     */
    public static getOrCreateDefault(framework: IFramework): WebGlTexture2D {
        if (this._defaultFilled === null || this._defaultFilled.state === State.DISPOSED) {

            this._defaultFilled = new WebGlTexture2D(framework,
                vec2.fromValues(1,1),
                new Uint8Array([255, 255, 255, 255]), TextureUsage.TEXTURE_BINDING, TextureFormat.RGBA_8_UNORM, false, "DefaultFilledTexture");
            this._defaultFilled.initialize();
        }

        return this._defaultFilled;
    }

}