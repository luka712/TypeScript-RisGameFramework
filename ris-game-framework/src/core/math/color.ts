/**
 * Represents a color with red, green, blue, and alpha components.
 */
export class Color {

    /**
     * The constructor.
     * @param r The red component.
     * @param g The green component.
     * @param b The blue component.
     * @param a The alpha component. Default is 1.0 (opaque).
     */
    constructor(public r: number, public g: number, public b: number, public a: number = 1.0) {
        
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