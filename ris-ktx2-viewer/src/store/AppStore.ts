import {create} from "zustand";
import type {IFramework} from "ris-framework-api";
import type {vec2} from "gl-matrix";
import {View2D, View3D} from "../model/View.ts";

interface AppStore {
    framework: IFramework | null;
    setFramework: (framework: IFramework) => void;
    setResolution: (resolution: vec2) => void;
    view: string,
    getView: () => string;
    setView: (v: string) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
    framework: null,

    view: View3D,

    getView: () => get().view,

    setView: view => set({view}),

    setFramework: (framework) => set({framework}),

    setResolution: (resolution) => {
        const framework = get().framework;
        if (framework) {
            framework.renderer.backBufferSize = resolution;
        }
    },
}));
