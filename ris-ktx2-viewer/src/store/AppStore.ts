import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {IFramework} from "ris-framework-api";
import {vec2} from "gl-matrix";

interface AppStore {
    framework: IFramework | null;




    theme: string;

    setTheme: (theme: string) => void;
    setFramework: (framework: IFramework) => void;

    getResolution: () => vec2 | undefined,
    setResolution: (resolution: vec2) => void;
}



export const useAppStore: UseBoundStore<StoreApi<AppStore>> = create<AppStore>(
    (set, get) => ({


        theme: "light",
        framework: null,


        setTheme: (theme) =>
            set({theme}),

        getResolution: () => get().framework?.renderer.backBufferSize,

        setResolution: (resolution) => {
            const fw = get().framework;

            if(fw){
                fw.renderer.backBufferSize = resolution;
            }
        },

        setFramework: (framework) => set({framework}),


    })
);