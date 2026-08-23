import {VkFormat} from "./VkFormat.ts";

/**
 * Describes how a texture format is laid out in memory in terms of blocks.
 *
 * For uncompressed formats, a block is equivalent to a single pixel:
 * BlockWidth = 1, BlockHeight = 1, BytesPerBlock = bytes per pixel.
 *
 * For compressed formats (e.g. BC7), a block represents a group of pixels
 * (typically 4x4) stored in a fixed number of bytes.
 */
export class TextureFormatInfo {
    /** Width of a single block in pixels. */
    public readonly blockWidth: number;

    /** Height of a single block in pixels. */
    public readonly blockHeight: number;

    /** Depth of a single block in pixels. */
    public readonly blockDepth: number;

    /** Size of a single block in bytes. */
    public readonly bytesPerBlock: number;

    /**
     * Gets the average number of bytes used per pixel (texel).
     *
     * For uncompressed formats, this is the actual number of bytes per pixel.
     * For compressed formats, this is the average storage cost per pixel.
     */
    public get pixelSize(): number {
        return this.bytesPerBlock /
            (this.blockWidth * this.blockHeight * this.blockDepth);
    }

    /**
     * The constructor.
     * @param blockWidth The block width.
     * @param blockHeight The block height.
     * @param blockDepth The block depth.
     * @param bytesPerBlock How many bytes are there in block.
     */
    public constructor(
        blockWidth: number,
        blockHeight: number,
        blockDepth: number,
        bytesPerBlock: number
    ) {
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.blockDepth = blockDepth;
        this.bytesPerBlock = bytesPerBlock;
    }

    /**
     * Computes the number of blocks per row for a given texture width.
     */
    public getBlocksPerRow(width: number): number {
        return Math.ceil(width / this.blockWidth);
    }

    /**
     * Computes the number of block rows required to cover a height.
     */
    public getBlocksPerColumn(height: number): number {
        return Math.ceil(height / this.blockHeight);
    }

    /**
     * Computes the number of block slices required to cover a depth.
     */
    public getBlocksPerSlice(depth: number): number {
        return Math.ceil(depth / this.blockDepth);
    }

    /**
     * Gets the unaligned number of bytes in a row of blocks.
     */
    public getBytesPerRow(width: number): number {
        return this.getBlocksPerRow(width) * this.bytesPerBlock;
    }

    /**
     * Gets the WebGPU-aligned bytes-per-row value.
     *
     * WebGPU requires bytesPerRow to be a multiple of 256.
     */
    public getAlignedBytesPerRow(width: number): number {
        const bytesPerRow = this.getBytesPerRow(width);
        return Math.ceil(bytesPerRow / 256) * 256;
    }

    /**
     * Computes the size in bytes of a 2D texture level.
     */
    public getDataSize(width: number, height: number): number {
        const blocksX = this.getBlocksPerRow(width);
        const blocksY = this.getBlocksPerColumn(height);

        return blocksX * blocksY * this.bytesPerBlock;
    }

    /**
     * Computes the size in bytes of a 3D texture level.
     */
    public getDataSize3D(
        width: number,
        height: number,
        depth: number
    ): number {
        const blocksX = this.getBlocksPerRow(width);
        const blocksY = this.getBlocksPerColumn(height);
        const blocksZ = this.getBlocksPerSlice(depth);

        return blocksX * blocksY * blocksZ * this.bytesPerBlock;
    }

    /** BC7 compressed texture format. */
    public static bc7() {
        return new TextureFormatInfo(4, 4, 1, 16);
    }

    /** BC3 compressed texture format. */
    public static bc3() {
        return new TextureFormatInfo(4, 4, 1, 16);
    }

    /** ETC2 RGBA compressed texture format. */
    public static etc2rgba() {
        return new TextureFormatInfo(4, 4, 1, 16);
    }

    /** ASTC 4x4 RGBA compressed texture format. */
    public static astc4x4rgba() {
        return new TextureFormatInfo(4, 4, 1, 16);
    }

    /** The raw RGBA8 */
    public static rgba32() {
        return new TextureFormatInfo(1, 1, 1, 4);
    }

    /** The DEPTH 24 S8 format info **/
    public static depth24Stencil8()  {
        return new TextureFormatInfo(1,1,1,4);
    }

    /**
     * Gets the texture format info from VkFormat.
     * @param vkFormat The VkFormat.
     * @return The TextureFormatInfo
     */
    public static fromVkFormat(vkFormat: VkFormat): TextureFormatInfo {
        switch (vkFormat) {
            case VkFormat.R8G8B8A8_UNORM:
                return this.rgba32();
            case VkFormat.D24_UNORM_S8_UINT:
                return this.depth24Stencil8();
           /* case VkFormat.D32_SFLOAT:
                return this.depth32float(); */
            case VkFormat.ASTC_4X4_UNORM_BLOCK:
                return this.astc4x4rgba();
            case VkFormat.BC7_UNORM_BLOCK:
                return this.bc7();
            case VkFormat.BC3_UNORM_BLOCK:
                return this.bc3();
            default:
                throw new Error(`Not implemented: ${vkFormat}`);
        }
    }
}