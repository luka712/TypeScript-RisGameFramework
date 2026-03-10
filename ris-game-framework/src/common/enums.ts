/**
 * This enum defines the types of index buffers that can be used in the rendering framework. An index buffer is a data structure that holds indices into vertex data, allowing for efficient reuse of vertex data when rendering complex models. The two types of index buffers defined here are:
 * - `Uint16`: A 16-bit unsigned integer index buffer, which can hold indices for up to 65535 vertices. This is suitable for smaller models.
 * - `Uint32`: A 32-bit unsigned integer index buffer, which can hold indices for more than 65535 vertices. This is suitable for larger models that require more vertices.
 */
export enum IndexBufferType {
    /** A 16-bit unsigned integer index buffer. This is suitable for models with up to 65535 vertices. */
    Uint16 = "Uint16",

    /** A 32-bit unsigned integer index buffer. This is suitable for models with more than 65535 vertices. */
    Uint32 = "Uint32"
}