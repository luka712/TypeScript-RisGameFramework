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

/**
 * Footer strip showing selected texture metrics.
 */
export function FooterView() {

    const mapVkFormat = {
        [VkFormat.R8G8B8A8_UNORM] : "R8G8B8A8_UNORM",
        [VkFormat.ASTC_4X4_UNORM_BLOCK]: "ASTC_4X4_UNORM_BLOCK",
        [VkFormat.BC7_UNORM_BLOCK]: "BC7_UNORM_BLOCK",
    }

    const resolution = useTextureStore((store) => store.resolution);
    const mipLevels = useTextureStore((store) => store.mipLevels);
    const memory = useTextureStore((store) => store.size);
    const ktx2Format = useTextureStore((store) => {
        const ktx2 = store.selectedTexture?.ktxContainer;
        if(ktx2?.vkFormat == VkFormat.UNDEFINED && ktx2.needsTranscoding) {
            return "Universal Basis";
        }
        else if(ktx2?.vkFormat){
            return mapVkFormat[ktx2.vkFormat];
        }
        return  null;
    });
    const ktx2 = useTextureStore((store) => store.selectedTexture?.ktxContainer);

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,
                paddingBottom: 2,
            }}
        >
            <Stack direction="row" spacing={2.5} sx={{justifyContent: "flex-end"}}>
                <FooterStat label="Resolution" value={resolution}/>
                <FooterStat label="Mip Levels" value={mipLevels}/>
                <FooterStat label="GPU Memory" value={memory}/>
                {ktx2 && <FooterStat label="Ktx2 Format" value={ktx2Format}/>}
            </Stack>
        </Paper>
    );
}
