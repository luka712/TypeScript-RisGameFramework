import { MenuItem, Paper, Select, type SelectChangeEvent, Stack, Typography} from "@mui/material";

interface StringSelectProps {
    label: string;
    value: string;
    options: string[];
    onValueChange: (value: string) => void;
    topMost?: boolean;
    bottomMost?: boolean;
}

export default function StringSelect({
                                                label,
                                                value,
                                                topMost,
                                                bottomMost,
                                                onValueChange,
    options,
                                            }: StringSelectProps) {
    const topRadius = topMost ? 20 : 0;
    const bottomRadius = bottomMost ? 20 : 0;

    const handleChange = (e: SelectChangeEvent<string>) => {
        onValueChange(e.target.value);
    };

    const elemOptions = options.map((opt) => ( <MenuItem key={opt} value={opt}> {opt} </MenuItem> ));

    return (
        <Paper
            elevation={3}
            sx={{
                borderTopLeftRadius: topRadius,
                borderTopRightRadius: topRadius,
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
            }}
        >
            <Stack
                direction="column"
                spacing={0}
                sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1}}
            >
                <Typography component="span" sx={{opacity: 0.5}}>
                    {label}
                </Typography>
                <Select
                    value={value}
                    label={label}
                    sx={{marginTop: 1, marginBottom: 1, height: "40px"}}
                    onChange={handleChange}
                >
                    {elemOptions}
                </Select>
            </Stack>
        </Paper>
    );
}
