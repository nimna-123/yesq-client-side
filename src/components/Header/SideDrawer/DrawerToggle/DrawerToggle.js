import React from 'react'
import Classes from './DrawerToggle.module.css'
const DrawerToggle = (props) =>{
    return(
        <div className={Classes.DrawerToggle} onClick={props.clicked}>
             <div className={Classes.LineTop}></div>
             <div className={Classes.LineMiddle}></div>
             <div className={Classes.LineBottom}></div>
        </div>
    )
}
export default DrawerToggle