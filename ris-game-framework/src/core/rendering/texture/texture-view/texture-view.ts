import { TextureFormat } from "../../../../common/texture-enums";
import { TextureViewDimension } from "../enums";

/**
 * The ITextureView interface defines the properties and methods for a texture view,
 *  which is a representation of a texture that can be used in shaders.
 *  It includes properties for the texture format and dimension, which are essential for correctly interpreting the texture data in shaders.
 */
export interface ITextureView {
   
    /**
     * The label of the texture view.
     */
    readonly textureFormat: TextureFormat;

    /**
     * The dimension of the texture view.
     */
    readonly dimension: TextureViewDimension;
}

/**
 * The TextureViewDescriptor class defines the properties for describing a texture view, including its label, dimension, and texture format.
 */
export class TextureViewDescriptor {

    /**
     * The label of the texture view. 
     * This is used for debugging purposes and can be helpful when using graphics debuggers to identify different texture views.
     */
    label?: string;

    /**
     * The dimension of the texture view.
     * It is used to specify the type of the texture view and how it will be used in shaders.
     */
    dimension = TextureViewDimension.DIMENSION_2D;

    /**
     * The format of the texture view. 
     * This is used to specify the format of the texture data that will be accessed through this view.
     */
    textureFormat = TextureFormat.BGRA_8_UNORM;
}
