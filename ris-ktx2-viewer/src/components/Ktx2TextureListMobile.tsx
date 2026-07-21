import {useAppStore} from "../store/AppStore.ts";
import {Accordion, AccordionDetails, AccordionSummary, List, Stack, Typography} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormTextBlock from "./FormTextBlock.tsx";


/**
 * The drop area component.
 * @constructor
 */
export default function Ktx2TextureListMobile() {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const ktx2Textures = useAppStore(state => state.ktxTextures);

    let id = 0;
    const listTextures = ktx2Textures.map(ktx => {
        return {
            id: (id++).toString(),
            ktxTexture: ktx
        }
    });

    return (

        <Stack direction="column" spacing={2}>
            <List>
                {
                    listTextures.map(tex => (
                        <Accordion expanded={expanded === tex.id} onChange={handleChange(tex.id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={`${tex.id}-panel-content`}
                                id={`${tex.id}-panel-header`}>
                                <Typography component="span">{tex.id}. {tex.ktxTexture.filePath}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                                    <FormTextBlock label="Width" text={tex.ktxTexture.width.toString()}/>
                                    <FormTextBlock label="Height" text={tex.ktxTexture.height.toString()}/>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </List>
        </Stack>
    );
}