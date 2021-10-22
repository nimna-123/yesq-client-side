import classes from './InstituteHeader.module.css'
import React from 'react'
import Logo from '../../assets/images/yesqLogo.png'

const InstituteHeader = (props) =>{
    return(
       
            <div>
                <div className={classes.HeaderShadow}>
                    <div className='container'>
                        <div className={classes.HeaderPad}>
                            <ul className={classes.LogoAlign}>
                                <li> <img src={Logo} alt='logo' width='110px' height='40px'/></li>
                                <li className={classes.SignInCap}>{props.caption}</li>
                                <li className={classes.SignInButton} onClick={props.clicked} style={props.st}>sign in</li>
                            </ul>
                            <ul className={classes.LogoAlignMob}>
                                <li> <img src={Logo} alt='logo' width='110px' height='40px'/></li>
                                <li className={classes.SignInButtonMob} onClick={props.clicked} style={props.st}>sign in</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    {props.children}
                </div> 
            </div>

    )
}

export default InstituteHeader