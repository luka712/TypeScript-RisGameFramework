import type { IContent } from './content-interface';
import type { IContentModule } from './content-module-interface';

export const IContentManagerSymbol = Symbol.for("IContentManager");

/**
 * The content manager interface.
 */
export interface IContentManager {

    /**
     * Adds a content module to the content manager. 
     * The content manager will use the content types provided by the content module to determine which 
     * content module to use when loading a content with a given asset file path or identifier.
     * @param contentModule The content module to add.
     */
    addContentModule(contentModule: IContentModule): void;

    /**
     * Loads the content with the given asset file path or identifier. 
     * @param type The type of the content to load.
     * @param assetFilePathOrIdentifier The asset file path or identifier of the content to load.
     */
    load<T extends IContent>(type: string, assetFilePathOrIdentifier: string) : T;

}