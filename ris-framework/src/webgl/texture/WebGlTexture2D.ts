import type { TempIFramework } from "../../core/framework-interface";
import type { vec2 } from "gl-matrix";
import { asWebGLGraphicsDevice } from '../cast/cast';
import { WebGlUtilities } from "../utilities/WebGlUtilities.ts";
import { GenericImageData, type IImageData } from "../../core/data/image-data";
import { ATexture2D } from "../../core/rendering/texture/texture";
import type { TextureViewDescriptor, ITextureView } from "../../core/rendering/texture/texture-view/texture-view";
import {State, TextureUsage} from "ris-framework-api";
import {TextureFormat} from "../../TextureFormat.ts";

export class WebGlTexture2D extends ATexture2D {


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
        private readonly _framework: TempIFramework,
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
        if (this._state == State.INITIALIZED) {
            throw new Error("Texture is already initialized.");
        }
        else if (this._state == State.DISPOSED) {
            throw new Error("Texture is already disposed.");
        }

        this._state = State.INITIALIZED;
        const data = this._data?.data;
        this._texture = WebGlUtilities.texture.createTexture2D(
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
    }

    private static _defaultFilled: WebGlTexture2D | null = null;

    /**
     * Creates a default 1x1 white texture if it doesn't already exist and returns it.
     * This can be used as a placeholder texture when a texture is expected but not available.
     * @param framework The framework instance.
     * @returns The default 1x1 white texture.
     */
    public static getOrCreateDefault(framework: TempIFramework): WebGlTexture2D {
        if (this._defaultFilled === null || this._defaultFilled.state === State.DISPOSED) {
            
            const imageData = new GenericImageData(new Uint8Array([255, 255, 255, 255]), 1, 1, 4);
                        
            this._defaultFilled = new WebGlTexture2D(framework, [1, 1], imageData, TextureUsage.TEXTUREBINDING, TextureFormat.RGBA_8_UNORM, false, "DefaultFilledTexture");
            this._defaultFilled.initialize();
        }

        return this._defaultFilled;
    }

}