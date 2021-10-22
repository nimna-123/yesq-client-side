import React from 'react'
import Classes from './UserAccountLayout.module.css'
import Header from '../../containers/User/Header/Header'
import {withRouter} from 'react-router-dom'
import {GiToken} from "react-icons/gi"
import {AiOutlineLogout} from "react-icons/ai"
// import {AiFillSetting} from "react-icons/ai"
// import {FaUserEdit} from 'react-icons/fa'
// import {FaUserAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import FooterBootom from  '../../components/Footer/FooterBootom/FooterBottom'


const UserAccountLayout = (props) =>{
    let  userName= 'Sign in';
    if(props.isAuthntcated){
        userName=props.userName
    }
    const instituteSignUpHandler = () =>{
        props.history.push('/institute_register')
    }
    return(
        <div>
            <Header isAuth={props.isAuthntcated} username={userName} clicked={props.onUserLogout} locname={props.loctnName} 
                        nearBtnClicked={props.nearByClick} />
            <div className={Classes.BgColor}>
                 <div className={Classes.MainPad}>
                    <div className='container'>
                        <div className='row'>
                             <div className='col-md-4 '>
                                    <div className={Classes.UserAccnt}>
                                            <p className={Classes.UserAccntHead}>{userName}</p>
                                                <ul className={Classes.ProfListItems}>
                                                    {/* <li><Link to='/user/profile' className={Classes.UserProfNav}><FaUserAlt color='white' size='30px' /><span className={Classes.ProfileListItem}>Profile</span></Link></li> */}
                                                    {/* <li><Link to='/user/edit/profile' className={Classes.UserProfNav}><FaUserEdit color='white' size='30px' /><span className={Classes.ProfileListItem}>Edit Profile</span></Link></li>
                                                    <li><Link to='/user/settings' className={Classes.UserProfNav}><AiFillSetting color='white' size='30px'/><span className={Classes.ProfileListItem}>Settings</span></Link></li> */}
                                                    <li><Link to='/user/mytokens' className={Classes.UserProfNav}><GiToken color='white' size='30px' /><span className={Classes.ProfileListItem}>My Tokens</span></Link></li>
                                                    <li><Link to='' className={Classes.UserProfNav} onClick={props.onUserLogout}><AiOutlineLogout color='white' size='30px'/><span className={Classes.ProfileListItem}>Logout</span></Link></li>
                                                </ul>
                                        </div>
                                </div>
                                <div className='col-md-8'>
                                        <div className={Classes.UserAccntDetail}>
                                            <div className={Classes.UserAcntDetailHead}>
                                                <h3>{props.head}</h3>
                                            </div>
                                            {props.children}
                                          
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className={Classes.FooterBottom}>
                <FooterBootom clicked={instituteSignUpHandler}/>
            </div>
        </div>
         
        

    )
} 
const mapStateToProps = state =>{
    return{
		isAuthntcated: state.user.tokenId !== null,
        userName: state.user.userName,
       
       }
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserLogout:()=>dispatch(actions.userLogout())
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserAccountLayout))