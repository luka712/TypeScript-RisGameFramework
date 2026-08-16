import {Checkbox, Paper, Stack, Typography} from "@mui/material";
import * as React from "react";


interface GenerateMipmapsSelectProps {
    label: string;
    value: boolean;

    onValueChange: (value: boolean) => void;

    /**
     * If top most, the upper border is rounded.
     */
    topMost?: boolean;

    /**
     * If bottom most, the lower border is rounded.
     */
    bottomMost?: boolean;
}

export function GenerateMipmapsSelect({label, value, topMost, bottomMost, onValueChange}: GenerateMipmapsSelectProps) {

    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onValueChange(checked);
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
                <Checkbox checked={value} onChange={handleChange} sx={{alignSelf: "start"}} />
            </Stack>
        </Paper>
    )
}