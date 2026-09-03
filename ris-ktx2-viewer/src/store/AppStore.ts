import {create} from "zustand";
import type {IFramework} from "ris-framework-api";
import type {vec2} from "gl-matrix";

interface AppStore {
    framework: IFramework | null;
    setFramework: (framework: IFramework) => void;
    setResolution: (resolution: vec2) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
    framework: null,

    setFramework: (framework) => set({framework}),

    setResolution: (resolution) => {
        const framework = get().framework;
        if (framework) {
            framework.renderer.backBufferSize = resolution;
        }
    },
}));
