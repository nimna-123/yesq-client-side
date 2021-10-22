import React from 'react'
import './AdminLayout.css'
import { Link,withRouter } from "react-router-dom"
import InstituteButton from '../UI/Button/InstituteButton/InstituteButton'
import adminLogo from '../../assets/images/yesqLogowhite.png'
import Arrow from '../../assets/images/arrow.png'
import { CgMenuGridR } from "react-icons/cg";
import { FaExpand } from "react-icons/fa";
import {AiOutlineLine} from "react-icons/ai"

import {HiUsers} from "react-icons/hi"

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


const AdminLayout = (props) =>{
    const logoutHandler =() =>{
        props.adminLogout()
        props.history.push('/admin_login')

    }
    return(
        <div className='container-fluid'>
            <div className='row'>
                    <div className=' SideBox nopad'>
                        <div className='AdminlogoPad'>
                            <img src={adminLogo} alt='adminlogo' width='120px' className='img-fluid AdminLogo'/>
                        </div>
                        <div className='OrgCaptionBg'>
                            <h4><Link to='/admin_home' className='OrgCaption'>Organization</Link></h4>
                        </div>
                        <div className="Nav">
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="B"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="B" className="MargLabel"><CgMenuGridR color='white' size='23px'/>&nbsp;&nbsp;&nbsp;users</label>
                                            <ul >
                                                <li><Link to='/admin/list/users' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;View </Link></li>
                                               
                                               
                                            </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item ">
                                    <input type="checkbox" id="C"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                        <label htmlFor="C" className="MargLabel"><FaExpand color='white' size='21px'/>&nbsp;&nbsp;&nbsp;Institute</label>
                                    <ul >
                                        <li><Link to='/admin/list/institute' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;View</Link></li>
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12 Items nopadmar">
                                <div className="Item">
                                    <input type="checkbox" id="A"/>
                                        <img src={Arrow} className="Arrow" alt='arrow'/>
                                            <label htmlFor="A" className="MargLabel"><HiUsers color='white' size='23px'/>&nbsp;&nbsp;&nbsp;Professionals</label>
                                            <ul >
                                                <li><Link to='/admin/list/professional' className="MargSublabel"><AiOutlineLine color='white' size='15px'/>&nbsp;&nbsp;&nbsp;View</Link></li>
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
		adminLogout:()=>dispatch(actions.adminLogout())
	}
}
export default withRouter(connect(null,mapDispatchToProps)(AdminLayout))