
/** The geometry format. */
export enum GeometryFormat {
    /** Geometry format where:
     * - First 3 floats are reserved for vertex position.
     * - Following 4 floats are reserved for vertex color.
     */
    Pos3_Color4 = 0,

    /** Geometry format where:
     * - First 3 floats are reserved for vertex position.
     * - Following 4 floats are reserved for vertex color.
     * - Following 2 floats are reserved for vertex texture coordinates.
     */
    Pos3_Color4_TextureCoords2 = 1,

    /** Geometry format where:
     * - First 3 floats are reserved for vertex position.
     * - Following 4 floats are reserved for vertex color.
     * - Following 2 floats are reserved for vertex texture coordinates.
     * - The vertex data is aligned to 4 floats, meaning that there are 2 padding floats after the texture coordinates.
     */
    Pos3_Color4_TextureCoords2_Aligned = 2,

    /** Geometry format where:
     * - First 3 floats are reserved for vertex position.
     * - Following 4 floats are reserved for vertex color.
     * - Following 2 floats are reserved for vertex texture coordinates.
     * - Following 3 floats are reserved for vertex normals.
     */
    Pos3_Color4_TextureCoords2_Normal3 = 3,

    /** Geometry format where:
     * - First 3 floats are reserved for vertex position.
     * - Following 2 floats are reserved for vertex texture coordinates.
     */
    Pos3_TextureCoords2 = 4
}