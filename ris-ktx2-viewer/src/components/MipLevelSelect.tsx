import {MenuItem, Paper, Select, type SelectChangeEvent, Stack, Typography} from "@mui/material";
import {TextureFormat} from "ris-framework-api";
import {useTextureStore} from "../store/TextureStore.ts";

interface MipLevelSelectProps {
    label: string;
    value: number;
    valueMax: number,
    onValueChange: (value: TextureFormat) => void;
    topMost?: boolean;
    bottomMost?: boolean;
}

export default function MipLevelSelect({
                                                label,
                                                value,
                                                topMost,
                                                bottomMost,
                                                onValueChange,
                                            }: MipLevelSelectProps) {
    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    const mipLevels = useTextureStore((state) => state.mipLevels);

    const levels = [];
    for(let i = 0; i < mipLevels; i++) {
        levels.push(<MenuItem value={i}>{i}</MenuItem>);
    }

    const handleChange = (e: SelectChangeEvent<TextureFormat>) => {
        onValueChange(e.target.value as TextureFormat);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderTopLeftRadius: topRadius,
                borderTopRightRadius: topRadius,
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
            }}
        >
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
                    {levels}
                </Select>
            </Stack>
        </Paper>
    );
}
