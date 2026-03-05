export enum BufferUsage {
    
    /** 
     * No specific usage.
     */
    None,

    /**
     * The buffer is intended to be used as a vertex buffer.
     */
    Vertex,

    /**
     * The buffer is intended to be used as a copy destination.
     */
    CopyDst,

    /**
     * The buffer is intended to be as a vertex buffer and a copy destination.
     */
    Vertex_CopyDst,
}