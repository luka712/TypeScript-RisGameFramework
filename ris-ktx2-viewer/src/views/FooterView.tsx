import {Paper, Stack, Typography} from "@mui/material";
import {useTextureStore} from "../store/TextureStore.ts";
import {VkFormat} from "ris-ktx2-api";

function FooterStat({label, value}: {label: string; value: string | number}) {
    return (
        <Stack spacing={0.25} sx={{alignItems: "center"}}>
            <Typography
                variant="caption"
                sx={{opacity: 0.6, fontSize: 11, lineHeight: 1.2}}
            >
                {label}
            </Typography>
            <Typography variant="body2" sx={{fontSize: 13, lineHeight: 1.2}}>
                {value}
            </Typography>
        </Stack>
    );
}

function formatVkFormat(vk: VkFormat): string {
    const known: Partial<Record<VkFormat, string>> = {
        [VkFormat.R8G8B8A8_UNORM]: "R8G8B8A8_UNORM",
        [VkFormat.ASTC_4X4_UNORM_BLOCK]: "ASTC_4X4_UNORM_BLOCK",
        [VkFormat.BC7_UNORM_BLOCK]: "BC7_UNORM_BLOCK",
    };
    return known[vk] ?? VkFormat[vk] ?? `Unknown (${vk})`;
}

/**
 * Footer strip showing selected texture metrics.
 */
export function FooterView() {

    const resolution = useTextureStore((store) => store.resolution);
    const memory = useTextureStore((store) => store.size);
    const ktx2Format = useTextureStore((store) => {
        const ktx2 = store.selectedTexture?.ktxContainer;
        if (ktx2?.vkFormat == VkFormat.UNDEFINED && ktx2.needsTranscoding) {
            return "Universal Basis";
        } else if (ktx2?.vkFormat) {
            return formatVkFormat(ktx2.vkFormat);
        }
        return null;
    });

    const selectedTexture = useTextureStore((store) => store.selectedTexture);

    const ktx2 = selectedTexture?.ktxContainer;
    const mipLevels = selectedTexture?.texture?.mipLevels ?? 0;

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 10,
                px: {xs: 1, sm: 2},
                py: 2,
            }}
        >
            <Stack
                direction="row"
                spacing={2.5}
                useFlexGap
                sx={{
                    justifyContent: {xs: "flex-start", sm: "flex-end"},
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <FooterStat label="Resolution" value={resolution}/>
                <FooterStat label="Mip Levels" value={mipLevels}/>
                <FooterStat label="GPU Memory" value={memory}/>
                {ktx2 && <FooterStat label="Ktx2 Format" value={ktx2Format ?? "—"}/>}
            </Stack>
        </Paper>
    );
}
