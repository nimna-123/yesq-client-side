import React from 'react'
import Classes from './Days.module.css'
const Days = (props) =>{
    return(
    <div className='col-lg-3 col-md-4 col-sm-4 col-4 HosNopadleft'>
        <div className={Classes.Box} onClick={props.clicked}>
            <div className='d-flex justify-content-center align-items-center'>
            <h5 className={Classes.DayName}>{props.day}</h5>
            </div>

        </div>

    </div>
    )

}
export default Days