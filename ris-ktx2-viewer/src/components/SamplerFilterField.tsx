import {MenuItem, Select, type SelectChangeEvent, Stack, Tooltip, Typography} from "@mui/material";
import {SamplerFilter} from "ris-framework-api";

interface SamplerFilterSelectProps {
    label: string;
    value: SamplerFilter;
    onValueChange: (value: SamplerFilter) => void;
}

export default function SamplerFilterField({
                                               label,
                                               value,
                                               onValueChange,
                                           }: SamplerFilterSelectProps) {

    const handleChange = (e: SelectChangeEvent<SamplerFilter>) => {
        onValueChange(e.target.value as SamplerFilter);
    };

    return (
        <Stack
            direction="column"
            spacing={0}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}
        >
            <Tooltip title="Controls how texture pixels are sampled when the texture is scaled or viewed at different sizes.
                                          Linear filtering produces smoother results, while nearest filtering preserves sharp, pixelated edges.">
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
                <MenuItem value={SamplerFilter.NEAREST}>Nearest</MenuItem>
                <MenuItem value={SamplerFilter.LINEAR}>Linear</MenuItem>
            </Select>
        </Stack>
    );
}
