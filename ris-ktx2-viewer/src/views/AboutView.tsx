import {Paper, Stack} from "@mui/material";
import TextBlockField from "../components/TextBlockField.tsx";
import AboutDialog from "../dialog/AboutDialog.tsx";

export function AboutView() {

    const text = "A browser-based KTX2 viewer and converter for inspecting, compressing, and converting GPU textures."

    return (
        <Stack direction="column" spacing={2} sx={{marginLeft: 2, marginRight: 2}}>

            <Paper elevation={3}
                   sx={{
                       borderTopLeftRadius: 20,
                       borderTopRightRadius: 20,
                       borderBottomLeftRadius: 20,
                       borderBottomRightRadius: 20,
                   }}>

                <TextBlockField label="About" text={text}/>
            </Paper>
            <AboutDialog/>
        </Stack>
    );
}