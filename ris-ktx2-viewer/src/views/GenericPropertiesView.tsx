import {Container, Divider, Paper} from "@mui/material";
import FormTextBlock from "../components/FormTextBlock.tsx";

interface PropertiesViewProps {
    properties: { name: string; value: string }[];
}

/**
 * Renders a vertical stack of name/value property rows.
 */
export default function GenericPropertiesView({properties}: PropertiesViewProps) {
    if (!properties || properties.length === 0) {
        return (
            <Container/>
        );
    }


    return (
        <Paper elevation={3}
               sx={{
                   borderTopLeftRadius: 20,
                   borderTopRightRadius: 20,
                   borderBottomLeftRadius: 20,
                   borderBottomRightRadius: 20,
               }}>
            {properties.map((property, index) => (
                <div key={`${property.name}-${index}`}>
                    {index > 0 && <Divider/>}
                    <FormTextBlock
                        label={property.name}
                        text={property.value}
                        topMost={index === 0}
                        bottomMost={index === properties.length - 1}
                    />
                </div>
            ))}
        </Paper>
    );
}
