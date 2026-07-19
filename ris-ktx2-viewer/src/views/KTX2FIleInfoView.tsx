import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Provides the info about KTX2 texture container file.
 * @constructor
 */
export default function KTX2FIleInfoView() {

    const id = React.useId();
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                >
                    <Typography component="span">KTX2 data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" spacing={2}>
                            <Typography component="span">KTX2 version</Typography>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography component="span">0.1.0</Typography>
                        </Stack>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
