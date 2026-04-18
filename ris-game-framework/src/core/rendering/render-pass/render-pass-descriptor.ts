import { Color } from "../../math/color";
import { LoadAction, StoreAction } from '../enums';
import type { ISwapChain } from "../swap-chain/swap-chain-interface";
import type { ITexture2D } from "../texture/texture";

/**
 * This file defines the RenderPassDescriptor class, which is used to describe the configuration of a render pass in the rendering pipeline. 
 * The RenderPassDescriptor contains information about the attachments, clear values, and other settings that are needed to set up a render pass. 
 * This class is typically used when creating a render pass through the graphics device interface.
 */
export class RenderPassDescriptor {

    /**
     * The color attachments for the render pass. 
     * Each attachment can be associated with a swap chain or a texture, depending on the rendering target.
     */
    public colorAttachments: RenderPassColorAttachment[] = [];

    /**
     * The depth-stencil attachment for the render pass. 
     * This can be used to specify a depth-stencil buffer for depth testing and stencil operations during rendering.
     */
    public depthStencilAttachment?: RenderPassDepthStencilAttachment;
}


/**
 * The RenderPassColorAttachment class represents a color attachment for a render pass.
 */
export class RenderPassColorAttachment {

    /**
     * The constructor.
     * @param renderTarget The texture that will be used as the color attachment for the render pass. This can be used for off-screen rendering or when rendering to a texture instead of the swap chain. 
     * @param swapChain The swap chain that will be used as the color attachment for the render pass. This is typically used when rendering directly to the screen.
     */
    constructor(renderTarget?: ITexture2D, swapChain?: ISwapChain) {
        this.texture = renderTarget;
        this.swapChain = swapChain;
    }

    /**
     * The swap chain that will be used as the color attachment for the render pass.
     */
    public swapChain?: ISwapChain | null = null;

    /**
     * The texture that will be used as the color attachment for the render pass.
     *  This can be used for off-screen rendering or when rendering to a texture instead of the swap chain.
     */
    public texture?: ITexture2D | null = null;

    /**
     * The clear color for the color attachment.
     *  This value is used to clear the color attachment at the beginning of the render pass if the load action is set to LoadAction.CLEAR.
     */
    public clearColor = Color.black();

    /**
     * The action to take for the color attachment at the beginning of the render pass. 
     * By efault, it is set to LoadAction.STORE, which means that the existing contents of the color attachment will be preserved.
     */
    public storeAction = StoreAction.STORE;

    /**
     * The action to take for the color attachment at the start of the render pass.
     * By default, it is set to LoadAction.CLEAR, which means that the color attachment 
     * will be cleared at the beginning of the render pass using the specified clear color.
     */
    public loadAction = LoadAction.CLEAR;
}

/**
 * The RenderPassDepthStencilAttachment class represents the depth-stencil attachment for a render pass.
 */
export class RenderPassDepthStencilAttachment {

    /**
     * The constructor.
     * @param texture The texture that will be used as the depth-stencil attachment for the render pass. This can be used to specify a depth-stencil buffer for depth testing and stencil operations during rendering.
     */
    public constructor(texture?: ITexture2D) {
        this.texture = texture;
    }

    /**
     * The texture that will be used as the depth-stencil attachment for the render pass.
     * This can be used to specify a depth-stencil buffer for depth testing and stencil operations during rendering.
     */
    public texture?: ITexture2D;

    /**
     * The clear value for the depth buffer.
     *  This value is used to clear the depth buffer at the beginning of the render pass.
     */
    public depthClearValue: number = 1;

    /**
     * The action to take for the depth buffer at the beginning of the render pass.
     */
    public depthLoadAction = LoadAction.CLEAR;

    /**
     * The action to take for the depth buffer at the end of the render pass.
     */
    public depthStoreAction = StoreAction.STORE;

    /**
     * The clear value for the stencil buffer.
     * This value is used to clear the stencil buffer at the beginning of the render pass.
     */
    public stencilClearValue: number = 0;

    /**
     * The action to take for the stencil buffer at the beginning of the render pass.
     */
    public stencilLoadAction = LoadAction.CLEAR;

    /**
     * The action to take for the stencil buffer at the end of the render pass.
     */
    public stencilStoreAction = StoreAction.STORE;
}