import React from 'react'
import Header from '../../containers/User/Header/Header'
import Classes from './BookingLayout.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
const BookingLayout = (props) =>{
    let  userName= 'Sign in';
    if(props.isAuthntcated){
        userName=props.userName 
    }
    return(
        <div>
            <Header isAuth={props.isAuthntcated} username={userName} clicked={props.onUserLogout} locname={props.loctnName} 
                        nearBtnClicked={props.nearByClick} />
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


export default  connect(mapStateToProps,mapDispatchToProps)(BookingLayout)