import {MenuItem, Paper, Select, Stack, Typography} from "@mui/material";
import {TextureFormat} from "ris-framework-api";
import {useTextureStore} from "../store/TextureStore.ts";
import {VkFormat} from "../../../ris-ktx2-api";

interface TextureFormatSelectProps {
    label: string;
    value: TextureFormat;

    onValueChange: (value: TextureFormat) => void;

    /**
     * If top most, the upper border is rounded.
     */
    topMost?: boolean;

    /**
     * If bottom most, the lower border is rounded.
     */
    bottomMost?: boolean;
}

export default function TextureFormatSelect({label, value, topMost, bottomMost, onValueChange}: TextureFormatSelectProps) {

    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    const handleChange = (e: { target: { value: TextureFormat; }; }) => {
        const newValue = e.target.value as TextureFormat;
        debugger;
        onValueChange(newValue);
    }

    const getSelectedTexture = useTextureStore(state => state.getSelectedTexture);

    const isBasisCompressed = () => getSelectedTexture()?.ktxContainer?.needsTranscoding
        && getSelectedTexture()?.ktxContainer?.vkFormat == VkFormat.UNDEFINED;

    return (
        <Paper
            elevation={3}
            sx={{
                borderTopLeftRadius: topRadius,
                borderTopRightRadius: topRadius,
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
            }}>
            <Stack direction="column"
                   spacing={0}
                   sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}>
                <Typography component="span" sx={{opacity: 0.5}}>
                    {label}
                </Typography>
                <Select
                    value={value}
                    label={label}
                    sx={{ marginTop: 1, marginBottom: 1, height: "40px" }}
                    onChange={handleChange}
                >
                    <MenuItem value={TextureFormat.RGBA_8_UNORM}>RGBA_8_UNORM</MenuItem>
                    {isBasisCompressed() && <MenuItem value={TextureFormat.BC7_RGBA_UNORM}>BC7_RGBA_UNORM</MenuItem>}
                    {isBasisCompressed() && <MenuItem value={TextureFormat.ASTC_4X4_RGBA}>ASTC_4X4_RGBA</MenuItem>}
                </Select>
            </Stack>
        </Paper>
    )
}