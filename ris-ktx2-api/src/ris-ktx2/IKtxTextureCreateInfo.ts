import type {VkFormat} from "./VkFormat.ts";

/** The creation info for KTX2 texture. */
export interface IKtxTextureCreateInfo {

    /** The base width of the texture. */
    baseWidth: number;

    /** The base height of the texture. */
    baseHeight: number;

    /** The Vulkan format of the texture. */
    vkFormat?: VkFormat;

    /** The number of mipmap levels. By default, it is 1. */
    numLevels?: number;
}