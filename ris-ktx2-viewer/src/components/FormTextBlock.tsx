import { Paper, Stack, Typography} from "@mui/material";

interface FormTextBlockProps {
    label: string;
    text: string;
    /**
     * If top most, the upper border is rounded.
     */
    topMost?: boolean;

    /**
     * If bottom most, the lower border is rounded.
     */
    bottomMost?: boolean;
}

export default function FormTextBlock({label, text, topMost, bottomMost}: FormTextBlockProps) {

    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    return (
        <Paper
            elevation={3}
            sx={{
            borderTopLeftRadius : topRadius,
            borderTopRightRadius : topRadius,
            borderBottomLeftRadius : bottomRadius,
            borderBottomRightRadius : bottomRadius,
        }}>
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
        </Paper>
    )
}