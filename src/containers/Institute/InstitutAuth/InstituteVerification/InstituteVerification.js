import React,{ Component} from 'react'
import { withRouter } from 'react-router-dom';
import InstituteAuthHeader from '../../../../components/InstituteAuthHeader/InstituteAuthHeader'
import OtpInput from 'react-otp-input';
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'
class InstituteVerification extends Component{
    constructor(props){
        super(props)
            this.state={
           mob:'',
           error:'',
           otp:''
            
             }
    }
   
  
componentDidMount(){
        if(this.props.instData === null){ 
           
            this.props.history.push('/institute/forgot/password')
         
        }
        else{
           
            const mobileToString = this.props.instData.mobile.toString()
            this.setState({mob:mobileToString})

        }

    }
     handleChange = otp => 
    {
        this.setState({otp:otp})
    }
     handleSubmit = (event) =>
    {
        event.preventDefault()
        const value = this.state.otp
        const valueLength = value.length
        if(valueLength === 6)
        {
            const otpDet={
                mobile:this.props.instData.mobile,
                uid:this.props.instData.uid,
                otp:value
                
            }
        
           this.props.onInstituteVerify(otpDet,this.props.history)
           
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
                inputStyle={style.CodeBox}
                containerStyle={style.OtpBsox}
                />
        </form>
    );
    if(this.props.loading){
        form = <Spinner/>
    }
    
    return(
    <InstituteAuthHeader  caption='Business with us'>
         <InstituteLayout head="Verification YesQ Pvt. Ltd." >
            {this.props.error? <p style={style.ErrorMsg}>{this.props.error}</p>:<p style={style.MobileNoti}>Please Enter the verification code<br/>
                                                send to {'...' + this.state.mob.slice(-4)}</p>}
            <p style={style.ErrorMsg}>{this.state.error}</p>
                 {form}
                <div style={style.ButtonPad}>
                    <UserButton clicked={this.handleSubmit} >CONTINUE</UserButton>
                </div>
        </InstituteLayout>
    </InstituteAuthHeader>
    )
}
}
const style={
    disply:{
        display: 'none'
    },
    CodeBox:{
        width: '100%',
        height: '50px',
        border:'1px solid #d7d7d7',
        fontSize: '20px',
        padding: '10px',
        marginLeft: '5px',
        marginRight: '5px',
        outline: 'none',
        backgroundColor:'#eef0f8'
    },
    OtpBsox:{
        marginLeft: '0px'
        
    },
    ButtonPad:{
        paddingTop: '30px'
    },
    ErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'center',
        fontSize: '14px',
        marginBottom:'25px',
        marginTop:'10px'
    },
    MobileNoti:{
        color: '#6e6e69',
        textAlign: 'center',
        fontSize: '15px',
        marginTop: '20px',
        marginBottom: '20px'
    }
}
const mapStateToProps = state =>{
    return{
		instData:state.institute.instituteData,
        loading:state.institute.loading,
        error:state.institute.error
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onInstituteVerify:(values,history)=>dispatch(actions.instituteVerify(values,history))
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InstituteVerification))