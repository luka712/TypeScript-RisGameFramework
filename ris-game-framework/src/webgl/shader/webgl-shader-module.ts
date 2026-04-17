import type { IShaderModule } from "../../core/shader/shader-module-interface";
import { ShaderStage } from '../../core/rendering/enums';
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";
import { RenderingBackend } from "../../common/rendering-backend";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { IFramework } from "../../core/framework-interface";

/**
 * The WebGL shader module.
 */
export class WebGLShaderModule implements IShaderModule {

    private readonly _framework: IFramework;
    private readonly _graphicsDevice: WebGLGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private _program?: WebGLProgram;

    /**
     * The constructor of the WebGL shader module.
     * @param framework The framework.
     * @param shaderFilePath 
     */
    public constructor(framework: IFramework, shaderFilePath: string) {
        this._framework = framework;
        this._graphicsDevice = framework.renderer.graphicsDevice as WebGLGraphicsDevice;
        this._gl = this._graphicsDevice.gl;
        this.webGlProgramPromise = new Promise<WebGLProgram>(async (resolve, reject) => {
            try {
                this._program = await this._loadShaders(shaderFilePath);
                resolve(this._program);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * The promise that resolves to the WebGL program created from the shader module.
     *  This is used to ensure that the shader module is fully loaded and compiled before it is used in the render pipeline.
     */
    public webGlProgramPromise: Promise<WebGLProgram> | null = null;

    private async _loadShaders(shaderFilePath: string): Promise<WebGLProgram> {

        const VERTEX_SHADER_FILE_PATH = "shaders/glsl/main_render_target_flip_y_vs.glsl";
        const FRAGMENT_SHADER_FILE_PATH = "shaders/glsl/main_render_target_flip_y_fs.glsl";

        const vertexShaderSource = await this._framework.shaderLoader.load(VERTEX_SHADER_FILE_PATH, RenderingBackend.WEB_GL, [ShaderStage.VERTEX]);
        const fragmentShaderSource = await this._framework.shaderLoader.load(FRAGMENT_SHADER_FILE_PATH, RenderingBackend.WEB_GL, [ShaderStage.FRAGMENT]);

        const vertexShader = WebGLUtilities.shader.createVertexShader(this._gl, vertexShaderSource);
        const fragmentShader = WebGLUtilities.shader.createFragmentShader(this._gl, fragmentShaderSource);

        const program = WebGLUtilities.program.create(this._gl, vertexShader, fragmentShader);

        // Clean up shaders after linking.
        this._gl.deleteShader(vertexShader);
        this._gl.deleteShader(fragmentShader);

        return program;
    }

    /** @inheritdoc */
    public dispose(): void {

        if (this._program) {
            this._gl.deleteProgram(this._program);
            this._program = undefined;
            this.webGlProgramPromise = null;
        }
    }
}