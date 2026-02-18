import type { DependencyContainer } from "tsyringe";

export const IFrameworkSymbol = Symbol.for("IFramework");
export const IRendererSymbol = Symbol.for("IRenderer");
export const IRenderTargetFactorySymbol = Symbol.for("IRenderTargetFactory");
export const ITextureFactorySymbol = Symbol.for("ITextureFactory");

/**
 * The interface for registering services to the dependency injection container.
 */
export interface IRegisterServices {

    /**
     * Register all services to the dependency injection container in this method.
     * @param container The dependency injection container to register services to.
     */
    register(container: DependencyContainer): void;
}
