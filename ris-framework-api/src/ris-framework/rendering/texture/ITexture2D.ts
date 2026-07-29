import {TextureViewDescriptor} from "./TextureViewDescriptor";
import {ITextureView} from "./ITextureView";
import {State} from "../../data/State";
import {TextureFormat} from "./TextureFormat";
import {TextureUsage} from "./TextureUsage";
import {IContent} from "../../content/IContent";

/**
 * The texture 2D interface.
 */
export interface ITexture2D extends IContent {

    /**
     * The default texture view.
     *     It is created with default parameters and can be used when no specific view is needed.
     */
    readonly defaultTextureView: ITextureView;

    /**
     * The texture usage.
     */
    readonly textureUsage: TextureUsage;

    /**
     * The texture format.
     */
    readonly textureFormat: TextureFormat;

    /**
     * The texture view format.
     *     In most cases it will be same as  but in some cases it can be different.
     *
     *     Case where it might differ is if texture is used as depth texture and shader binding.
     */
    readonly textureViewFormat: TextureFormat;

    /**
     * The id of the texture.
     */
    readonly id: number;

    /**
     * The handle of underlying graphics API texture object.
     */
    readonly handle?: any;

    /**
     * The label.
     */
    readonly label?: string;

    /**
     * The current state.
     */
    readonly state: State;

    /**
     * The width of the texture.
     */
    readonly width: number;

    /**
     * The height of the texture.
     */
    readonly height: number;

    /**
     * Creates the texture view with the specified description.
     * @param description - The .
     * @returns The .
     */
    createView(description: TextureViewDescriptor): ITextureView;

    /**
     * Initializes the texture.
     */
    initialize(): void;
}
