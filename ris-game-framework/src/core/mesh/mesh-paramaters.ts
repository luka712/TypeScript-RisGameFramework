export class MeshParameters {

    /**
     * The positions of the mesh. This is an array of floats representing the vertex positions of the mesh.
     */
    public positions: Float32Array | number[] = [];

    /**
     * The indices of the mesh.
     */
    public indices: Uint16Array | number[] | null = null;

    /**
     * The uv texture coordinates of the mesh. 
     */
    public textureCoords: Float32Array | number[] | null = null;

    /**
     * The colors of the mesh. This is an array of floats representing the vertex colors of the mesh.
     */
    public colors: Float32Array | number[] | null = null;
}