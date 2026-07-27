/**
 * The buffer usage.
 */
export enum BufferUsage {
    /**
     * No buffer usage is defined.
     */
    NONE = 0,
    /**
     * Allow a buffer to be the vertex buffer in a draw operation.

     Corresponding binding in WGPU is WGPU_VERTEX.
     Corresponding usage in OpenGL/WebGL is GL_ELEMENT_ARRAY_BUFFER.
     */
    VERTEX = 1,
    /**
     * The buffer is used as an index buffer in a draw operation.
     */
    INDEX = 2,
    /**
     * Allow a buffer to be the uniform buffer in a draw operation.

     Corresponding binding in WGPU is WGPU_UNIFORM.
     */
    UNIFORM = 3,
    /**
     * Allow a buffer to be the storage buffer in a draw operation.

     In WGPU this will resolve to WGPU_STORAGE.

     In OpenGL this will resolve to GL_SHADER_STORAGE_BUFFER.

     In D3D11 this will resolve to usage D3D11_USAGE_DEFAULT.

     In D3D11 this will resolve to bind flags D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_UNORDERED_ACCESS.

     In D3D11 this will resolve to misc flags D3D11_RESOURCE_MISC_BUFFER_STRUCTURED.
     */
    STORAGE = 4,
    /**
     * Buffer is allowed to be read from.

     Common use case is copying data from the buffer to the CPU memory.

     Corresponding binding in WGPU is WGPU_MAP_READ.
     */
    MAPREAD = 5,
    /**
     * Buffer is used as destination for copying.

     Common use case is writing data to a buffer.

     Corresponding binding in WGPU is WGPU_COPY_DST.
     */
    COPYDST = 6,
    /**
     * Combination of  and .

     For example can be used when needing to create a vertex buffer which is to be written into
     via queue commands.
     * Corresponding usage in OpenGL/WebGL is GL_ELEMENT_ARRAY_BUFFER.
     */
    VERTEX_COPYDST = 7,
    /**
     * Combination of ,  and .

     For example can be used when needing to create a vertex buffer which is to be written into
     via queue commands and used as a storage buffer (read/write). Common case scenario is
     writing to buffer in compute shader and then reading from it in vertex shader.

     In D3D11 this will resolve to usage D3D11_USAGE_DEFAULT.

     In D3D11 this will resolve to bind flags D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_UNORDERED_ACCESS.

     In D3D11 this will resolve to misc flags D3D11_RESOURCE_MISC_BUFFER_STRUCTURED.
     */
    VERTEX_COPYDST_STORAGE = 8,
    /**
     * Combination of  and .

     For example can be used when needing to create a uniform buffer which is to be written into
     via queue commands.
     */
    UNIFORM_COPYDST = 9,
    /**
     * Combination of  and .

     For example can be used when needing to copy and read data from a buffer,
     such as copying data from a texture to a buffer and then from buffer to the CPU memory.
     */
    MAPREAD_COPYDST = 10
}
