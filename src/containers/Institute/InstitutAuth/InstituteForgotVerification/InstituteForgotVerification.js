import React,{Component} from 'react'
import { withRouter } from 'react-router-dom';
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import Classes from './InstituteForgotVerification.module.css'
import OtpInput from 'react-otp-input';
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import InstituteAuthHeader from '../../../../components/InstituteAuthHeader/InstituteAuthHeader'
import Spinner from '../../../../components/UI/Spinner/Spinner'


class InstituteForgotVerification extends Component {
    constructor(props){
        super(props)
            this.state={
            mob:'',
            error:'',
            otp:''
            
             }
    }
   

  componentDidMount(){
    if(this.props.otpData === null){
        
         this.props.history.push('/institute/forgot/password')
       
    }
    else{
      
        const mobileToString = this.props.otpData.mobile.toString()
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
            const otpDet={
                mobile:this.props.otpData.mobile,
                uid:this.props.otpData.uid,
                code:value
                
            }
           this.props.onInstituteForgotVerify(otpDet,this.props.history)
          
           
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

            <InstituteAuthHeader  caption='Business with us'>
            <InstituteLayout head="Verification YesQ Pvt. Ltd." subHead='Please Enter the OTP code send to'> 
            {this.props.error? <div className={Classes.ErrorMsg}>{this.props.error}</div>:<p className={Classes.MobileNoti}>Please Enter the verification code<br/>
                                                send to {'...' + this.state.mob.slice(-4)}</p>}
                <p className={Classes.ErrorMsg}>{this.stateerror}</p>
                {form}
               <div className={Classes.ButtonPad}>
                    <UserButton clicked={this.handleSubmit}>CONTINUE</UserButton>
                </div>
            </InstituteLayout>
            </InstituteAuthHeader>
        </div>
    )
}
}
const mapStateToProps = state =>{
    return{
		instData:state.institute.instituteData,
        otpData:state.institute.otpData,
        loading:state.institute.loading,
        error:state.institute.error
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onInstituteForgotVerify:(values,history)=>dispatch(actions.instituteForgotVerify(values,history))
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InstituteForgotVerification))