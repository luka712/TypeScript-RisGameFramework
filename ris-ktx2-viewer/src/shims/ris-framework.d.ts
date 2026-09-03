declare module "ris-framework" {
    import type {IFramework} from "ris-framework-api";
    import type {vec2} from "gl-matrix";

    export interface FrameworkConfig {
        canvas?: HTMLCanvasElement | null;
        backBufferSize?: vec2;
        textureFiltering?: unknown;
    }

    /**
     * Ambient typing for the local monorepo Framework implementation.
     * Runtime is resolved via Vite alias to ../ris-framework/src/core/Framework.ts.
     *
     * Declared as a construct signature returning IFramework so the viewer does not
     * need to re-declare every interface member (implementation is still catching up).
     */
    export const Framework: {
        new (options?: FrameworkConfig | null): IFramework;
    };
}
