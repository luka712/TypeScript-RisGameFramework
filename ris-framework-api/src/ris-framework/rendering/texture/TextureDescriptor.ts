import {TextureFormat} from "./TextureFormat";

/**
 * The texture descriptor.
 */
export class TextureDescriptor {

    /**
     * The format of the texture.
     * By default, it is UNDEFINED.
     * If UNDEFINED is specified, the format will be automatically determined for generic image formats
     * such as PNG, JPEG, etc.
     */
    public format: TextureFormat = TextureFormat.UNDEFINED;

    /**
     * If true, the texture will be generated with mipmaps.
     */
    public generateMipmaps = false;

}
