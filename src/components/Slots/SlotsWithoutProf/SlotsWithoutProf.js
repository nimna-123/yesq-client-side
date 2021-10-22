import React from 'react'
import Classes from './SlotsWithoutProf.module.css'
const SlotsWithoutProf = (props) =>{
    return(
        <div className='row'>
            <div className={Classes.SlotName}>
                <h6>{props.slotName}</h6>
                {props.children}
            </div>
        </div>
    )
}
export default SlotsWithoutProf