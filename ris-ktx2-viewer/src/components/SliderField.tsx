import { Grid, Slider, Stack, Typography} from "@mui/material";
import type {SyntheticEvent} from "react";

/** The checkbox field properties */
interface SliderFieldProps {
    /** The label for the slider */
    label: string;

    /** The initial value of the slider */
    value: number;

    /** The callback function to be called when the slider value changes */
    onValueChange: (value: number) => void;

    /** The minimum value of the slider */
    min?: number;

    /** The maximum value of the slider */
    max?: number;

    /** Whether the checkbox should be displayed in a row or column */
    rowDirection?: boolean;
}

/**
 * The checkbox field which can be displayed in a row or column layout.
 */
export function SliderField({label, value, onValueChange, min, max, rowDirection}: SliderFieldProps) {

    min = min ?? 0;
    max = max ?? 100;

    const handleChange = (_: Event | SyntheticEvent, v: number) => {
        onValueChange(v);
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
                <Stack direction="row" spacing={2}>
                <Slider min={min}
                        max={max}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        sx={{alignSelf: "start", paddingLeft: 0}}/>
                </Stack>
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
            <Slider min={min}
                    max={max}
                    value={value}
                    onChange={handleChange} sx={{alignSelf: "start"}}/>
        </Stack>
    }
}