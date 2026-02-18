
/**
 * The blend component.
 */
export enum BlendOperation
{
    Add,
    Subtract,
    ReverseSubtract,
    Min,
    Max,
}

/**
 * The blend factor.
 */
export enum BlendFactor
{
    Zero,
    One,
    Src,
    OneMinusSrc,
    SrcAlpha,
    OneMinusSrcAlpha,
    Dst,
    OneMinusDst,
    DstAlpha,
    OneMinusDstAlpha,
    Constant,
    OneMinusConstant,
}

/**
 * The blend component. Defines the source and destination factors and the operation to perform on them.
 */
export class BlendComponent
{
   /**
    *  Multiplier for the source color/alpha which is the color/alpha of the pixel being drawn.
    */
    public srcFactor: BlendFactor = BlendFactor.One;

    /**
     * Multiplier for the destination color/alpha which is the color/alpha already in the framebuffer.
     */
    public dstFactor : BlendFactor = BlendFactor.OneMinusSrcAlpha;

    /**
     * The operation to perform on the source and destination colors, multiplied by their respective factors.
     */
    public operation: BlendOperation = BlendOperation.Add;

    /**
     * Compares this blend component to another for equality.
     * @param other The other blend component.
     * @returns True if equal, false otherwise.
     */
    public equals(other: BlendComponent): boolean {
        return this.srcFactor === other.srcFactor &&
               this.dstFactor === other.dstFactor &&
               this.operation === other.operation;
    }

    /**
     * Compares two blend components for equality.
     * @param a The first blend component.
     * @param b The second blend component.
     * @returns True if equal, false otherwise.
     */
    public static areEqual(a: BlendComponent, b: BlendComponent): boolean {
        return a.equals(b);
    }
}

/**
 * The blend state.
 */
export class BlendState 
{
    /**
     * Should blending be enabled. By default <c>true</c>.
     */
    public blendingEnabled : boolean = true;

    /**
     * Color equation.
     */
    public color : BlendComponent = new BlendComponent();

    /**
     * Alpha equation.
     */
    public alpha : BlendComponent = new BlendComponent();

    /**
     * Compares this blend state to another for equality.
     * @param other The other blend state.
     * @returns True if equal, false otherwise.
     */
    public equals(other: BlendState): boolean {
        return this.blendingEnabled === other.blendingEnabled &&
               BlendComponent.areEqual(this.color, other.color) &&
               BlendComponent.areEqual(this.alpha, other.alpha);
    }

    /**
     * Compares two blend states for equality.
     * @param a The first blend state.
     * @param b The second blend state.
     * @returns True if equal, false otherwise.
     */
    public static areEqual(a: BlendState, b: BlendState): boolean {
        return a.equals(b);
    }
}