import { vec3, vec4 } from 'gl-matrix';

/**
 * The color.
 */
export class Color {

    /**
     * Create a new color.
     * @param r - The red value.
     * @param g - The green value.
     * @param b - The blue value.
     * @param a - The alpha value. By default, it is 1.0.
     */
    public constructor(
        public r: number,
        public g: number,
        public b: number,
        public a = 1) {
    }

    /**
     * Returns the Black color.
     */
    public static get black(): Color {
        return new Color(0, 0, 0);
    }

    /**
     * Returns the White color.
     */
    public static get white(): Color {
        return new Color(1, 1, 1);
    }

    /**
     * Returns the Light Pink color.
     */
    public static get lightPink(): Color {
        return new Color(1.0, 0.71, 0.76);
    }

    /**
     * Returns the Red color.
     */
    public static get red(): Color {
        return new Color(1, 0, 0);
    }

    /**
     * Returns the Green color.
     */
    public static get green(): Color {
        return new Color(0, 1, 0);
    }

    /**
     * Returns the Blue color.
     */
    public static get blue(): Color {
        return new Color(0, 0, 1);
    }

    /**
     * Returns the Gray color.
     */
    public static get gray(): Color {
        return new Color(0.5, 0.5, 0.5);
    }

    /**
     * Returns the Yellow color.
     */
    public static get yellow(): Color {
        return new Color(1, 1, 0);
    }

    /**
     * Returns the Wheat color.
     */
    public static get wheat(): Color {
        return new Color(0.96, 0.87, 0.7);
    }

    /**
     * Returns the White Smoke color.
     */
    public static get whiteSmoke(): Color {
        return new Color(0.96, 0.96, 0.96);
    }

    /**
     * Returns the Slate Gray color.
     */
    public static get slateGray(): Color {
        return new Color(0.439, 0.502, 0.565);
    }

    /**
     * Returns the Cornflower Blue color.
     */
    public static get cornerFlowerBlue(): Color {
        return new Color(0.39, 0.58, 0.93);
    }

    /**
     * Returns the Orange color.
     */
    public static get orange(): Color {
        return new Color(1.0, 0.647, 0.0);
    }

    /**
     * Are two colors equal.
     * @param other The other color.
     */
    public equals(other: Color): boolean {
        return this.r === other.r &&
            this.g === other.g &&
            this.b === other.b &&
            this.a === other.a && this.b === other.b;
    }

    /**
     * Convert to vector.
     * @returns The vec4.
     */
    public toVector4(): vec4 {
        return vec4.fromValues(this.r, this.g, this.b, this.a);
    }

    /**
     * Convert to vector.
     * @returns The vec3.
     */
    public toVector3(): vec3 {
        return vec3.fromValues(this.r, this.g, this.b);
    }

    /**
     * Linearly interpolate between two colors.
     * @param a - The first color.
     * @param b - The second color.
     * @param t - The time step.
     * @param o - The color that receives value.
     */
    public lerp(a: Color, b: Color, t: number, o: Color) {

        o

    }
}


