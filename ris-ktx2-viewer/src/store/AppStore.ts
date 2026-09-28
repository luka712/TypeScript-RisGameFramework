import {create} from "zustand";
import type {IFramework} from "ris-framework-api";
import type {vec2} from "gl-matrix";
import {View2D} from "../model/View.ts";

interface AppStore {
    framework: IFramework | null;
    setFramework: (framework: IFramework) => void;
    setResolution: (resolution: vec2) => void;
    view: string,
    getView: () => string;
    setView: (v: string) => void;

    supportsBC7: boolean,
    supportsASTC: boolean,
    supportsETC2: boolean,
    supportsBC3: boolean,
    supportsPVRTC: boolean,
}

export const useAppStore = create<AppStore>((set, get) => ({
    framework: null,
    supportsASTC: false,
    supportsBC7: false,
    supportsETC2: false,
    supportsBC3: false,
    supportsPVRTC: false,

    view: View2D,

    getView: () => get().view,

    setView: view => set({view}),

    setFramework: (framework) => {

        const features = framework?.graphicsDevice.features;
        const supportsBC3 = features?.supportsTextureCompressionS3TC;
        const supportsBC7 = features?.supportsTextureCompressionBC;
        const supportsASTC = features?.supportsTextureCompressionASTC;
        const supportsETC2 = features?.supportsTextureCompressionETC2;

        set({framework, supportsBC3, supportsBC7, supportsASTC, supportsETC2})
    },

    setResolution: (resolution) => {
        const framework = get().framework;
        if (framework) {
            framework.renderer.backBufferSize = resolution;
        }
    },
}));
