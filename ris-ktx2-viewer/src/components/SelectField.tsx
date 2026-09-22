import {Grid, MenuItem, Select, type SelectChangeEvent, Typography} from "@mui/material";

interface SelectFieldProps {
    label: string;
    value: string;
    options: string[];
    onValueChange: (value: string) => void;
}

export default function SelectField({
                                                        label,
                                                        value,
                                                        onValueChange,
                                                        options,
                                                    }: SelectFieldProps) {

    const handleChange = (e: SelectChangeEvent<string>) => {
        onValueChange(e.target.value);
    };

    const elemOptions = options.map((opt) => (<MenuItem key={opt} value={opt}> {opt} </MenuItem>));

    return (
        <Grid direction="row" container sx={{
            justifyContent: "center",
            alignItems: "center",
        }}
              spacing={0}>
            <Grid size={4}>
                <Typography component="span" sx={{opacity: 0.75}}>
                    {label}
                </Typography>
            </Grid>
            <Grid size={8}>
                <Select
                    value={value}
                    label={label}
                    sx={{marginTop: 1, marginBottom: 1, height: "40px"}}
                    onChange={handleChange}
                    fullWidth={true}
                >
                    {elemOptions}
                </Select>
            </Grid>
        </Grid>
    );
}
