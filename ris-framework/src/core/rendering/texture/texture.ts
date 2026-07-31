import {type ITexture2D, State, type TextureFormat, type TextureUsage, TextureViewDescriptor} from "ris-framework-api";
import type {ITextureView} from "../../../../../ris-framework-api/dist/ris-framework/rendering/texture/ITextureView";


/**
 * The ATexture2D class is an abstract base class that implements the ITexture2D interface. It provides common properties and a constructor for initializing a 2D texture, but it does not implement the actual texture creation and management logic, which must be provided by subclasses that extend this base class.
 */
export abstract class ATexture2D implements ITexture2D {

    private static _nextId: number = 1;

    protected _handle: any;
    protected _state: State = State.CREATED;

    /**
     * The constructor for the ATexture2D class.
     * @param _width The width of the texture.
     * @param _height The height of the texture.
     * @param textureUsage The texture usage.
     * @param textureFormat The texture format.
     * @param label The label for the texture. This can be used for debugging purposes to identify the texture in graphics debuggers.
     * @param useMipMaps This determines whether mipmaps should be generated for the texture. Mipmaps are smaller versions of the texture that are used when the texture is minified to improve performance and reduce aliasing.
     * @param anisotropy This determines the level of anisotropic filtering to use when sampling the texture. Anisotropic filtering improves the quality of texture sampling at oblique viewing angles, but it can also reduce performance. A value of 1 means no anisotropic filtering, while higher values (e.g., 4, 8, 16) indicate increasing levels of anisotropic filtering.
     */
    constructor(
        protected readonly _width: number,
        protected readonly _height: number,
        textureUsage: TextureUsage,
        textureFormat: TextureFormat,
        protected readonly _label: string | null = null,
        protected readonly _useMipMaps: boolean = false,
        protected readonly _anisotropy: number = 1
    ) {
        this.id = ATexture2D.generateId();

        // @ts-ignore
        this.defaultTextureView = null;

        this.textureUsage = textureUsage;
        this.textureFormat = textureFormat;
        this.textureViewFormat = textureFormat;
    }

    /** @inheritDoc */
    public readonly id: number;

    /** @inheritDoc */
    public readonly defaultTextureView: ITextureView;

    /** @inheritDoc */
    public readonly textureUsage: TextureUsage;

    /** @inheritDoc */
    public readonly textureViewFormat: TextureFormat;

    /** @inheritDoc */
    public readonly textureFormat: TextureFormat;

    /** @inheritDoc */
    public get handle(): any {
        return this._handle;
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
    public get label(): string {
        return this._label as string;
    }

    /**
     * Creates a texture view for the texture.
     * @param descriptor The descriptor for the texture view. 
     * @returns The created texture view, which can be used for sampling the texture in shaders.
     */
    public abstract createView(descriptor?: TextureViewDescriptor): ITextureView;

    /** @inheritDoc */
    public abstract dispose(): void;
}
