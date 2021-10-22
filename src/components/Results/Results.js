import React from 'react'
import {Card} from 'react-bootstrap'
import Classes from './Results.module.css'
const Results = (props) =>{
    return(
        <div className={Classes.Box}>
            <Card style={props.bgClr} className={Classes.Card} >
               <div className={Classes.CardBody} >
                        <Card.Title className={Classes.Title}>{props.resltname}</Card.Title>
                            <Card.Text className={Classes.SubTitle}>
                            {props.resCount}
                            </Card.Text>
                    </div>
            </Card>
        </div>

    )
}
export default Results