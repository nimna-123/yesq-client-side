import React from 'react'
import './InstituteHomeLayout.css'
import { Link,withRouter } from "react-router-dom"
import InstituteButton from '../../components/UI/Button/InstituteButton/InstituteButton'
import adminLogo from '../../assets/images/yesqLogowhite.png'
import Arrow from '../../assets/images/arrow.png'
import { CgMenuGridR } from "react-icons/cg";
import { FaExpand } from "react-icons/fa";
import {AiOutlineLine} from "react-icons/ai"
import {GiToken} from "react-icons/gi"
import {HiUsers} from "react-icons/hi"
import {BsFillLockFill} from "react-icons/bs"
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


const InstituteHomeLayout = (props) =>{
    const logoutHandler =() =>{
        props.onInstLogout()
        props.history.push('/institute/login')

    }
    return(
        <div className='container-fluid'>
            <div className='row'>
                    <div className=' SideBox nopad'>
                        <div className='AdminlogoPad'>
                            <img src={adminLogo} alt='adminlogo' width='120px' className='img-fluid AdminLogo'/>
                        </div>
                        <div className='OrgCaptionBg'>
                            <h4><Link to='/institute/home' className='OrgCaption'>Organization</Link></h4>
                        </div>
                        <div className="Nav">
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="B"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="B" className="MargLabel"><CgMenuGridR color='white' size='23px'/>&nbsp;&nbsp;&nbsp;General</label>
                                            <ul >
                                                <li><Link to='/institute/home' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;View Profile</Link></li>
                                                <li><Link to='/institute/edit/profile' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Edit Profile</Link></li>
                                               
                                            </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item ">
                                    <input type="checkbox" id="C"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                        <label htmlFor="C" className="MargLabel"><FaExpand color='white' size='21px'/>&nbsp;&nbsp;&nbsp;Counter</label>
                                    <ul >
                                        <li><Link to='/institute/list/counter' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Counters</Link></li>
                                        <li><Link to='/institute/create/counter' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Create Counter</Link></li>
                                        <li><Link to='/institute/counter/add/slot' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Add Slot</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="A"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="A" className="MargLabel"><GiToken color='white' size='23px'/>&nbsp;&nbsp;&nbsp;Token</label>
                                            <ul >
                                                <li><Link to='/institute/active/tokens' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Booked Tokens</Link></li>
                                            </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="D"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="D" className="MargLabel"><HiUsers color='white' size='23px'/>&nbsp;&nbsp;&nbsp;Professionals</label>
                                            <ul >
                                                <li><Link to='/institute/view/professionals' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Professionals</Link></li>
                                                <li><Link to='/institute/register/professional' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Register professional</Link></li>
                                            </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="E"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="E" className="MargLabel"><BsFillLockFill color='white' size='23px'/>&nbsp;&nbsp;&nbsp;Security</label>
                                            <ul >
                                                <li><Link to='/institute/change/password' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;Change Password</Link></li>
                                            
                                            </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className=' MainMarg  '>
                        <div className='AdminBg '>
                                <div className='Headers'>
                                    <div className='LogoutButn'>
                                        <InstituteButton clicked={logoutHandler}>Logout</InstituteButton>
                                    </div>
                                </div>
                            <div className='CardPad'>
                                <div className='MainCard'>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                        <div className='InstituteFooter'>
                            <p>YesQ Experts Pvt. Ltd.</p>
                         </div>
                </div>
        </div>
       
    </div>
    )
}

const mapDispatchToProps = dispatch =>{
	return{
		onInstLogout:()=>dispatch(actions.instituteLogout())
	}
}
export default withRouter(connect(null,mapDispatchToProps)(InstituteHomeLayout))