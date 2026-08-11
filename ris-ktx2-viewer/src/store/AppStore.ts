import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {IKtx2Texture} from "../../../ris-ktx2/dist/ktx-texture-interface";
import type {IFramework, ITexture2D} from "ris-framework-api";
import {Ktx2Loader} from "../../../ris-ktx2/dist";

interface AppStore {
    framework: IFramework | null;
    textures: ITexture2DContainer[];
    selectedTexture: ITexture2DContainer | null;
    getSelectedTexture: () => ITexture2DContainer | null;
    theme: string;
    addTexture: (filePath: File) => void;
    setTheme: (theme: string) => void;
    setFramework: (framework: IFramework) => void;
}

interface ITexture2DContainer {
    name: string;
    texture: ITexture2D | null;
    ktxContainer: IKtx2Texture | null;
}

let ktxLoader: Ktx2Loader | null = null;

async function decodeImage(file: File): Promise<{
    width: number;
    height: number;
    pixels: Uint8Array;
}> {
    const url = URL.createObjectURL(file);

    try {
        const image = new Image();

        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () =>
                reject(new Error(`Failed to decode ${file.name}`));

            image.src = url;
        });

        console.log(
            `Decoded ${file.name}: ${image.naturalWidth}x${image.naturalHeight}`
        );

        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Could not create 2D canvas context");
        }

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        return {
            width: canvas.width,
            height: canvas.height,
            pixels: new Uint8Array(imageData.data),
        };
    } finally {
        URL.revokeObjectURL(url);
    }
}

async function getKtxContainerTexture(file: File): Promise<IKtx2Texture> {

    if(!ktxLoader) {
        ktxLoader = new Ktx2Loader();
        await ktxLoader.initializeAsync();
    }

    return  await ktxLoader.loadAsync(file);
}


export const useAppStore: UseBoundStore<StoreApi<AppStore>> = create<AppStore>(
    (set, get) => ({
        ktxTextures: [],
        textures: [],
selectedTexture: null,
        theme: "light",

        framework: null,

        getSelectedTexture: () => get().selectedTexture,

        setTheme: (theme) =>
            set({theme}),

        setFramework: (framework) => set({framework}),

        addTexture: async (file) => {
            const framework = get().framework;

            if (!framework) {
                throw new Error("Framework has not been initialized");
            }

            const canBeDecoded =
                file.type === "image/png" ||
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/webp";

            if (canBeDecoded) {
                const image = await decodeImage(file);

                const texture = framework.textureFactory.create(
                    image.width,
                    image.height,
                    image.pixels
                );

                const container : ITexture2DContainer = {
                    name: file.name,
                    texture: texture,
                    ktxContainer: null
                }

                // Set as selected texture
                get().selectedTexture = container;

                set((state) => ({
                    textures: [
                        ...state.textures,
                        container,
                    ],
                }));
            } else if(file.name.endsWith(".ktx2")){

                const ktx = await getKtxContainerTexture(file);
                const container : ITexture2DContainer = {
                    name: file.name,
                    texture: null,
                    ktxContainer: ktx
                }

                // Set as selected texture
                get().selectedTexture = container;

                set((state) => ({
                    textures: [
                        ...state.textures,
                        container,
                    ],
                }));
            }
            else {
                throw new Error("Not implemented");
            }

        },
    })
);