import {useAppStore} from "../store/AppStore.ts";
import { Divider, Paper, Typography} from "@mui/material";
import {SimpleTreeView, TreeItem} from "@mui/x-tree-view";


/**
 * The drop area component.
 * @constructor
 */
export default function Ktx2TextureList() {

    const ktx2Textures = useAppStore(state => state.ktxTextures);

    let id = 1;
    const listTextures = ktx2Textures.map(ktx => {

        const _id = (id++).toString();

        return {
            id: _id,
            label: _id + ". " + (ktx.filePath ?? "Unknown"),
            ktxTexture: ktx
        }
    });

    // If there are no textures return empty component.
    if(listTextures.length === 0) {
        return (<Paper elevation={3}></Paper>)
    }

    return (

        <Paper elevation={3} sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

            <Typography sx={{ p: 2 }} variant={"h6"}>
                Textures
            </Typography>

            <Divider />
            <SimpleTreeView>
                {
                    listTextures.map(tex => (
                        <TreeItem itemId={tex.id} label={tex.label}/>
                    ))
                }
            </SimpleTreeView>
        </Paper>
    );
}