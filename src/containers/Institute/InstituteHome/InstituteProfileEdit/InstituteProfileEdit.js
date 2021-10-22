import React, { Component } from 'react';
import Classes from './InstituteProfileEdit.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import Modals from '../../../../components/UI/Modal/Modal'
import { connect } from 'react-redux';
import axios from 'axios'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    geocodeByPlaceId
  } from 'react-places-autocomplete';
  import {TiLocationOutline} from "react-icons/ti"
class InstituteProfileEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            address: "",
            location: "", 
            state:"",
            district:"",
            pincode:"",
            show:false,
            lattitude:"",
            longitude:"",
            nameError:"",
            addressError:"",
            locationError:"",
            stateError:"",
            districtError:"",
            pincodeError:""
        }
    }
    componentDidMount(){
        axios.post("/institute/home",{istId:this.props.istId})
        .then(response=>{
           this.setState({ name:response.data.ISTNAME,address:response.data.ADDRESS,location:response.data.LOCATION,
                            state:response.data.STATE,district:response.data.DISTRICT,pincode:response.data.PINCODE,
                            lattitude:response.data.LATITUDE,longitude:response.data.LONGITUDE})
                
            }).catch((err) =>
            {
                console.log(err)
            })
    }
    handleClose = () => {
            this.setState({show:false})
    } 
    handleShow = () => {
            this.setState({show:true})
    }; 
    inuptChangeHandler = (event) =>{
            this.setState({[event.target.name]:event.target.value})
    }
    locationHandleChange = location => {
        this.setState({ location });
        geocodeByAddress(location)
              .then(results => getLatLng(results[0]))
              .catch(error => console.error('Error', error));
    };
    handleSelect = async (location, placeId) => {
        this.setState({ location });
        const results = await geocodeByAddress(location);
        const latLng = await getLatLng(results[0]);
        const [place] = await geocodeByPlaceId(placeId);
        this.setState({lattitude:latLng.lat,longitude:latLng.lng})
        const { long_name: postalCode = '' } =
        place.address_components.find(c => c.types.includes('postal_code')) || {};
        this.setState({pincode:postalCode})
        const { long_name: district = '' } =
        place.address_components.find(c => c.types.includes('administrative_area_level_2')) || {};
        this.setState({district:district})
        const { long_name: state = '' } =
        place.address_components.find(c => c.types.includes('administrative_area_level_1')) || {};
        this.setState({state:state})
        // const { long_name: country = '' } =
        // place.address_components.find(c => c.types.includes('country')) || {};
        // console.log("country",country);
    };
    validate = () => {
        let nameError = "";
        let addressError = "";
        let locationError="";
        let stateError="";
        let districtError="";
        let pincodeError="";
       
       if (!this.state.name) {
            nameError = "This field is required";
            this.setState({nameError})
          }
       if (!this.state.address) {
            addressError = "This field is required.";
            this.setState({addressError})
          }
          if (!this.state.location) {
            locationError= "This field is required.";
            this.setState({locationError})
          }
          if (!this.state.state) {
            stateError = "This field is required.";
            this.setState({stateError})
          }
          if (!this.state.district){
            districtError = "This field is required.";
            this.setState({districtError})
          }
         
          if (!this.state.pincode) {
            pincodeError = "This field is required";
            this.setState({pincodeError})
          }
          if ((this.state.pincode) && (!this.state.pincode.match(/^\d+/))) {
            pincodeError = "Pincode must be numerical value";
            this.setState({pincodeError})
          }
          if (nameError||addressError||locationError||stateError||districtError||pincodeError)  {
            this.setState({nameError,pincodeError ,stateError,districtError,addressError,locationError});
            return false;
          }
          return true
      
 }
    updateHandler = (event) =>{
      
        event.preventDefault()
       const updatedInputs = {istId:this.props.istId,name:this.state.name,address:this.state.address,location:this.state.location,
                                state:this.state.state, district:this.state.district,pincode:this.state.pincode,
                                latitude:this.state.lattitude,longitude:this.state.longitude}
       
        const isValidate =this.validate()
        if(isValidate){
       axios.post('/institute/update/profile',updatedInputs)
       .then(response=>{
          this.setState({show:true})
           console.log(response);
         
       }).catch((err) =>
         {
             console.log(err)
       }) 
       this.setState({nameError :""})
        this.setState({addressError : ""})
       this.setState({locationError : ""})
       this.setState({districtError : ""})
       this.setState({stateError : ""})
       this.setState({pincodeError : ""})
    }
       
    }
    render(){
    return(
        <InstituteHomeLayout>
             < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='SUCCESS!'
                         body='Your profile updated'/>
            <div style={style.ProfileEditMainPad}>
                   <h4 style={style.Head} className='text-primary'>Edit Profile</h4>
                   <form autoComplete='off'>
                  <div className='row'  >
                     <div className='col-md-6'>
                        <div className="form-group">
                                <label htmlFor='orgName' 
                                       className=" control-label form-items" 
                                       style={style.LabelName}>Organization Name:</label>
                                    <div className={Classes.Inputs}>
                                        <input type="text" name="name"
                                         className="form-control" 
                                         style={style.Input}
                                         onChange={this.inuptChangeHandler}
                                          value={this.state.name} />
                                          <div style={style.ErrorMsg}>{this.state.nameError}</div>
                                    </div>
                            
                        </div>
                        <div className="form-group ">
                           
                                <label htmlFor='address'
                                        className="control-label form-items"
                                        style={style.LabelName}>Address :</label>
                                    <div className={Classes.Inputs}>
                                        <textarea type="text"
                                                  name="address" 
                                                  style={style.Input}
                                                  className="form-control" 
                                                  onChange={this.inuptChangeHandler} 
                                                  value={this.state.address}/>
                                                  <div style={style.ErrorMsg}>{this.state.addressError}</div>
                                    </div>
                           
                        </div>
                    <div className="form-group ">
                       
							<label htmlFor='location'
                                   className="control-label form-items" 
                                   style={style.LabelName}>Location:</label>
							    <div className={Classes.Inputs}>
                                <PlacesAutocomplete
                                             value={this.state.location}
                                             onChange={this.locationHandleChange}
                                             onSelect={this.handleSelect}
                                             
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                            <textarea
                                                {...getInputProps({
                                                placeholder: 'Search location ...',
                                                className: 'form-control',
                                                style:{fontSize: '14px',
                                                fontWeight: '400',
                                                backgroundColor: 'rgb(244, 244, 244)',
                                                borderColor: 'rgb(240, 240, 240)',
                                                height: '48px'} 
                                                })}
                                            />
                                            <div className={Classes.AutocompleteDropdownContainer}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#1a7ff2', cursor: 'pointer',fontSize:'13px',color:'#fff' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' ,fontSize:'13px',color:'#000'};
                                                return (
                                                    <div className={Classes.InputSuggestion} key={suggestion.description}
                                                    {...getSuggestionItemProps(suggestion, {
                                                        
                                                        style,
                                                    })}
                                                    >
                                                    <i className="material-icons"><TiLocationOutline style={style} size='25px' /></i> <span className={Classes.ListPad} >{suggestion.description}</span>
                                                    </div>
                                                );
                                                })}
                                            </div>
                                            </div>
                                        )}
                                         </PlacesAutocomplete>
                                         <div style={style.ErrorMsg}>{this.state.locationError}</div>
							    </div>
						
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className="form-group ">
                       
							<label htmlFor='state'
                                   className="nopadright control-label form-items" 
                                   style={style.LabelName}>State :</label>
							<div className={Classes.Inputs}>
								<input type="text" 
                                name="state" 
                                style={style.Input}
                                className="form-control" 
                                onChange={this.inuptChangeHandler} 
                                value={this.state.state}
                               />
                               <div style={style.ErrorMsg}>{this.state.stateError}</div>
							</div>
					
                    </div>
                    <div className="form-group">
                       
							<label htmlFor='district'
                                   className=" nopadright control-label form-items" 
                                   style={style.LabelName}>District :</label>
							<div className={Classes.Inputs}>
								<input type="text"
                                       name="district" 
                                       style={style.Input}
                                       className="form-control" 
                                       onChange={this.inuptChangeHandler} 
                                       value={this.state.district}/>
                                         <div style={style.ErrorMsg}>{this.state.districtError}</div>
							</div>
					
                    </div>
                    <div className="form-group">
                       
							<label htmlFor='pincode'
                                   className="control-label form-items"
                                   style={style.LabelName}>Pincode:</label>
							<div className={Classes.Inputs}>
								<input type="text" 
                                       name="pincode"
                                       style={style.Input} 
                                       className="form-control" 
                                       onChange={this.inuptChangeHandler} 
                                       value={this.state.pincode}/>
                                       <div style={style.ErrorMsg}>{this.state.pincodeError}</div>
							</div>
						</div>
                    
                    </div>
                   <div className='col-md-2 d-flex justify-content-center align-items-center'>
                        <UserButton clicked={this.updateHandler}>Update</UserButton>
                    </div>
                    </div>
                    </form>
               
            </div>
          
        </InstituteHomeLayout>

    )
}
}
const style = {
    LabelName:{
       fontSize: '15px',
        paddingTop: '8px',
        fontWeight: '600'
        
    },
    ProfileEditMainPad:{
        padding: '50px 40px 80px 40px '

    },
    ProfileEditPad:{
        padding: '20px'
    },
    Head:{
        paddingBottom:'20px'
    },
    Input:{
        backgroundColor: 'rgb(244, 244, 244)',
        height:'48px'
    },
    ErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'left',
        fontSize: '14px'
    },
   
}
const mapStateToProps = state =>{
    return{
	istId:state.institute.istId
    }
}

export default connect(mapStateToProps)(InstituteProfileEdit)