import {type IFramework, type ISampler, SamplerDescriptor, SamplerFilter} from "ris-framework-api";
import {create, type StoreApi, type UseBoundStore} from "zustand";

interface SamplerStore {
    framework?: IFramework;
    sampler?: ISampler;
    minFilter: SamplerFilter,
    magFilter: SamplerFilter,

    getSampler: () => ISampler | undefined,

    setFramework: (frame: IFramework) => void,
    setSampler: (value: ISampler) => void,
    setMinFilter: (minFilter: SamplerFilter) => void,
    setMagFilter: (magFilter: SamplerFilter) => void,
}

export const useSamplerStore: UseBoundStore<StoreApi<SamplerStore>> = create<SamplerStore>(
    (set, get) => ({

        setFramework: (v) => set({
            framework: v
        }),

        setSampler: (v) => set({
            sampler: v
        }),

        minFilter: SamplerFilter.LINEAR,
        magFilter: SamplerFilter.LINEAR,

        setMinFilter: (v) => {

            const graphicsDevice = get().framework!.graphicsDevice;

            const samplerDesc = new SamplerDescriptor();
            samplerDesc.minFilter = v;
            samplerDesc.magFilter = get().magFilter;
            get().sampler?.dispose();
            set(() => ({
                minFilter :v,
                sampler: graphicsDevice.createSampler(samplerDesc),
            }));
        },

        setMagFilter: (v) => {
            const graphicsDevice = get().framework!.graphicsDevice;

            const samplerDesc = new SamplerDescriptor();
            samplerDesc.magFilter = v;
            samplerDesc.minFilter = get().minFilter;
            get().sampler?.dispose();
            set(() => ({
                magFilter :v,
                sampler: graphicsDevice.createSampler(samplerDesc),
            }));
        },

        getSampler: () => get().sampler
    })
);
