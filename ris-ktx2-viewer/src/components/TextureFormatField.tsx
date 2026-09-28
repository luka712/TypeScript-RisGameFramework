import {MenuItem, Select, type SelectChangeEvent, Stack, Tooltip, Typography} from "@mui/material";
import {TextureFormat} from "ris-framework-api";
import {useTextureStore} from "../store/TextureStore.ts";
import {VkFormat} from "ris-ktx2-api";
import {useAppStore} from "../store/AppStore.ts";

interface TextureFormatSelectProps {
    label: string;
    value: TextureFormat;
    onValueChange: (value: TextureFormat) => void;
}

export default function TextureFormatField({
                                                label,
                                                value,
                                                onValueChange,
                                            }: TextureFormatSelectProps) {



    const selectedTexture = useTextureStore((state) => state.selectedTexture);
    const ktx = selectedTexture?.ktxContainer;
    const isBasisCompressed =
        Boolean(ktx?.needsTranscoding) && ktx?.vkFormat === VkFormat.UNDEFINED;

    const bc7 = useAppStore(state => state.supportsBC7);
    const bc3 = useAppStore(state => state.supportsBC3);
    const astc = useAppStore(state => state.supportsASTC);
    const etc2 = useAppStore(state => state.supportsETC2);

    const handleChange = (e: SelectChangeEvent<TextureFormat>) => {
        onValueChange(e.target.value as TextureFormat);
    };

    return (
        <Stack
            direction="column"
            spacing={0}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}
        >
            <Tooltip
                title="Specifies the GPU texture format used to display the texture. Compressed formats reduce memory usage, at the expense of quality.">
                <Typography component="span" sx={{opacity: 0.5}}>
                    {label}
                </Typography>
            </Tooltip>
            <Select
                value={value}
                label={label}
                sx={{marginTop: 1, marginBottom: 1, height: "40px"}}
                onChange={handleChange}
            >
                <MenuItem value={TextureFormat.RGBA_8_UNORM}>RGBA_8_UNORM</MenuItem>
                {isBasisCompressed && bc7 && (
                    <MenuItem value={TextureFormat.BC7_RGBA_UNORM}>BC7_RGBA_UNORM</MenuItem>
                )}
                {isBasisCompressed && astc && (
                    <MenuItem value={TextureFormat.ASTC_4X4_RGBA}>ASTC_4X4_RGBA</MenuItem>
                )}
                {isBasisCompressed && bc3 && (
                    <MenuItem value={TextureFormat.BC3_RGBA_UNORM}>BC3_RGBA_UNORM</MenuItem>
                )}
                {isBasisCompressed && etc2 && (
                    <MenuItem value={TextureFormat.ETC2_RGBA8_UNORM}>ETC2_RGBA8_UNORM</MenuItem>
                )}
            </Select>
        </Stack>
    );
}
