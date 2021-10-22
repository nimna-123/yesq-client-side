import React,{Component} from 'react'
import UserLayout from '../../../../components/UserLayout/UserLayout'
import Classes from './UserForgotVerification.module.css'
import OtpInput from 'react-otp-input';
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class UserRegVerification extends Component{
    constructor(props){
        super(props)
            this.state={
           mob:'',
           error:'',
           otp:''
            
             }
    }
    componentDidMount(){
        if(this.props.userVerify === null){ 
            console.log('hai');
            this.props.history.push('/forgot_password')
         
        }
        else{
            console.log('hello')
            const mobileToString = this.props.userVerify.mobile.toString()
            this.setState({mob:mobileToString})

        }

    }
     handleChange = otp => 
    {
       this.setState({otp:otp})
    }
     handleSubmit = (event,onSubmitprops) =>
    {
        event.preventDefault()
        const value = this.state.otp
        const valueLength = value.length
        if(valueLength === 6)
        {   
            const otpDet = {
                mobile:this.props.userVerify.mobile,
                uid:this.props.userVerify.uid,
                otp:value
            
            }
            this.props.onUserForgotVerfi(otpDet,this.props.history)
           
        }
        else
        {
            this.setState({error:'Enter Valid Otp'})
           
            
        }
  
}
    render(){
    let form = (
		<form >
            <OtpInput
                 value={this.state.otp}
                onChange={this.handleChange}
                numInputs={6}
                separator={<span></span>}
                isInputNum="true"
                inputStyle={Classes.CodeBox}
                containerStyle={Classes.OtpBsox}
                />
        </form>
    );
    if(this.props.loading){
		form = <Spinner/>
	}
    return (
        <div>
            <UserLayout head="VERIFICATION" st={Classes.MainPad}>
              
                <p className={Classes.ErrorMsg}>{this.state.error}</p>
                {this.props.error? <p className={Classes.ErrorMsg}>{this.props.error}</p>:<p className={Classes.mobileNoti}>Please Enter the verification code<br/>
                                                send to {'...' + this.state.mob.slice(-4)}</p>}
                
                {form}
                <div className={Classes.ButtonPad}>
                <UserButton clicked={this.handleSubmit}>CONTINUE</UserButton>
                </div>
            </UserLayout>
        </div>
    )
}
}

const mapStateToProps = state =>{
    return{
		error:state.user.error,
		loading: state.user.loading,
        userData:state.user.userData,
        userVerify:state.user.userVerify
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserForgotVerfi:(otpDet,history)=>dispatch(actions.userForgotVerfi(otpDet,history))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(UserRegVerification) 
