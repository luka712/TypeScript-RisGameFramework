import {Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";

export interface HorizontalLabelTextFieldProps {
    label: string;
    text: string;
    onValueChange: (value: string) => void;
}

export function HorizontalLabelTextField({label, text, onValueChange}: HorizontalLabelTextFieldProps) {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.target.value);
    }

    return (
        <Grid direction="row" container sx={{
            justifyContent: "center",
            alignItems: "center",
        }}
              spacing={0}>
            <Grid size={4}>
                <Typography sx={{opacity: 0.75}}>
                    {label}
                </Typography>
            </Grid>
            <Grid size={8}>
                <TextField defaultValue={text} onChange={onChange} fullWidth={true} />
            </Grid>
        </Grid>
    )
}