import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Classes from './EditProfile.module.css'
import UserAccountLayout from '../../../../components/UserAccountLayout/UserAccountLayout'
import Modals from '../../../../components/UI/Modal/Modal'
import ModalForm from '../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class EditProfile extends Component{
    constructor(props){
        super(props)
            this.state={
               name:"",
               email:"",
               emailError:"",
               show:false,
               locatn:"",
                locName:'Near By',
                lat:'',
                lng:'',
                showLoc:false,
                locError:"",
                
              
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
        axios.post("/institute/home",{istId:this.props.istId})
        .then(response=>{
          
           this.setState({ name:response.data.name,email:response.data.email})
            
        }).catch((err) =>
          {
              console.log(err)
        })
     }
    inputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})

    }
    handleClose = () => {
        this.setState({show:false})
    }
    handleShow = () => {
      this.setState({show:true})
  };
    validate = () => {
      
        let emailError ="";
        if (!this.state.email) {
            emailError = "This field is required";
            this.setState({emailError})
        }
        if ((this.state.email)&&(!this.state.email.includes("@"))) {
            emailError = "Enter valid email address";
            this.setState({emailError})
          }
      
       
        if (emailError)  {
            this.setState({emailError});
            return false;
          }
        
          return true
      
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const isValidate =this.validate()
        if(isValidate){
            this.setState({emailError :""})
        const inputs = {name:this.state.name.trim(),email:this.state.email.trim(),uid:this.props.uid}
        axios.post("/user/update/profile",inputs)
        .then(response=>{
          this.setState({show:true})
        })
        .catch((err) =>{
            console.log(err.response)
        })
        }

    }
    handleLocClose = () =>{
        this.setState({showLoc:false})
        this.setState({locError:""})
    }
    locHandleChange = locatn =>{
        this.setState({locatn})
        this.setState({locError:""})
     
    }
    handleSelect = async (locatn) => {
       this.setState({ locatn });
       const results = await geocodeByAddress(locatn);
       const latLng = await getLatLng(results[0]);
       this.setState({lat:latLng.lat,lng:latLng.lng})
    };
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
        return(
            <React.Fragment>
                  < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='SUCCESS!' body='Your profile updated'/>
                  < ModalForm shows={this.state.showLoc} hide={this.handleLocClose} closeBtn={this.handleLocClose} heading='Add your location!'
                    location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                    label='Select your location for better experience' errorMsg={this.state.locError}/>
                 <UserAccountLayout head='Edit Profile' nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName}>
                     <form autoComplete='off' className={Classes.EditForm}>
                         <label className={Classes.FormLabel}>Name:</label>
                         <input type='text' name='name' value={this.state.name} onChange={this.inputChangeHandler} className='form-control' style={style.EditInput}/>
                         <label className={Classes.FormLabel}>Email:</label>
                         <input type='text' name='email' value={this.state.email} onChange={this.inputChangeHandler} className='form-control' style={style.EditInput}/>
                         <div className={Classes.ErrorMsg}>{this.state.emailError}</div>
                         <button className={Classes.EditBtn} onClick={this.handleSubmit}>Submit</button>
                        
                     </form>

                </UserAccountLayout>
               
               

            </React.Fragment>
           

        )
    }
}
const style = {
    EditInput:{
        border: '1px solid #D6D3D3',
        marginBottom:'10px',
        fontSize:'14px'
    }
}
const mapStateToProps = state =>{
    return{
		uid:state.user.tokenId
       }
}

export default connect(mapStateToProps)(EditProfile)