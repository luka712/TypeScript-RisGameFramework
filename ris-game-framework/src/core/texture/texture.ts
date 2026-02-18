import type { IDisposable } from "../../common/disposable";
import { TextureUsage, TextureFormat } from "../../common/texture-enums";
import { SamplerMinFilter, SamplerMagFilter, SamplerAddressMode, SamplerCompareFunction } from "../../common/sampler-enums";
import { State } from "../../common/state";

/**
 * This file defines the Texture2D interface, which represents a 2D texture in the rendering system.
 * A texture is an image or data that can be sampled in shaders to apply effects to rendered objects. 
 * The Texture2D interface may include properties and methods for managing the texture, such as its dimensions, format, and methods for binding and unbinding it for rendering.
 * This interface is essential for implementing features like texture mapping, where textures are applied to 3D models to give them color and detail, as well as for render-to-texture techniques used in post-processing effects.
 */
export interface ITexture2D extends IDisposable {

    /**
     * The width of the texture in pixels.
     */
    get width(): number;

    /**
     * The height of the texture in pixels.
     */
    get height(): number;

    /**
     * The label for the texture.
     */
    get label(): string | null;

    /**
     * The current state of the texture. This property is used to track the lifecycle of the texture and ensure that it is properly initialized and disposed of. The state can be one of the following:
     * - Created: The texture has been created but not yet initialized.
     * - Initialized: The texture has been initialized and is ready for use.
     * - Disposing: The texture is in the process of being disposed of.
     * - Disposed: The texture has been disposed of and should not be used anymore.
     */
    get state(): State;

}

/**
 * The ATexture2D class is an abstract base class that implements the ITexture2D interface. It provides common properties and a constructor for initializing a 2D texture, but it does not implement the actual texture creation and management logic, which must be provided by subclasses that extend this base class.
 */
export abstract class ATexture2D implements ITexture2D {

    private static _nextId: number = 1;

    protected readonly _id: number;
    protected _state: State = State.Created;

    /**
     * The constructor for the ATexture2D class.
     * @param _width The width of the texture.
     * @param _height The height of the texture.
     * @param _textureUsage The texture usage.
     * @param _textureFormat The texture format.
     * @param minFilter The min filter to use when sampling the texture. This determines how the texture is sampled when it is minified (i.e., when it is smaller than its original size).
     * @param magFilter The mag filter to use when sampling the texture. This determines how the texture is sampled when it is magnified (i.e., when it is larger than its original size).
     * @param addressModeU The address mode for the u coordinate. This determines how texture coordinates outside the [0, 1] range are handled in the u direction.
     * @param addressModeV The address mode for the v coordinate. This determines how texture coordinates outside the [0, 1] range are handled in the v direction.
     * @param addressModeW The address mode for the w coordinate. This determines how texture coordinates outside the [0, 1] range are handled in the w direction.
     * @param compareFunction The compare function to use when sampling the texture. This is used for depth textures and determines how the sampled depth value is compared to the reference value.
     * @param label The label for the texture. This can be used for debugging purposes to identify the texture in graphics debuggers.
     * @param useMipMaps This determines whether mipmaps should be generated for the texture. Mipmaps are smaller versions of the texture that are used when the texture is minified to improve performance and reduce aliasing.
     * @param anisotropy This determines the level of anisotropic filtering to use when sampling the texture. Anisotropic filtering improves the quality of texture sampling at oblique viewing angles, but it can also reduce performance. A value of 1 means no anisotropic filtering, while higher values (e.g., 4, 8, 16) indicate increasing levels of anisotropic filtering.
     */
    constructor(
        protected readonly _width: number,
        protected readonly _height: number,
        protected readonly _textureUsage: TextureUsage,
        protected readonly _textureFormat: TextureFormat,
        protected readonly _minFilter: SamplerMinFilter = SamplerMinFilter.Linear,
        protected readonly _magFilter: SamplerMagFilter = SamplerMagFilter.Linear,
        protected readonly _addressModeU: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        protected readonly _addressModeV: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        protected readonly _addressModeW: SamplerAddressMode = SamplerAddressMode.ClampToEdge,
        protected readonly _compareFunction: SamplerCompareFunction = SamplerCompareFunction.Never,
        protected readonly _label: string | null = null,
        protected readonly _useMipMaps: boolean = false,
        protected readonly _anisotropy: number = 1
    ) {
        this._id = ATexture2D.generateId();
    }

    /**
     * Generates a unique ID for each texture instance.
     * @returns A unique ID for the texture instance.
     */
    private static generateId(): number {
        return ATexture2D._nextId++;
    }

    /**
     * Initializes the texture.
     */
    abstract initialize(): void;

    /** @inheritdoc */
    public get state(): State {
        return this._state;
    }


    /** @inheritdoc */
    public get width(): number {
        return this._width;
    }

    /** @inheritdoc */
    public get height(): number {
        return this._height;
    }

    /** @inheritdoc */
    public get label(): string | null {
        return this._label;
    }

    dispose(): void {
        // TODO: Implement disposal logic for texture resources
    }

}
