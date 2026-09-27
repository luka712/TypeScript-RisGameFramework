import {useAppStore} from "../store/AppStore.ts";
import {useMemo} from "react";
import {Box, Stack} from "@mui/material";
import GenericPropertiesView from "./GenericPropertiesView.tsx";

export function GpuPropertiesView() {

    const framework = useAppStore(store => store.framework);

    // Use memo will cache results between re-renders
    const gpuProperties = useMemo(
        () =>
            framework
                ? [
                    {name: "GPU Vendor", value: framework.renderer.graphicsDevice.gpuInfo.vendor},
                    {name: "GPU", value: framework.renderer.graphicsDevice.gpuInfo.name},
                ]
                : [],
        [framework],
    );

    const gpuFeatures = useMemo(() => {
        if (!framework) {
            return [];
        }

        const features = framework.renderer.graphicsDevice.features;
        const supported = (value: boolean) => (value ? "Supported" : "Not Supported");

        return [
            {name: "S3TC Texture Compression (BC1-BC3)", value: supported(features.supportsTextureCompressionS3TC)},
            {name: "BPTC Texture Compression (BC6-BC7)", value: supported(features.supportsTextureCompressionBC)},
            {name: "ETC2 Texture Compression", value: supported(features.supportsTextureCompressionETC2)},
            {name: "ASTC Texture Compression", value: supported(features.supportsTextureCompressionASTC)},
            {name: "PVRTC Texture Compression", value: supported(features.supportsTextureCompressionPVRTC)},
        ];
    }, [framework]);

    return(
        <Stack direction="column" spacing={2} sx={{marginLeft: 2, marginRight: 2}}>
            {framework ? (
                <>
                    <GenericPropertiesView properties={gpuProperties}/>
                    <GenericPropertiesView properties={gpuFeatures}/>
                </>
            ) : (
                <Box sx={{p: 2}}>Initializing GPU…</Box>
            )}
        </Stack>
    )

}