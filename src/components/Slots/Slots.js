import React from 'react'
import Classes from './Slots.module.css'


const Slots = (props) =>{
    return(
        <div > 
            <ul className={Classes.Slots}>
               <li><img src={`/uploads/professional_dp/${props.profImg}`} className={Classes.ProfImg} alt='profImg'/></li>
                <li><span className={Classes.ProfName}>{props.profName}</span></li>
             </ul>
             {props.children}

        </div>
    )
}
export default Slots