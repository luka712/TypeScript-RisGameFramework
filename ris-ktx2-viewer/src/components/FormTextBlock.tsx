import { Paper, Stack, Typography} from "@mui/material";

interface FormTextBlockProps {
    label: string;
    text: string;
}

export default function FormTextBlock({label, text}: FormTextBlockProps) {


    return (
            <Stack direction="column"
                   spacing={0}
                   sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}>
                <Typography component="span" sx={{ opacity: 0.5}}>
                    {label}
                </Typography>
                <Typography component="span" variant={"h6"}>
                    {text}
                </Typography>
        </Stack>
    )
}