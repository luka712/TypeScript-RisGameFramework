/**
 * Represents a color with red, green, blue, and alpha components.
 */
export class Color extends Array<number> {

    /**
     * The constructor.
     * @param r The red component.
     * @param g The green component.
     * @param b The blue component.
     * @param a The alpha component. Default is 1.0 (opaque).
     */
    constructor(r: number, g: number, b: number, a: number = 1.0) {
        super(4);
        this[0] = r;
        this[1] = g;
        this[2] = b;
        this[3] = a;
    }

    /**
     * Gets the red component of the color.
     * @return The red component of the color.
     */
    public get r(): number {
        return this[0];
    }

    /**
     * Sets the red component of the color.
     * @param value The new value for the red component.
     */
    public set r(value: number) {
        this[0] = value;
    }

    /**
     * Gets the green component of the color.
     * @return The green component of the color.
     */
    public get g(): number {
        return this[1];
    }

    /**
     * Sets the green component of the color.
     * @param value The new value for the green component.
     */
    public set g(value: number) {
        this[1] = value;
    }

    /**
     * Gets the blue component of the color.
     * @return The blue component of the color.
     */
    public get b(): number {    
        return this[2];
    }

    /**
     * Sets the blue component of the color.
     * @param value The new value for the blue component.
     */
    public set b(value: number) {
        this[2] = value;
    }

    /**
     * Gets the alpha component of the color.
     * @return The alpha component of the color.
     */
    public get a(): number {
        return this[3];
    }

    /**
     * Sets the alpha component of the color.
     * @param value The new value for the alpha component.
     */
    public set a(value: number) {
        this[3] = value;
    }   

    /**
     * Gets a Color instance representing light pink color.
     * @return A Color instance with light pink color.
     */
    public static lightPink(): Color {
        return new Color(1.0, 0.71, 0.76, 1.0);
    }

    /**
     * Gets a Color instance representing red color.
     * @return A Color instance with red color.
     */
    public static red(): Color {
        return new Color(1.0, 0.0, 0.0, 1.0);
    }

    /**
     * Gets a Color instance representing black color.
     * @returns The Color instance with black color.
     */
    public static black(): Color {
        return new Color(0.0, 0.0, 0.0, 1.0);
    }

    /**
     * Compares this color with another color for equality.
     * @param other The other color to compare with.
     * @returns True if the colors are equal; otherwise, false.
     */
    public equals(other: Color): boolean {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    }
}