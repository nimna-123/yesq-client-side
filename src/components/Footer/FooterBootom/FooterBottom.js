import React from 'react'
import Classes from './FooterBottom.module.css'
import yesqLogo from '../../../assets/images/yesqLogowhite.png'
import Facebook from '../../../assets/images/socialicon/facebook.png'
import Whatsapp from '../../../assets/images/socialicon/whatsapp.png'
import Twiter from '../../../assets/images/socialicon/twiter.png'


const FooterBottom = (props) =>{
    return(
        <React.Fragment>
        <div className={Classes.FooterBottom}>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={Classes.FooterbtmPad}>
                    <img src={yesqLogo} alt='footerlogo' className={Classes.FootLogo}/>
                    <p className={Classes.footerBtmHead}>Level - 3 Mashriq Complex Stadium Jn Calicut</p>
                    {/* <p className={Classes.FooterContact}>+91 8111819460&nbsp;&nbsp;&nbsp; contact@yesq.in</p> */}
                    <p className={Classes.FooterContact}>Register Your Organization on YesQ</p>
                    <button onClick={props.clicked} className={Classes.InstituteRegister}> Register</button>
                </div>
            </div>
        </div>
        <div className={Classes.FooterBtm}>
            <div className={Classes.SocialIcons}>
                <p>Copyright © 2021 Yesq Pvt. Ltd</p>
                <ul className={Classes.SocialIcons}>
                    <li><img src={Facebook} alt='facebook' className={Classes.SocialIcon}/></li>
                    <li><img src={Whatsapp} alt='whatsapp' className={Classes.SocialIcon}/></li>
                    <li><img src={Twiter} alt='twitter' className={Classes.SocialIcon}/></li>
                </ul>
                <p>Privacy Policy Terms & Conditions</p>
            </div>
         </div>
    </React.Fragment>
    )
}
export default FooterBottom