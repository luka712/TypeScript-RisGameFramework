import type { IContent } from "./content-interface";

export const IContentModuleSymbol = Symbol.for("IContentModule");

export interface IContentModule {

    /**
     * The content types provided by this content module.
     * The content manager will use this information to determine which content module to use when loading a content with a given asset file path or identifier.
     */
    readonly contentTypes: string[];

    /**
     * Loads the content with the given asset file path or identifier. 
     * @param assetFilePathOrIdentifier 
     */
    load<T extends IContent>(assetFilePathOrIdentifier: string): T;
}