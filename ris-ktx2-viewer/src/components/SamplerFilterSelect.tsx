import {MenuItem, Paper, Select, Stack, Typography} from "@mui/material";
import {SamplerFilter} from "ris-framework-api";

interface SamplerFilterSelectProps {
    label: string;
    value: SamplerFilter;

    onValueChange: (value: SamplerFilter) => void;

    /**
     * If top most, the upper border is rounded.
     */
    topMost?: boolean;

    /**
     * If bottom most, the lower border is rounded.
     */
    bottomMost?: boolean;
}

export default function SamplerFilterSelect({label, value, topMost, bottomMost, onValueChange}: SamplerFilterSelectProps) {

    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    const handleChange = (e: { target: { value: SamplerFilter; }; }) => {
        const newValue = e.target.value as SamplerFilter;
        onValueChange(newValue);
    }

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
                    <MenuItem value={SamplerFilter.NEAREST}>Nearest</MenuItem>
                    <MenuItem value={SamplerFilter.LINEAR}>Linear</MenuItem>
                </Select>
            </Stack>
        </Paper>
    )
}