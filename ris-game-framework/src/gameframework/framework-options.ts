
/**
 * The options for configuring the Framework.
 */
export class FrameworkOptions {

    constructor() {}

    /** 
     * The HTMLCanvasElement to use for rendering. 
     * If null, a new canvas will be created and added to the document body.
     */
    canvas: HTMLCanvasElement|null = null;
}