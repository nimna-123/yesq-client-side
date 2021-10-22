import React from 'react'
import {Link} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Classes from './SideDrawer.module.css'
import UserProfile from '../../../assets/images/userProfile.png'
import CloseIcon from  '../../../assets/images/closeIcon.png'
import {GiToken} from "react-icons/gi"
import {AiOutlineLogout} from "react-icons/ai"
// import {AiFillSetting} from "react-icons/ai"
import {FaTelegramPlane} from "react-icons/fa"



const SideDrawer = (props) =>{
    let attachedClass = [Classes.SideDrawer,Classes.Close]
    if(props.open){
        attachedClass = [Classes.SideDrawer,Classes.Open]
    }
    return(
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
                <div className={attachedClass.join(' ')}>
                    <div className='row' style={style.Border}>
                        <div className='c0l-4'>
                            <div className={Classes.Profile}>
                                <img src={ UserProfile} alt='user' width='45px' height='45px'/>
                            </div>
                        </div>
                        <div className='col-6 nopadright'>
                            {props.isAuthnticated?<h3 className={Classes.ProfileHead}>{props.user}</h3>: <Link to='/signin' className={Classes.ProfileHead}>{props.user}</Link>}
                            <p className={Classes.ProfileSubcap}> You dont have an account?<Link to='/signup' className={Classes.ProfilecapSignup}>  Signup</Link></p>
                        </div>
                        <div className='col-2'>
                            <img src={CloseIcon} alt='closeIcon' onClick={props.closed} />
                        </div>
                    </div>
                    <nav>
                        {props.isAuthnticated?
                         <ul className={Classes.ProfNavItems}>
                            {/* <li className={Classes.Border}><img src={UserProfile} alt='accnt' width='30px' className={Classes.ListPad}/><Link to='/user/profile' className={Classes.ProfileList}>My Account</Link></li> */}
                            <li className={Classes.Border}><GiToken color='white' size='30px' className={Classes.ListPad}/><Link to='/user/mytokens'><span className={Classes.ProfileList}>My Tokens</span></Link></li>
                            {/* <li className={Classes.Border}><AiFillSetting color='white' size='30px' className={Classes.ListPad}/><Link to='/user/settings'><span className={Classes.ProfileList}>Settigs</span></Link></li> */}
                            <li className={Classes.Border} onClick={props.nearByClicked}><FaTelegramPlane color='white' size='30px' className={Classes.ListPad}/><span className={Classes.ProfileList}>Near By</span></li>
                            <li className={Classes.Border} ><Link to='' onClick={props.click}><AiOutlineLogout color='white' size='30px' className={Classes.ListPad}/><span className={Classes.ProfileList}>Logout</span></Link></li>
                         </ul>:
                        <ul className={Classes.ProfNavItems}>
                            <li className={Classes.Border}><img src={UserProfile} alt='accnt' width='30px' className={Classes.ListPad}/><Link to='/signin' className={Classes.ProfileList}>My Account</Link></li>
                            <li className={Classes.Border}><GiToken color='white' size='30px' className={Classes.ListPad}/><Link to='/signin' className={Classes.ProfileList}>My Tokens</Link></li>
                            <li className={Classes.Border} onClick={props.nearByClicked}><FaTelegramPlane color='white' size='30px' className={Classes.ListPad}/><span className={Classes.ProfileList}>Near By</span></li>
                          
                        </ul>}
                   </nav>
                 </div>
        </React.Fragment>
    )
}
const style={
    Border:{
        borderBottom: '1px solid #d4e9de',
        marginRight: '0px',
        marginLeft: '0px'
    }
}
export default SideDrawer
