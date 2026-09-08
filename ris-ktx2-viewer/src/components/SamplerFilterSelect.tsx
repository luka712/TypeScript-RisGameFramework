import {MenuItem, Paper, Select, type SelectChangeEvent, Stack, Typography} from "@mui/material";
import {SamplerFilter} from "ris-framework-api";

interface SamplerFilterSelectProps {
    label: string;
    value: SamplerFilter;
    onValueChange: (value: SamplerFilter) => void;
}

export default function SamplerFilterSelect({
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
                <Typography component="span" sx={{opacity: 0.5}}>
                    {label}
                </Typography>
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
