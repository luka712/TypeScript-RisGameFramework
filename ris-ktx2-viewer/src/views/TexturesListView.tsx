import AddFileButton from "../components/AddFileButton.tsx";
import TextureList from "../components/TextureList.tsx";
import ConvertDialog from "../dialog/ConvertDialog.tsx";
import {Stack} from "@mui/material";

export function TexturesListView() {

    return (
        <Stack direction="column" spacing={2} sx={{marginLeft: 2, marginRight: 2}}>
            <AddFileButton/>
            <TextureList/>
            <ConvertDialog/>
        </Stack>
    )
}