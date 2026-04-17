
import { inject, injectable } from 'tsyringe';
import type { IContent } from '../../core/content/content-interface';
import type { IContentModule } from '../../core/content/content-module-interface';
import { WebGLShaderModule } from './webgl-shader-module';
import type { IFramework } from '../../core/framework-interface';
import { IFrameworkSymbol } from '../../core/dependency-injection/register-services-interface';

@injectable()
export class WebGLShaderContentModule implements IContentModule {
    private readonly _shaderModules: Map<string, WebGLShaderModule> = new Map<string, WebGLShaderModule>();

    private readonly _framework: IFramework;

    readonly contentTypes = [WebGLShaderModule.name];

    /**
     * The WebGL shader content module.
     * @param _framework 
     */
    public constructor(@inject(IFrameworkSymbol) framework: IFramework) {
        this._framework = framework;
    }

    /**
     * The content types provided by this content module.
     * @param assetFilePathOrIdentifier The asset file path or identifier of the content to load.
     */
    public load<T extends IContent>(assetFilePathOrIdentifier: string): T {
        let shaderModule = this._shaderModules.get(assetFilePathOrIdentifier);
        if (!shaderModule) {
            shaderModule = new WebGLShaderModule(this._framework, assetFilePathOrIdentifier);
            this._shaderModules.set(assetFilePathOrIdentifier, shaderModule);
        }
        return shaderModule as unknown as T;
    }


}