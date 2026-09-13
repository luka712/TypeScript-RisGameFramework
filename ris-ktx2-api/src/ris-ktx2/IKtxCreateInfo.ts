import type {VkFormat} from "./VkFormat.ts";

/** The creation info for KTX2 texture. */
export interface IKtxCreateInfo {

    /** The base width of the texture. */
    baseWidth: number;

    /** The base height of the texture. */
    baseHeight: number;

    /** The Vulkan format of the texture. */
    vkFormat?: VkFormat;
}