import type { TextureFormat } from "../../common/texture-enums";
import { WebGLConverter } from "./webgl-converter";

export class WebGLRenderBufferUtilities {


    public create(gl: WebGL2RenderingContext, internalFormat: TextureFormat, width: number, height: number, label: string | null = null): WebGLRenderbuffer {

        const glFormat = WebGLConverter.convertInternalFormat(gl, internalFormat);
        const renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER,
            glFormat,
            width,
            height);

        if (label !== null && label !== undefined && label !== "") {
            (renderBuffer as any).__SPECTOR_Metadata = { name: label };
        }

        return renderBuffer;
    }
}