import {Checkbox, Grid, Stack, Typography} from "@mui/material";
import * as React from "react";

/** The checkbox field properties */
interface CheckboxFieldProps {
    /** The label for the checkbox */
    label: string;
    /** The initial value of the checkbox */
    value: boolean;

    /** The callback function to be called when the checkbox value changes */
    onValueChange: (value: boolean) => void;

    /** Whether the checkbox should be displayed in a row or column */
    rowDirection?: boolean;
}

/**
 * The checkbox field which can be displayed in a row or column layout.
 */
export function CheckboxField({ label, value, onValueChange, rowDirection}: CheckboxFieldProps) {

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onValueChange(checked);
    }

    if (rowDirection) {
        return <Grid direction="row" container sx={{
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
                <Checkbox checked={value} onChange={handleChange}
                          sx={{alignSelf: "start", paddingLeft: 0}}/>
            </Grid>
        </Grid>
    } else {
        return <Stack
            direction="column"
            spacing={0}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}>
            <Typography component="span" sx={{opacity: 0.5}}>
                {label}
            </Typography>
            <Checkbox checked={value} onChange={handleChange} sx={{alignSelf: "start"}}/>
        </Stack>
    }
}