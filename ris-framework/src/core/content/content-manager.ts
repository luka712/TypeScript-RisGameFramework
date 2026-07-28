import type { IContent } from "./content-interface";
import type { IContentManager } from "./content-manager-interface";
import type { IContentModule } from "./content-module-interface";

/**
 * The content manager.
 * The content manager is responsible for managing the content modules and loading the content with the given asset file path or identifier.
 */
export class ContentManager implements IContentManager {

    private readonly _contentModuleByType: Map<string, IContentModule[]> = new Map();

    /** @inheritdoc */
    public addContentModule(contentModule: IContentModule): void {

        if (contentModule.contentTypes.length === 0) {
            throw new Error("Content module must provide at least one content type.");
        }

        for (const contentType of contentModule.contentTypes) {
            if (!this._contentModuleByType.has(contentType)) {
                this._contentModuleByType.set(contentType, []);
            }
            this._contentModuleByType.get(contentType)!.push(contentModule);
        }
    }

    /** @inheritdoc */
    public load<T extends IContent>(type: string, assetFilePathOrIdentifier: string): T {

        const contentModules = this._contentModuleByType.get(type);
        if (!contentModules || contentModules.length === 0) {
            throw new Error(`No content module found for content type: ${type}`);
        }

        for (const contentModule of contentModules) {
            try {
                return contentModule.load<T>(assetFilePathOrIdentifier);
            } catch (error) {
                console.warn(`Failed to load content with asset file path or identifier: ${assetFilePathOrIdentifier} using content module: ${contentModule.constructor.name}. Error: ${error}`);
            }
        }

        throw new Error(`Failed to load content with asset file path or identifier: ${assetFilePathOrIdentifier} using any of the content modules for content type: ${type}`);
    }
}