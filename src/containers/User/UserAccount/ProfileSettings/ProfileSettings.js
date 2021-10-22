import React, {Component}from 'react'
import Accordian from '../../../../components/UI/Accordian/Accordian'
import UserAccountLayout from '../../../../components/UserAccountLayout/UserAccountLayout'
import Classes from './ProfileSetting.module.css'
import {connect} from 'react-redux'
import axios from 'axios'
import Modals from '../../../../components/UI/Modal/Modal'
import ModalForm from '../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class ProfileSettings extends Component{
    constructor(props){
        super(props)
            this.state={
                passwd:"",
                new_paswd:"",
                confirm_paswd:"",
                passwdError:"",
                newPaswdError:"",
                confirmPasswdEffor:"",
                show:false,
                error:false,
                locatn:"",
                locName:'Near By',
                lat:'',
                lng:'',
                showLoc:false,
                locError:""
            }
    }
    componentDidMount(){
        let lattitude = localStorage.getItem('latitude')
        let longitude =  localStorage.getItem('longitude')
        if((lattitude === null) || (longitude === null) || (lattitude.length === 0) || (longitude.length === 0) ){
            // this.setState({show:true})
           }
        else{
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...',locatn:name})
           
        }
    }
    InputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
  
    validate = () => {
      let passwdError ="";
      let newPaswdError ="";
      let confirmPasswdEffor ="";
       
      if (this.state.passwd && this.state.passwd.length < 6 ){
        passwdError = "Password should be at least 6 characters";
        this.setState({passwdError})
      }
      if (!this.state.passwd){
        passwdError = "Enter your current password";
        this.setState({ passwdError})
      }
      if (this.state.new_paswd && this.state.new_paswd.length < 6 ){
        newPaswdError = "Password should be at least 6 characters";
        this.setState({newPaswdError})
      }
      if (!this.state.new_paswd){
        newPaswdError = "Enter your new password";
        this.setState({ newPaswdError})
      }
      if(this.state.confirm_paswd && this.state.confirm_paswd.length > 5 && this.state.confirm_paswd !== this.state.new_paswd){
        confirmPasswdEffor = "Password do not match";
        this.setState({confirmPasswdEffor})
    }
      if (this.state.confirm_paswd && this.state.confirm_paswd.length < 6 ){
        confirmPasswdEffor = "Password should be at least 6 characters";
        this.setState({confirmPasswdEffor})
      }
      if (!this.state.confirm_paswd){
        confirmPasswdEffor = "Type your password again";
        this.setState({ confirmPasswdEffor})
      }
     if (passwdError || newPaswdError || confirmPasswdEffor)  {
            this.setState({ passwdError,newPaswdError,confirmPasswdEffor});
            return false;
          }
          return true
    }
    handleClose = () => {
        this.setState({show:false})
    }
    handleShow = () => {
      this.setState({show:true})
  };
    handleSubmit = (e) =>{
        e.preventDefault()
        const isValidate =this.validate()
        if(isValidate){
            this.setState({passwdError:"",newPaswdError:"",confirmPasswdEffor:""})
        const inputs = {currentPassword:this.state.passwd.trim(),confirmPassword:this.state.new_paswd.trim(),uid:this.props.uid}
       
        axios.post("/user/change/password",inputs)
        .then(response=>{
            this.setState({show:true, passwd:"",new_paswd:"",confirm_paswd:"",error:""})
        })
        .catch((err) =>{
            this.setState({error:err.response.data})
           
        })
        }

    }
    handleLocClose = () =>{
        this.setState({showLoc:false})
        this.setState({locError:""})
    }
    locHandleChange = locatn =>{
        this.setState({locatn})
     
    }
    locValidate = () =>{
        let locError=""
        if (!this.state.locatn) {
         locError = "required";
         this.setState({locError})
        }
         if(locError){
             this.setState({locError})
             return false
         }
         return true
    }
      handleSelect = async (locatn) => {
       this.setState({ locatn });
       const results = await geocodeByAddress(locatn);
       const latLng = await getLatLng(results[0]);
       this.setState({lat:latLng.lat,lng:latLng.lng})
       };
     locationSubmit = () =>{
        const isLocValidate =this.locValidate()
        if(isLocValidate){
            this.setState({locError:""})
            localStorage.setItem('location',this.state.locatn)
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...'})
            this.setState({showLoc:false})
            localStorage.setItem('latitude',this.state.lat)
            localStorage.setItem('longitude',this.state.lng)
        }
      
    //    window.location.reload();
    }
    nearBtnClickHandlr = () =>{
        this.setState({showLoc:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
           }
       
    }

    render(){
        let form =(
            <div>
              <div className={Classes.SerErrorMsg}>{this.state.error}</div>
            <form autoComplete='off' className={Classes.FormPad}>
              
                 <div className="form-group">
                           <div className="row rowpad" >
                                <label htmlFor='orgName' className="col-md-4 control-label form-items nopadright" style={style.LabelInput}>Enter Your Password:</label>
                                    <div className="col-md-8">
                                        <input type="text" name="passwd" value={this.state.passwd} className="form-control nopadleft" style={style.ResetInput} onChange={this.InputChangeHandler} />
                                        <div className={Classes.ErrorMsg}>{this.state.passwdError}</div>
                                    </div>
                            </div>
                        </div>
                        <div className="form-group">
                           <div className="row rowpad" >
                                <label htmlFor='orgName' className="col-md-4 control-label form-items nopadright" style={style.LabelInput}>New Password:</label>
                                    <div className="col-md-8">
                                        <input type="text" name="new_paswd" value={this.state.new_paswd} className="form-control nopadleft" style={style.ResetInput} onChange={this.InputChangeHandler} />
                                        <div className={Classes.ErrorMsg}>{this.state.newPaswdError}</div>
                                    </div>
                            </div>
                        </div>
                        <div className="form-group">
                           <div className="row rowpad" >
                                <label htmlFor='orgName' className="col-md-4 control-label form-items nopadright" style={style.LabelInput}>Confirm Password:</label>
                                    <div className="col-md-8 ">
                                        <input type="text" name="confirm_paswd" value={this.state.confirm_paswd} className="form-control nopadleft" style={style.ResetInput} onChange={this.InputChangeHandler} />
                                        <div className={Classes.ErrorMsg}>{this.state.confirmPasswdEffor}</div>
                                    </div>
                            </div>
                        </div>
                        <button className={Classes.BtnStyle} onClick={this.handleSubmit}>Submit</button>
                    
                 </form>
                 </div>

        )
        return(
            <React.Fragment>
                 < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='SUCCESS!' body='Your Password Changed Successfully!'/>
                 < ModalForm shows={this.state.showLoc} hide={this.handleLocClose} closeBtn={this.handleLocClose} heading='Add your location!'
                    location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                    label='Select your location for better experience' errorMsg={this.state.locError}/>
                 <UserAccountLayout head='Edit Profile' nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName}>
                        <div style={style.AccrdianMarg}>
                            < Accordian firstKey="0" title="Change Password" body={form}/>
                         </div>
                </UserAccountLayout>
                
            </React.Fragment>
        )
    }
}
const style={
    AccrdianMarg:{
        marginTop:'25px'
    },
    ResetInput:{
        border: '1px solid #D6D3D3',
     },
    
     LabelInput:{
         fontSize:'15px',
     },


}
const mapStateToProps = state =>{
    return{
		uid:state.user.tokenId
       }
}
export default connect(mapStateToProps)(ProfileSettings)