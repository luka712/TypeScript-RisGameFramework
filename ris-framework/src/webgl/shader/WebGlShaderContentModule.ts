import type { IContent } from '../../core/content/content-interface';
import type { IContentModule } from '../../core/content/content-module-interface';
import WebGlShaderModule from './WebGlShaderModule.ts';
import type {IFramework} from "ris-framework-api";

/**
 * The content WebGL implementation of ShaderContentModule.
 */
export class WebGlShaderContentModule implements IContentModule {
    private readonly _shaderModules: Map<string, WebGlShaderModule> = new Map<string, WebGlShaderModule>();
    private readonly _framework: IFramework;

    /**
     * The type of content that this content module can load.
     */
    public readonly contentTypes = [WebGlShaderModule.name];

    /**
     * The WebGL shader content module.
     * @param framework The framework.
     */
    public constructor(framework: IFramework) {
        this._framework = framework;
    }

    /**
     * The content types provided by this content module.
     * @param assetFilePathOrIdentifier The asset file path or identifier of the content to load.
     */
    public load<T extends IContent>(assetFilePathOrIdentifier: string): T {

        // Here something like 'sprite' is provided, we must resolve it.

        // Is it already cached?
        let shaderModule = this._shaderModules.get(assetFilePathOrIdentifier);
        if (!shaderModule) {

            // If it does not exist create one and set it.
            shaderModule = new WebGlShaderModule(this._framework, assetFilePathOrIdentifier);
            this._shaderModules.set(assetFilePathOrIdentifier, shaderModule);
        }
        return shaderModule as unknown as T;
    }


}