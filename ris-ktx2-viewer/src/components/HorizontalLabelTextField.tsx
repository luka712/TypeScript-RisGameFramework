import {Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

export interface HorizontalLabelTextFieldProps {
    label: string;
    text: string;
}

export function HorizontalLabelTextField({label, text}: HorizontalLabelTextFieldProps) {
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
                <TextField defaultValue={text}/>
            </Grid>
        </Grid>
    )
}