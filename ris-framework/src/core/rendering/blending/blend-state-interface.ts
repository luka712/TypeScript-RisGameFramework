import type { IDisposable } from "../../../common/disposable";

/**
 * The interface for blend state. 
 * A blend state defines how the output of a fragment shader is blended with the existing color in the render target.
 *  It includes properties such as blend factors, blend operations, and color write masks.
 */
export interface IBlendState extends IDisposable {

    /**
     * The native blend state object, which can be used for low-level graphics API calls.
     */
    readonly nativeObject: any;
}