import React, { Component } from 'react'
import { Link,withRouter } from "react-router-dom"
import Userlayout from '../../../../components/UserLayout/UserLayout'
import axios from 'axios'
import Classes from './UserSignInBook.module.css'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import Modals from '../../../../components/UI/Modal/Modal'
import ModalFail from '../../../../components/UI/ModalFail/ModalFail'
import * as actions from '../../../../store/actions/index'

import Spinner from '../../../../components/UI/Spinner/Spinner'
class UserSignInBook extends Component{
    constructor(props){
        super(props)
            this.state={
                user_id:"",
                user_passwd:"",
                mobileError:"",
                passwordError:"",
                 error:"",
                 loading:false,
                 show:false,
                 showFail:false,
                 age:'',
                 counter:'',
                 istid:'',
                 institute:'',
                 mobile:'',
                 name:'',
                 date:'',
                 slot_id:'',
                 time:'',
                 counter_name:''
                 }
    }
    componentDidMount(){
        if(this.props.tokenDetails === null){
            this.props.history.push('/signin')
        }
        else{
            axios.post("/institute/update/counter",{id:this.props.location.state.detail.counter})
            .then(response=>{
               this.setState({counter_name:response.data.DISPLAY_NAME
               })
                
            }).catch((err) =>
            {
                 console.log(err.response)
            })
            this.setState({age:this.props.location.state.detail.age,counter:this.props.location.state.detail.counter,institute:this.props.location.state.detail.institute,
                istid:this.props.location.state.detail.istid,mobile:this.props.location.state.detail.mobile,name:this.props.location.state.detail.name,date:this.props.location.state.detail.slot.date,
                slot_id:this.props.location.state.detail.slot.slot_id,time:this.props.location.state.detail.slot.time,token_no:this.props.location.state.detail.slot.token_no})
        }
       
    }
  
    successHandleClose = () =>{
        this.setState({show:false})
      }
      successHandleUpdated = () =>{
        this.props.history.push('/user/mytokens')
      
      }
      FailHandleClose = () =>{
        this.setState({showFail:false})
      }
      FailHandleUpdated = () =>{
       this.props.history.goBack() 
    }
    inputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    validate = () => {
      
        let mobileError="";
       let passwordError="";

     
        if (!this.state.user_passwd) {
            passwordError = "This field is required";
            this.setState({passwordError})
        }
        if((this.state.user_passwd) && (this.state.user_passwd.length<6)){
            passwordError = "Password should be at least 6 characters";
            this.setState({passwordError})

        }
        if (!this.state.user_id) {
            mobileError = "This field is required";
            this.setState({ mobileError})
        }
        if ((this.state.user_id) && (this.state.user_id.length<10 || this.state.user_id.length>10)) {
            mobileError = "Mobile number should be 10 digits";
            this.setState({mobileError})
          }
        if (passwordError || mobileError)  {
            this.setState({passwordError,mobileError});
            return false;
          }
        
          return true
      
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const isValidate =this.validate()
        if(isValidate){
            this.setState({loading:true})
            this.setState({passwordError :""})
            this.setState({mobileError :""})
            const inputs={mobile:this.state.user_id.trim(),password:this.state.user_passwd.trim()}
           axios.post("/signin",inputs)
                .then(response=>{
                    this.setState({loading:false,user_id:"",user_passwd:""})
                    localStorage.setItem('token',response.data.uid)
                    localStorage.setItem('name',response.data.name)
                    const user = response.data.name
                    const token = response.data.uid
                    this.props.onSignIn(token,user)
                    const tokenDetail = {uid:response.data.uid,age:this.state.age,counter:this.state.counter,institute:this.state.institute,
                        istid:this.state.istid,mobile:this.state.mobile,name:this.state.name,slot:{date:this.state.date,slot_id:this.state.slot_id,time:this.state.time,token_no:this.state.token_no}}
                      
                            axios.post("/user/generate/token",tokenDetail)
                            .then(response=>{
                               if(response.data.status){
                                    this.setState({show:true})
                                   
                                }
                                else{
                                     this.setState({showFail:true})
                                }
                            
                            
                            
                            }).catch((err) =>
                            {
                                console.log(err.response)
                            })
                               
                               
                }).catch((err) =>
                {
                    this.setState({loading:false})
                    console.log(err.response)
                    this.setState({error:err.response.data.errMsg})
                })
        }
    }
   
	
    render(){
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<label htmlFor="mobNum" className="input-label">Mobile Number</label>
					<input type='text'
						   name="user_id"
						   value={this.state.user_id}
                           onChange={this.inputChangeHandler}
						  
						    className="form-control"
							style={style.Input} />
                             <div className={Classes.ErrorMsg}>{this.state.mobileError}</div>
                            
			</div>
			<div className={Classes.FormGroup} >
						<label htmlFor="pswd" className="input-label">Password</label>
							<input type="password"
								name="user_passwd"
								value={this.state.user_passwd}
                                onChange={this.inputChangeHandler}
						     
								className="form-control textbox"
								style={style.Input} />
                                <div className={Classes.ErrorMsg}>{this.state.passwordError}</div>
			</div>
		</form>
	);
	if(this.state.loading){
		form = <Spinner/>
	}
    return (
        <div>
            <Userlayout head="SIGN IN" st={Classes.MainPad}>
               
            < Modals shows={this.state.show} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!'
              body={'Your Booking is confirmed at'+ this.state.institute+ ',counter:'+this.state.counter_name+ ' Token No:' + (this.state.token_no) + ' Date:'  + this.state.date + ' Time:' + this.state.time}
             />
             < ModalFail shows={this.state.showFail} hide={this.FailHandleClose} closeBtn={this.FailHandleUpdated} heading='Failed!'
             body={'Your are already booked in this slot!'}/>
			<div className={Classes.ServerErrorMsg}>{this.state.error}</div>
            {form}
            <p className={Classes.ForgotHead}><Link to='/forgot_password'>Forgot Password?</Link></p>
            <UserButton clicked={this.handleSubmit}>SIGN IN</UserButton>
            <p className={Classes.SignUpHead}>You don't have an account?<span className={Classes.SignUpLink}><Link to='/signup'>Sign up!</Link></span></p>
            </Userlayout>
        </div>
    )
}
    
}

const style ={
	Input:{
		paddingLeft: '10px',
        fontWeight: '500',
		backgroundColor: 'rgb(244, 244, 244)',
		borderColor: 'rgb(240, 240, 240)',
		}
}
const mapStateToProps = state =>{
    return{
        tokenDetails:state.user.tokenDetails
		
	}
}
const mapDispatchToProps = dispatch =>{
    return{
     
     onSignIn: (token,user) =>dispatch(actions.user_signin_success(token,user))
    }
    
  }



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserSignInBook))
