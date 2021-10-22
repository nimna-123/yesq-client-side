import React, { Component } from 'react'
import Classes from './InstituteUpdateProf.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import {withRouter} from 'react-router-dom' 
import axios from 'axios'
import Modals from '../../../../components/UI/Modal/Modal'

class InstituteUpdateProf extends Component{
    constructor(props){
        super(props)
            this.state={
                full_name:"",
                email:"",
                mobile:"",
                address:"",
                state:"",
                district:"",
                country:"",
                pincode:"",
                education:"",
                speciality:"",
                remarks:"NA",
                gender:"",
                service_status:"",
                imgUrl:"",
                selectedFile:null,
                profId:"",
                show:false,
                fileName:'',
                emailError:"",
                nameError:"",
                mobileError:"",
                pincodeError:"",
                stateError:"",
                districtError:"",
                addressError:"",
                countryError:"",
                educationError:"",
                specialityError:""
            }
    }
    componentDidMount(){
       
        axios.post("/institute/update/professional",{id:this.props.match.params.profId})
        .then(response=>{
            this.setState({
                full_name: response.data.FULLNAME,
                profId: response.data.PROF_ID,
                email: response.data.EMAIL,
                mobile: response.data.PHONE,
                address: response.data.ADDRESS,
                state: response.data.STATE,
                district: response.data.DISTRICT,
                country: response.data.COUNTRY,
                pincode: response.data.PINCODE,
                remarks: response.data.REMARKS,
                gender: response.data.GENDER,
                education:response.data.EDUCATION,
                speciality:response.data.SPECIALITY,
                service_status: response.data.SERVICE_STATUS,
                fileName: response.data.PROF_PHOTO,
                imgUrl: response.data.PROF_PHOTO
            })
        }).catch((err) =>
        {
             console.log(err.response)
        })                       
    }
    InputChangeHamdler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    fileSelectHandler = (e) =>{
        this.setState({
            selectedFile:e.target.files[0]
        })
    }
    handleUpdated = () =>{
        this.setState({show:false})
        window.location.reload(); 
     }
     handleClose = () => {
        this.setState({show:false})
        window.location.reload(); 
     }
    handleShow = () => {
        this.setState({show:true})
     };
     validate = () => {
        let nameError = "";
        let emailError = "";
        let mobileError = "";
        let addressError = "";
        let districtError = "";
        let stateError = "";
        let pincodeError = "";
        let countryError = "";
        let educationError = "";
        let specialityError = "";

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
          if (!this.state.address) {
            addressError = "This field is required";
            this.setState({addressError})
          }
          if (!this.state.district) {
            districtError = "This field is required";
            this.setState({districtError})
          }
          if (!this.state.state) {
            stateError = "This field is required";
            this.setState({stateError})
          }
          if (!this.state.country) {
            countryError = "This field is required";
            this.setState({countryError})
          }
          if (!this.state.pincode) {
            pincodeError = "This field is required";
            this.setState({pincodeError})
          }
          if (!this.state.education) {
            educationError = "This field is required";
            this.setState({educationError})
          }
          if (!this.state.speciality) {
            specialityError = "This field is required";
            this.setState({specialityError})
          }
         
          if (emailError || nameError || mobileError || pincodeError || stateError || districtError || addressError || countryError || educationError ||specialityError)  {
            this.setState({ emailError, nameError,mobileError,pincodeError ,stateError,districtError,addressError,countryError,educationError,specialityError});
            return false;
          }
          return true
      
 }
    updateHandler = (e) =>{
     e.preventDefault()
        const inputs = {prof_id:this.state.profId,name:this.state.full_name,address:this.state.address,email:this.state.email,district:this.state.district,state:this.state.state,
                        country:this.state.country,pincode:this.state.pincode,gender:this.state.gender,phone:this.state.mobile,status:this.state.service_status,fileName:this.state.fileName,education:this.state.education,
                        remarks:this.state.remarks,speciality:this.state.speciality}
                        console.log(inputs);
        const isValidate =this.validate()
        if(isValidate){
        
        axios.post("/api/institute/update/professional",inputs)
        .then(response=>{
         
          this.setState({show:true})
           
        }).catch((err) =>
        {
              console.log(err.response)
        })
        this.setState({ emailError:"", nameError:"",mobileError:"",pincodeError:"",stateError:"",districtError:"",addressError:"",countryError:"",educationError:"",specialityError:""});
    }
    }
    updateProfImg = (e) =>{
       e.preventDefault()
        let formData = new FormData()
       
        formData.append('profId',this.props.match.params.profId)
        formData.append('profDp',this.state.selectedFile)
       
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        console.log(formData)
        axios.post("/api/professional/photo/update",formData,config)
            .then(response => {
                this.setState({show:true})
            
        }).catch((err) =>
        {
              console.log(err.response) 
        }) 
    } 
    
    render(){
        let uploadForm = (
               <div className='row' style={style.ImgAlign}>
                <div className='col-md-6'>
                    <img src={`/uploads/professional_dp/${this.state.imgUrl}`} alt='profDp' className={Classes.ImgOutLine}/>
                </div>
                <div className='col-md-6'>
                    <h3 className={Classes.uploadCap}>Upload your profile photo</h3>
                    <input type='file' name='profDp' onChange={this.fileSelectHandler}/>
                    <button className={Classes.UploadBtn} onClick={this.updateProfImg} type='submit'>Upload</button>
                </div>
            </div> 
        )
       let form = (
        <form className={Classes.FormPad} autoComplete='off'>
          
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
                     <div className={Classes.FormGroupRemark}  >
                                            <label htmlFor="service_status" className={Classes.InputLabel}>Gender :</label>
                                                <div className='row rowmarprof'>
                                                    <div className='col-md-4 '>
                                                         <label >
                                                            <input 
                                                                type="radio" 
                                                                name="gender"
                                                                value='MALE'
                                                                checked ={this.state.gender === 'MALE'}  
                                                                onChange={this.InputChangeHamdler}                                            
                                                                />&nbsp;&nbsp;&nbsp;Male
                                                        </label>
                                                    </div>
                                                    <div className='col-md-4 nopadmar'>
                                                        <label >
                                                            <input 
                                                            type="radio"
                                                            name="gender" 
                                                            value='FEMALE'
                                                            checked ={this.state.gender === 'FEMALE'} 
                                                            onChange={this.InputChangeHamdler}
                                                        />&nbsp;&nbsp;&nbsp;Female</label>
                                                    </div>
                                                </div>
                    </div>
                </div>
                <div className='col-md-6'>
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
                                            type='number'
                                            name="pincode"
                                            className="form-control"
                                            style={style.Input}
                                            value={this.state.pincode}
                                            onChange={this.InputChangeHamdler}
                                        />
                                         <div className={Classes.ErrorMsg}>{this.state.pincodeError}</div>
                    </div>
                    <div className={Classes.FormGroup}  >
                                <label htmlFor="pincode" className={Classes.InputLabel}>Education</label>
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
                                <label htmlFor="pincode" className={Classes.InputLabel}>Speciality</label>
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
                                 <label htmlFor="remarks" className={Classes.InputLabel}>Remarks</label>
                                        <input 
                                            type='text'
                                            name="remarks"
                                            className="form-control"
                                            style={style.Input}
                                            value={this.state.remarks}
                                            onChange={this.InputChangeHamdler}
                                                    />
                                                     
                    </div>
                    <div className={Classes.FormGroupRemark}  >
                                    <label htmlFor="service_status" className={Classes.InputLabel} style={style.RadioPad}>Service status :</label>
                                        <div className='row rowmarprof'>
                                            <div className='col-md-4 '>
                                                <label >
                                                <input 
                                                type="radio" 
                                                name="service_status"
                                                value='ACTIVE'
                                                checked ={this.state.service_status === 'ACTIVE'} 
                                                onChange={this.InputChangeHamdler}
                                               />&nbsp;&nbsp;&nbsp;Active
                                            </label>
                                            </div>
                                             <div className='col-md-4 nopadmar'>
                                                <label >
                                                        <input 
                                                        type="radio"
                                                         name="service_status" 
                                                         value='INACTIVE'
                                                        checked ={this.state.service_status === 'INACTIVE'} 
                                                        onChange={this.InputChangeHamdler}
                                                        />&nbsp;&nbsp;&nbsp;Inactive</label>
                                            </div>
                         </div>
                        
                    </div>
                  
                </div>
                <button className={Classes.UpdateBtn} onClick={this.updateHandler}>Update</button>
             </div>
        </form>
    )
    return(
        <InstituteHomeLayout>
          
            < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleUpdated} heading='SUCCESS!' body='Successfully Updated'/>
            <h3 className={Classes.MainHead}>Professional Edit</h3>
            <div className='row'>
                <div className='col-md-7'>
                    {form}
                 </div>
                <div className='col-md-5'>
                    {uploadForm}
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
       },
       RadioPad:{
           marginTop:'20px'
       },
       ButtnAlign:{
           padding: '20px'
       },
       ImgAlign:{
           marginTop:'35px',
           marginBottom:'25px'
       }
     
     
   }
export default withRouter(InstituteUpdateProf)