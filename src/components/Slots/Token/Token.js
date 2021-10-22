import React from 'react'
import Classes from './Token.module.css'
const Token = (props) =>{
    return(
        <div className={Classes.TokenPad}>
            <div className={Classes.TokenLayout}>
                <h5 className={Classes.TokenName}>{props.tokenTime}</h5> 
            </div>
        </div>

    )
}
export default Token