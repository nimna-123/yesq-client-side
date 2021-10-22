import React from 'react'
import Classes from './Accordian.module.css'
import {Accordion,Card,Button} from 'react-bootstrap'
const Accordian = (props) =>{
    return(
        <Accordion >
            <Card>
                <Card.Header>
                     <Accordion.Toggle as={Button} variant="link" eventKey={props.firstKey} className={Classes.AccrLink}>{props.title}</Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.firstKey}>
                     <Card.Body>{props.body}</Card.Body>
                 </Accordion.Collapse>
             </Card>
        </Accordion>

    )
}
export default Accordian