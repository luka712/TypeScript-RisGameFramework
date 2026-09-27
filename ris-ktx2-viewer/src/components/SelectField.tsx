import {Grid, MenuItem, Select, type SelectChangeEvent, Stack, Tooltip, Typography} from "@mui/material";

interface SelectFieldProps {
    label: string;
    value: string;
    options: string[];
    onValueChange: (value: string) => void;
    isHorizontal?: boolean;
    labelTooltip?: string;
    valueTooltip?: string;
}

export default function SelectField({
                                        label,
                                        value,
                                        onValueChange,
                                        options,
                                        isHorizontal,
                                        labelTooltip,
                                        valueTooltip,
                                    }: SelectFieldProps) {

    const handleChange = (e: SelectChangeEvent<string>) => {
        onValueChange(e.target.value);
    };

    const elemOptions = options.map((opt) => (<MenuItem key={opt} value={opt}> {opt} </MenuItem>));


    if (isHorizontal) {
        return (
            <Grid direction="row" container sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
                  spacing={0}>
                <Grid size={4}>
                    <Tooltip title={labelTooltip}>
                    <Typography component="span" sx={{opacity: 0.75}}>
                        {label}
                    </Typography>
                    </Tooltip>
                </Grid>
                <Grid size={8}>
                    <Select
                        value={value}
                        label={label}
                        sx={{marginTop: 1, marginBottom: 1, height: "40px"}}
                        onChange={handleChange}
                        fullWidth={true}
                        title={valueTooltip}
                    >
                        {elemOptions}
                    </Select>
                </Grid>
            </Grid>
        );
    }

    return (<Stack
        direction="column"
        spacing={0}
        sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}
    >
        <Tooltip title={labelTooltip}>
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
            {elemOptions}
        </Select>
    </Stack>)


}
