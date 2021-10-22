import React from 'react'
import HeaderFilterPage from '../../containers/User/Header/HeaderFilterPage/HeaderFilterPage'
import Classes from './BookingLayoutFilter.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
const BookingLayoutFilter = (props) =>{
    let  userName= 'Sign in';
    if(props.isAuthntcated){
        userName=props.userName 
    }
    return(
        <div>
            <HeaderFilterPage isAuth={props.isAuthntcated} username={userName} clicked={props.onUserLogout} locname={props.loctnName} 
                        nearBtnClicked={props.nearByClick} locatn={props.searchLocName} locChange={props.searchLocChange}  locSelect={props.searchLocSelect} keyChang={props.searchKeyChange} searchClick={props.searchBtnClick} serchKey={props.searchWrd}/>
                <div className={Classes.DoctBg}>
                    <div className={Classes.MainPad}>
                        <div className={Classes.SerachSecton}>
                            <h3>BOOK AN APPOINTMENT</h3>
                                <div className={Classes.Doctpad}>
                                    <div className={Classes.SerachSubSecton}>
                                        {props.children}
                                    </div>
                                </div>
                        </div> 
                        
                    </div>
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


export default  connect(mapStateToProps,mapDispatchToProps)(BookingLayoutFilter)