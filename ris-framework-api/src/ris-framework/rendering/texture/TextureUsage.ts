/**
 * The usage of the texture.
 */
export enum TextureUsage {
/**
 * Can be used in case where it's not relevant, such as in OpenGL.
 */
  NONE = 0,
/**
 * Texture can be read from but has no other usages.
 *     
 *     Corresponds to WGPU_COPY_SRC in WebGPU.
 *     
 *     In D3D11 can be translated to following properties:
 *     D3D11_BIND_SHADER_RESOURCED3D11_USAGE_STAGINGD3D11_BIND_FLAG_NONE
 */
  COPYSRC = 1,
/**
 * The texture is used as a destination for copying.
 *     To upload data.
 */
  COPYDST = 2,
/**
 * The texture is used as a source for texture binding.
 *     Can be read in shader.
 *     
 *     Corresponding binding in D3D11 is D3D11_BIND_SHADER_RESOURCE.
 */
  TEXTUREBINDING = 3,
/**
 * The texture is used as a storage texture.
 *     Can be written in shader.
 */
  STORAGEBINDING = 4,
/**
 * The texture is used as a render attachment.
 *     
 *     Corresponding binding in D3D11 is D3D11_BIND_RENDER_TARGET.
 */
  RENDERATTACHMENT = 5,
/**
 * The texture is used as render attachment and copy source.
 *     
 *     Corresponding binding in WebGPU is WGPU_RENDER_ATTACHMENT | WGPU_COPY_SRC.
 */
  RENDERATTACHMENT_COPYSRC = 6,
/**
 * The texture is used as render attachment, copy source and copy destination.
 *     
 *     Corresponding binding in WebGPU is WGPU_RENDER_ATTACHMENT | WGPU_COPY_SRC | WGPU_COPY_DST.
 */
  RENDERATTACHMENT_COPYSRC_COPYDST = 7,
/**
 * The combination of  and 
 *     Used by texture for which we want to write some data and read data from it, but not use it as part of pipeline.
 *     
 *     For example if we want to write height map into a texture and later read from it.
 *     
 *     In WebGPU it is resolved as WGPU_COPY_DST | WGPU_COPY_SRC.
 *     
 *     In D3D11 it is resolved as:
 *     Usage: D3D11_USAGE_STAGING.BindFlags: 0.CPUAccessFlags: D3D11_CPU_ACCESS_READ.
 */
  COPYDST_COPYSRC = 8,
/**
 * Combination of  and .
 */
  COPYDST_TEXTUREBINDING = 9,
/**
 * The texture that is used as copy destination and as storage binding.
 *     Combination of  and  and .
 */
  COPYDST_TEXTUREBINDING_STORAGEBINDING = 10,
/**
 * The combination of ,  and .
 */
  COPYDST_COPYSRC_TEXTUREBINDING = 11,
/**
 * The texture that is used as a source for copying and as a destination for copying.
 *     Can be read and written in shader.
 */
  COPYDST_COPYSRC_TEXTUREBINDING_STORAGEBINDING = 12,
/**
 * The texture that is used as copy destination, texture binding and render target.
 *     Can be used to write to a texture, use it as shader resource and as render target.
 */
  COPYDST_TEXTUREBINDING_RENDERTARGET = 13,
/**
 * The texture that is used as texture binding and render target.
 *     That means that it can be used as shader resource but also used as color attachment to which can be renderered into.
 *     
 *     Corresponding binding in D3D11 is D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_RENDER_TARGET.
 */
  TEXTUREBINDING_RENDERTARGET = 14
}
