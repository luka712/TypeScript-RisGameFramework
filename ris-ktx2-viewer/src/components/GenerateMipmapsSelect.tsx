import {Checkbox, Stack, Typography} from "@mui/material";
import * as React from "react";


interface GenerateMipmapsSelectProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export function GenerateMipmapsSelect({label, value, onValueChange}: GenerateMipmapsSelectProps) {

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onValueChange(checked);
    }

    return (

            <Stack direction="column"
                   spacing={0}
                   sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}>
                <Typography component="span" sx={{opacity: 0.5}}>
                    {label}
                </Typography>
                <Checkbox checked={value} onChange={handleChange} sx={{alignSelf: "start"}} />
            </Stack>
    )
}