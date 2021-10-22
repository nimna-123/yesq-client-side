import classes from './InstituteAuthHeader.module.css'
import React from 'react'
import Logo from '../../assets/images/yesqLogo.png'

const InstituteAuthHeader = (props) =>{
    return(
       <div className={classes.HeadPosition}>
             <div className={classes.InstituteHead}>
                <img src={Logo} alt='logo' width='110px' height='40px'/>
                    <p className={classes.SignInCaptn}>{props.caption}</p>
             </div>
            <div className='container'>
                {props.children}
            </div> 
        </div> 
    )
}

export default InstituteAuthHeader