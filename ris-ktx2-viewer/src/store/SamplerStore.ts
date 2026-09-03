import {type IFramework, type ISampler, MipMapSamplerFilter, SamplerDescriptor, SamplerFilter} from "ris-framework-api";
import {create} from "zustand";

interface SamplerStore {
    framework: IFramework | null;
    sampler: ISampler | undefined;
    filter: SamplerFilter;

    getSampler: () => ISampler | undefined;
    setFramework: (framework: IFramework) => void;
    setFilter: (filter: SamplerFilter) => void;
}

function createSampler(
    framework: IFramework,
    filter: SamplerFilter,
    previous?: ISampler,
): ISampler {
    previous?.dispose();

    const descriptor = new SamplerDescriptor();
    descriptor.minFilter = filter;
    descriptor.magFilter = filter;
    descriptor.mipMapFilter = filter == SamplerFilter.LINEAR ? MipMapSamplerFilter.LINEAR : MipMapSamplerFilter.NEAREST;
    return framework.graphicsDevice.createSampler(descriptor);
}

export const useSamplerStore = create<SamplerStore>((set, get) => ({
    framework: null,
    sampler: undefined,
    filter: SamplerFilter.LINEAR,

    getSampler: () => get().sampler,

    setFramework: (framework) => {
        const { filter, sampler} = get();
        set({
            framework,
            sampler: createSampler(framework, filter, sampler),
        });
    },

    setFilter: (filter) => {
        const {framework, sampler} = get();
        if (!framework) {
            return;
        }

        set({
            filter,
            sampler: createSampler(framework, filter, sampler),
        });
    }
}));
