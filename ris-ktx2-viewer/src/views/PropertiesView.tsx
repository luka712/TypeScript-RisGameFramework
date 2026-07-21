import {Container, Divider, Paper} from "@mui/material";
import FormTextBlock from "../components/FormTextBlock.tsx";

interface PropertiesViewProps {
    properties: { name: string, value: string }[];
}

/**
 * Takes a list of generic properties like values (name, value) and display them.
 * @constructor
 */
export default function PropertiesView({properties}: PropertiesViewProps) {


    if (!properties || properties.length === 0) {
        return <Paper>
            <Container>
            </Container>
        </Paper>
    }

    const isSingle = properties.length === 1;
    const firstProperty = properties[0];
    const first = <FormTextBlock label={firstProperty.name} text={firstProperty.value} topMost={true} bottomMost={isSingle}/>

    const elements = [first];
    for (let i = 1; i < properties.length; i++) {
        const isLast = i === properties.length - 1;
        elements.push(<Divider />);
        elements.push(<FormTextBlock label={properties[i].name} text={properties[i].value} bottomMost={isLast}/>)
    }

    return (
        <Container>
                {elements}
        </Container>
    )

}
