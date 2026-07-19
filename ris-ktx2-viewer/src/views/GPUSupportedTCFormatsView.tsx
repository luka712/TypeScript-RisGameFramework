import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {IFramework} from "ris-game-framework/src/interfaces/IFramework.ts";

interface GPUSupportedTCFormatsViewProps {
    framework: IFramework;
}


/**
 * The view for all available texture formats and also highlights if they're supported or not.
 * @constructor
 */
export default function GPUSupportedTCFormatsView({framework}: GPUSupportedTCFormatsViewProps) {

    const id = React.useId();

    const gpuFeatures = framework.graphicsDevice.features;

    const formats = [
        {
            name: "ASTC",
            supported: gpuFeatures.supportsTextureCompressionASTC
        },
        {
            name: "ETC2",
            supported: gpuFeatures.supportsTextureCompressionETC2
        },
        {
            name: "BC",
            supported: gpuFeatures.supportsTextureCompressionBC
        },
        {
            name: "S3TC",
            supported: gpuFeatures.supportsTextureCompressionS3TC
        },
        {
            name: "PVRTC",
            supported: gpuFeatures.supportsTextureCompressionPVRTC
        }
    ];

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                >
                    <Typography component="span">GPU Texture Compression Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {formats.map((format) => (
                            <ListItem key={format.name}>
                                <Typography component="span">
                                    {format.supported ? "✓" : "✗"} {format.name}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
