import React, { Component } from 'react';
import Classes from './InstituteProfessionalRegister.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import Modals from '../../../../components/UI/Modal/Modal'
import axios from 'axios'
class InstituteProfessionalRegister extends Component{
    constructor(props) {
        super(props);
        this.state= {
            full_name:"",
            email:"",
            mobile:"",
            address:"",
            state:"",
            pincode:"",
            gender:"MALE",
            password:"",
            district:"",
            country:"",
            service_status:"ACTIVE",
            remarks:"NA",
            education:"",
            selectedFile:null,
            nameError: "",
            emailError:"",
            mobileError:"",
            passwordError:"",
            addressError:"",
            locationError:"",
            districtError:"",
            stateError:"",
            pincodeError:"",
           countryError:"",
           show:false,
           profeError:"",
           profDp:"",
           educationError:"",
           speciality:"",
           specialityError:""
};
    }
   
     handleUpdated = () =>{
        this.setState({show:false})
     }
     handleClose = () => {
        this.setState({show:false})
     }
    handleShow = () => {
        this.setState({show:true})
     };
     InputChangeHamdler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
 
    fileSelectHandler = (event) =>{
        this.setState({
            selectedFile:event.target.files[0],
            profDp:'validate'
            
        })
    }
    validate = () => {
        let nameError = "";
        let emailError = "";
        let mobileError="";
        let passwordError = "";
        let addressError = "";
        let districtError = "";
        let stateError = "";
        let pincodeError = "";
        let countryError = "";
        let profeError = "";
        let educationError="";
        let specialityError="";

        if (!this.state.full_name) {
            nameError = "This field is required";
            this.setState({nameError})
          }
        if (!this.state.email.includes("@")) {
            emailError = "Enter valid email address";
            this.setState({emailError})
          }
      
          if (!this.state.mobile) {
            mobileError = "Enter valid mobile number";
            this.setState({mobileError})
          }
         
          if ((this.state.mobile) && (this.state.mobile.length<10 || this.state.mobile.length>10)) {
            mobileError = "Mobile number should be 10 characters";
            this.setState({mobileError})
          }
          
          if (this.state.password && this.state.password.length < 6 ){
            passwordError = "Password should be at least 6 characters";
            this.setState({passwordError})
          }
          if (!this.state.password){
            passwordError = "Enter password";
            this.setState({passwordError})
          }
         if (!this.state.address) {
            addressError = "Enter company address";
            this.setState({addressError})
          }
          if (!this.state.district) {
            districtError = "Enter district";
            this.setState({districtError})
          }
          if (!this.state.state) {
            stateError = "Enter state";
            this.setState({stateError})
          }
          if (!this.state.country) {
            countryError = "Enter state";
            this.setState({countryError})
          }
          if (!this.state.pincode) {
            pincodeError = "Enter pincode";
            this.setState({pincodeError})
          }
          if (!this.state.education) {
            educationError = "Enter Educational details";
            this.setState({educationError})
          }
          if (!this.state.speciality) {
            specialityError = "This field is required";
            this.setState({specialityError})
          }
          if (!this.state.profDp) {
            profeError = "select your profile photo";
            this.setState({profeError})
          }
       
          
          if ((this.state.pincode) && (!this.state.pincode.match(/^\d+/))) {
            pincodeError = "Pincode must be numerical value";
            this.setState({pincodeError})
          }
          if (emailError || nameError || mobileError || passwordError || pincodeError || stateError || districtError || addressError || countryError || profeError || educationError || specialityError)  {
            this.setState({ emailError, nameError,mobileError,passwordError,pincodeError ,stateError,districtError,addressError,countryError,profeError,educationError,specialityError});
            return false;
          }
          return true
      
    }
    handleSubmit = (e) =>{
        e.preventDefault();
       const isValidate =this.validate()
        if(isValidate){
            this.setState({nameError :""})
            this.setState({emailError :""})
            this.setState({mobileError:""})
            this.setState({mobileError:""})
            this.setState({countryError:""})
            this.setState({passwordError :""})
            this.setState({addressError : ""})
            this.setState({districtError : ""})
            this.setState({stateError : ""})
            this.setState({pincodeError : ""})
            this.setState({educationError : ""})
            this.setState({specialityError:""})
            this.setState({profeError : ""})
            let formData = new FormData()
            formData.append('profDp',this.state.selectedFile) 
            formData.append('email',this.state.email.trim())
            formData.append('gender',this.state.gender.trim())
            formData.append('name',this.state.full_name.trim())
            formData.append('address',this.state.address.trim())
            formData.append('state',this.state.state.trim())
            formData.append('district',this.state.district.trim())
            formData.append('country',this.state.country.trim())
            formData.append('pincode',this.state.pincode.trim())
            formData.append('phone',this.state.mobile.trim())
            formData.append('status',this.state.service_status.trim())
            formData.append('remarks',this.state.remarks.trim())
            formData.append('password',this.state.password.trim())
            formData.append('education',this.state.education.trim())
            formData.append('speciality',this.state.speciality.trim())
            const config = {

                headers:{
                    'content-type':'multipart/form-data'
                }
            }
            axios.post("/api/institute/register/professional",formData,config)
            .then(response=>{
               this.setState({show:true,email:"",full_name:"",address:"",state:"",district:"",country:"",pincode:"",mobile:"",remarks:"",password:"",profDp:"",education:"",speciality:""})
               
            }).catch((err) =>
            {
                  console.log(err.response)
            })
        }
    }
                                                   
    render(){
        let form =(
            <form className={Classes.FormPad} autoComplete='off' > 
                <div className='row'>
                    <div className='col-md-6'>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="full_name" className={Classes.InputLabel}>Full name</label>
                                                <input 
                                                    type='text'
                                                    name="full_name"
                                                    className="form-control"
                                                    style={style.Input} 
                                                    value={this.state.full_name}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                    <div className={Classes.ErrorMsg}>{this.state.nameError}</div>
                                                    
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="email" className={Classes.InputLabel}>Email</label>
                                                <input 
                                                    type='text'
                                                    name="email"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.email}
                                                    onChange={this.InputChangeHamdler}
                                                     />
                                                <div className={Classes.ErrorMsg}>{this.state.emailError}</div>
                                                   
                        </div>
                      
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="addrs" className={Classes.InputLabel}>Address</label>
                                                <textarea
                                                    type='text'
                                                    name="address"
                                                    rows="3"
                                                    className="form-control"
                                                    style={style.TextaraInput} 
                                                    value={this.state.address}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.addressError}</div>
                                                    
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="state" className={Classes.InputLabel}>State</label>
                                                <input 
                                                    type='text'
                                                    name="state"
                                                    className="form-control"
                                                    style={style.Input} 
                                                    value={this.state.state}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.stateError}</div>
                                                 
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="district" className={Classes.InputLabel}>District</label>
                                                <input 
                                                    type='text'
                                                    name="district"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.district}
                                                    onChange={this.InputChangeHamdler}
                                                   />
                                                    <div className={Classes.ErrorMsg}>{this.state.districtError}</div>
                                                  
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="country" className={Classes.InputLabel}>Country</label>
                                                <input 
                                                    type='text'
                                                    name="country"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.country}
                                                    onChange={this.InputChangeHamdler}
                                                     />
                                                      <div className={Classes.ErrorMsg}>{this.state.countryError}</div>
                                                  
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="pincode" className={Classes.InputLabel}>pincode</label>
                                                <input 
                                                    type='text'
                                                    name="pincode"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.pincode}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.pincodeError}</div>
                                                  
                        </div>
                       
                        
                        <div className={Classes.FormGroupRemark}  >
                                            <label htmlFor="service_status" className={Classes.InputLabel}>Gender :</label>
                                            <div className='row rowmarprof'>
                                                <div className='col-md-4 '>
                                            <label >
                                            <input 
                                                type="radio" 
                                                name="gender"
                                                value='MALE'
                                                onChange={this.InputChangeHamdler}
                                                defaultChecked
                                                
                                            />&nbsp;&nbsp;&nbsp;Male
                                            </label>
                                                </div>
                                                <div className='col-md-4 nopadmar'>
                                                <label >
                                                    <input 
                                                    type="radio"
                                                    name="gender" 
                                                    value='FEMALE'
                                                    onChange={this.InputChangeHamdler}
                                                        />&nbsp;&nbsp;&nbsp;Female</label>
                                                        </div>
                                                        </div>
                                </div>
                        
                    </div>
                    <div className='col-md-6'>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="pswd" className={Classes.InputLabel}>Password</label>
                                                <input 
                                                    type='password'
                                                    name="password"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.password}
                                                    onChange={this.InputChangeHamdler}
                                                     />
                                                      <div className={Classes.ErrorMsg}>{this.state.passwordError}</div>
                                                
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="phnno" className={Classes.InputLabel}>Phone Number</label>
                                                <input 
                                                    type='text'
                                                    name="mobile"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.mobile}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.mobileError}</div>
                                                   
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="pincode" className={Classes.InputLabel}>Educational qualification</label>
                                                <input 
                                                    type='text'
                                                    name="education"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.education}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.educationError}</div>
                                                  
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="pincode" className={Classes.InputLabel}>Specialised in</label>
                                                <input 
                                                    type='text'
                                                    name="speciality"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.speciality}
                                                    onChange={this.InputChangeHamdler}
                                                    />
                                                     <div className={Classes.ErrorMsg}>{this.state.specialityError}</div>
                                                  
                        </div>
                      
                        <div className={Classes.FormGroupRemark}  >
                                            <label htmlFor="service_status" className={Classes.InputLabel}>Service status :</label>
                                            <div className='row rowmarprof'>
                                                <div className='col-md-4 '>
                                            <label >
                                            <input 
                                                type="radio" 
                                                name="service_status"
                                                value='ACTIVE'
                                                onChange={this.InputChangeHamdler}
                                                defaultChecked
                                                
                                            />&nbsp;&nbsp;&nbsp;Active
                                            </label>
                                                </div>
                                                <div className='col-md-4 nopadmar'>
                                                <label >
                                                    <input 
                                                    type="radio"
                                                    name="service_status" 
                                                    value='INACTIVE'
                                                    onChange={this.InputChangeHamdler}
                                                        />&nbsp;&nbsp;&nbsp;Inactive</label>
                                                        </div>
                                                        </div>
                                </div>
                                <div className={Classes.FormGroupRemark}  >
                                            <label htmlFor="remarks" className={Classes.InputLabel}>Remarks</label>
                                                <input 
                                                    type='text'
                                                    name="remarks"
                                                    className="form-control"
                                                    style={style.Input}
                                                    value={this.state.remarks}
                                                    onChange={this.InputChangeHamdler} />
                                                   
                        </div>
                        <div className={Classes.FormGroup}  >
                                            <label htmlFor="profile" className={Classes.InputProfile}>Upload your profile photo</label>
                                                <input 
                                                    type='file'
                                                    name='profDp'
                                                    onChange={this.fileSelectHandler}
                                                    
                                                />
                                                 <div className={Classes.ErrorMsg}>{this.state.profeError}</div>
                                                 
                        </div>
                    </div>
                </div>
            </form>
        )
    return(
        <InstituteHomeLayout>
               < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleUpdated} heading='SUCCESS!' body='Professional Details Added successfully'/>
            <div className={Classes.ProfessinalPad}>
                <h4  className='text-primary'>Professional Register</h4>
                {form}
                <div className='col-md-2 nopadmar'>
                    < UserButton clicked={this.handleSubmit}> Register</UserButton>
                </div>
             </div>
        </InstituteHomeLayout>
        )
    }
}
const style={
    Input:{
           fontSize: '13px',
           fontWeight: '600',
           borderColor: 'rgb(221, 217, 217)',
           height: '40px'
       },
       TextaraInput:{
        fontSize: '13px',
        fontWeight: '400',
        borderColor: 'rgb(221, 217, 217)',
       }
     
   }
export default InstituteProfessionalRegister