import {MenuItem, Select, type SelectChangeEvent, Stack, Typography} from "@mui/material";
import {TextureFormat} from "ris-framework-api";
import {useTextureStore} from "../store/TextureStore.ts";
import {VkFormat} from "ris-ktx2-api";

interface TextureFormatSelectProps {
    label: string;
    value: TextureFormat;
    onValueChange: (value: TextureFormat) => void;
}

export default function TextureFormatSelect({
                                                label,
                                                value,
                                                onValueChange,
                                            }: TextureFormatSelectProps) {

    const selectedTexture = useTextureStore((state) => state.selectedTexture);
    const ktx = selectedTexture?.ktxContainer;
    const isBasisCompressed =
        Boolean(ktx?.needsTranscoding) && ktx?.vkFormat === VkFormat.UNDEFINED;

    const handleChange = (e: SelectChangeEvent<TextureFormat>) => {
        onValueChange(e.target.value as TextureFormat);
    };

    return (
        <Stack
            direction="column"
            spacing={0}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}
        >
            <Typography component="span" sx={{opacity: 0.5}}>
                {label}
            </Typography>
            <Select
                value={value}
                label={label}
                sx={{marginTop: 1, marginBottom: 1, height: "40px"}}
                onChange={handleChange}
            >
                <MenuItem value={TextureFormat.RGBA_8_UNORM}>RGBA_8_UNORM</MenuItem>
                {isBasisCompressed && (
                    <MenuItem value={TextureFormat.BC7_RGBA_UNORM}>BC7_RGBA_UNORM</MenuItem>
                )}
                {isBasisCompressed && (
                    <MenuItem value={TextureFormat.ASTC_4X4_RGBA}>ASTC_4X4_RGBA</MenuItem>
                )}
            </Select>
        </Stack>
    );
}
