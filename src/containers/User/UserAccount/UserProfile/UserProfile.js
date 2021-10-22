import React, { Component } from 'react'
import Classes from './UserProfile.module.css'
import UserAccountLayout from '../../../../components/UserAccountLayout/UserAccountLayout'
import {FaUserEdit} from 'react-icons/fa'
import {connect} from 'react-redux'
import axios from 'axios'
import ModalForm from '../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';


class UserProfile extends Component{
    constructor(props){
        super(props)
            this.state={
                userDet: {},
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
        axios.post("/institute/home",{istId:this.props.uid})
        .then(response=>{
            
            this.setState({ userDet:response.data})
        }).catch((err) =>
          {
              console.log(err.response)
        })
       
    }
    editProfile = () =>{
        this.props.history.push('/user/edit/profile')

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
        return(
            <React.Fragment>
                < ModalForm shows={this.state.showLoc} hide={this.handleLocClose} closeBtn={this.handleLocClose} heading='Add your location!'
                    location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                    label='Select your location for better experience' errorMsg={this.state.locError}/>
                <UserAccountLayout head='My Profile'  nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName}> 
                    <div className='row'>
                        <div className='col-md-8 col-sm-8 col-6'>
                            <div className={Classes.ProfDet}>
                                <h5>Name:<span className={Classes.UserProfDet}>{this.state.userDet.name}</span></h5>
                                <h5>Mobile:<span className={Classes.UserProfDet}>{this.state.userDet.mobile}</span></h5>
                                <h5>Email:<span className={Classes.UserProfDet}>{this.state.userDet.email}</span></h5>
                            </div>
                        </div>
                        <div className='col-md-4 col-sm-4 col-6'>
                            <div className={Classes.BtnAlign} >
                                <button className={Classes.EditBtn} onClick={this.editProfile}><FaUserEdit color='white' size='28px' />&nbsp;&nbsp;Edit Profile</button>
                            </div>
                        </div>
                    </div>
               </UserAccountLayout>
            </React.Fragment>
            

        )
    }
}
const mapStateToProps = state =>{
    return{
		uid:state.user.tokenId
       }
}


export default connect(mapStateToProps)(UserProfile)