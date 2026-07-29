import type {IShaderModule} from "../../core/shader/shader-module-interface";
import type {WebGlGraphicsDevice} from "../webgl-graphics-device";
import {WebGlUtilities} from "../utilities/WebGlUtilities.ts";
import {RenderingBackend} from "../../common/rendering-backend.ts";
import {ShaderStage} from "../../core/rendering/enums.ts";
import type {IFramework} from "ris-framework-api";
import {ShaderLoader} from "../../core/shader/shader-loader.ts";
import {ShaderContent} from "../../content/ShaderContent.ts";

interface WebGlInternalShader {
    vertex: string;
    fragment: string;
    reflection: any; // This will be type in the future.
}

/**
 * The WebGL shader module.
 */
class WebGlShaderModule implements IShaderModule {

    private readonly _framework: IFramework;
    private readonly _graphicsDevice: WebGlGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private _program?: WebGLProgram;
    private readonly _shaderLoader = new ShaderLoader();

    /**
     * The constructor of the WebGL shader module.
     * @param framework The framework.
     * @param shaderFilePath
     */
    public constructor(framework: IFramework, shaderFilePath: string) {
        this._framework = framework;
        this._graphicsDevice = framework.renderer.graphicsDevice as WebGlGraphicsDevice;
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
     * Tries to framework shader.
     * These shaders are part of framework.
     * @param id The id of internal shader.
     */
    private _tryResolveFrameworkShader(id: string): WebGlInternalShader| null {
        if(ShaderContent[id]) {
            return {
                vertex: ShaderContent[id]["vertex"],
                fragment: ShaderContent[id]["fragment"],
                reflection: ShaderContent[id]["reflection"],
            }
        }

        return  null;
    }

    /**
     * The promise that resolves to the WebGL program created from the shader module.
     *  This is used to ensure that the shader module is fully loaded and compiled before it is used in the render pipeline.
     */
    public webGlProgramPromise: Promise<WebGLProgram> | null = null;

    private async _loadShaders(shaderFilePath: string): Promise<WebGLProgram> {

        const internalShader = this._tryResolveFrameworkShader(shaderFilePath);

        let vertexShaderSource = "";
        let fragmentShaderSource = "";
        if(internalShader) {
            vertexShaderSource = internalShader.vertex;
            fragmentShaderSource = internalShader.fragment;
        }
        else {
            // TODO: this is not complete we need to determine how it will be loaded from files.
            // Most likely content pipeline will be source of truth
            vertexShaderSource = await this._shaderLoader.load(shaderFilePath, RenderingBackend.WEB_GL, [ShaderStage.VERTEX]);
            fragmentShaderSource = await this._shaderLoader.load(shaderFilePath, RenderingBackend.WEB_GL, [ShaderStage.FRAGMENT]);
        }


        const vertexShader = WebGlUtilities.shader.createVertexShader(this._gl, vertexShaderSource);
        const fragmentShader = WebGlUtilities.shader.createFragmentShader(this._gl, fragmentShaderSource);

        const program = WebGlUtilities.program.create(this._gl, vertexShader, fragmentShader);

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

export default WebGlShaderModule