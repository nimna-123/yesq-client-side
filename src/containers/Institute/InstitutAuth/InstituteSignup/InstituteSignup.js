import React,{Component}from 'react'
import InstituteHeader from '../../../../components/InstituteHeader/InstituteHeader'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import axios from 'axios'
import Classes from './InstituteSignup.module.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    geocodeByPlaceId
  } from 'react-places-autocomplete';
  import {TiLocationOutline} from "react-icons/ti"


class InstituteSignup extends Component {
constructor(props) {
    super(props);
    this.state= {
        inst_name:"",
        mobile:"",
        email:"", 
        groupList:[],
        catgList:[],
        group: "",
        catg:"",
        subCatgList:[],
        subCatg:"",
        password:"",
        address:"",
        location:"",
        state:"",
        district:"",
        pincode:"",
        nameError: "",
        emailError:"",
        mobileError:"",
        groupError:"",
        catgError:"",
        subCatgError:"",
        passwordError:"",
        addressError:"",
        locationError:"",
        districtError:"",
        stateError:"",
        pincodeError:"",
        lattitude:"",
        longitude:""
    };
}
   
componentDidMount() {
    axios.post('/get/institute/group')
            .then(response=>{
                this.setState({
                    groupList:response.data
                })
            })
            .catch(error =>{
                console.log(error.response)
            })
}
signInClickHandler = () =>{
    this.props.history.push('/institute/login')
}
nameHandleChange = (event) =>{
    this.setState({inst_name:event.target.value})
        
}
mobileHandleChange= (event) =>{
    this.setState({mobile:event.target.value})
}
emailHandleChange = (event) =>{
    this.setState({email:event.target.value})
}
passwordHandleChange = (event) =>{
    this.setState({password:event.target.value})
}
addressHandleChange = (event) =>{
    this.setState({address:event.target.value})
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
   
};
// stateHandleChange = (event) =>{
//     this.setState({state:event.target.value})
// }
distrctHandleChange = (event) =>{
    this.setState({district:event.target.value})
}
pincodeHandleChange = (event) =>{
    this.setState({pincode:event.target.value})
}
selectGroupChange = (e) =>{
    this.setState({ group: e.target.value });
}
validate = () => {
        let nameError = "";
        let emailError = "";
        let mobileError="";
        let groupError="";
        let catgError = "";
        let subCatgError = "";
        let passwordError = "";
        let addressError = "";
        let locationError = "";
        let districtError = "";
        let stateError = "";
        let pincodeError = "";

        if (!this.state.inst_name) {
            nameError = "Enter company name";
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
          
          if (!this.state.group) {
            groupError = "This field is required.";
            this.setState({groupError})
          }
          if (!this.state.catg) {
            catgError= "This field is required.";
            this.setState({catgError})
          }
          if (!this.state.subCatg) {
            subCatgError = "This field is required.";
            this.setState({subCatgError})
          }
         
          if (this.state.password && this.state.password.length < 6 ){
            passwordError = "Password should be at least 6 characters";
            this.setState({passwordError})
          }
          if (!this.state.password){
            passwordError = "Enter password";
            this.setState({passwordError})
          }
          if (!this.state.location) {
            locationError = "Enter location";
            this.setState({locationError})
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
          if (!this.state.pincode) {
            pincodeError = "Enter pincode";
            this.setState({pincodeError})
          }
          if ((this.state.pincode) && (!this.state.pincode.match(/^\d+/))) {
            pincodeError = "Pincode must be numerical value";
            this.setState({pincodeError})
          }
          if (emailError || nameError || mobileError || passwordError || pincodeError || stateError || districtError || addressError || locationError || subCatgError || 
            catgError || groupError)  {
            this.setState({ emailError, nameError,mobileError,passwordError,pincodeError ,stateError,districtError,addressError,locationError,subCatgError,catgError,groupError});
            return false;
          }
          return true
      
 }
selectGroup = () =>{
    axios.post('/get/institute/catgory',{groupName : this.state.group})
    .then(response=>{
         this.setState({
            catgList:response.data
         })
    })
    .catch(error =>{
        // console.log(error.response)
     })
}
selectCatChange=(e)=> {
    this.setState({ catg: e.target.value });
          
}
selectCat= () =>{
    axios.post('/get/institute/subcatgory',{groupName :this.state.group,catagory:this.state.catg})
    .then(response=>{
        this.setState({
            subCatgList:response.data,
         })
    })
    .catch(error =>{
            console.log(error.response)
    })
 }
selectsubCatChange = (e) =>{
        this.setState({ subCatg: e.target.value });
 }
handleSubmit = (event) =>{
        event.preventDefault()
        const values = {name:this.state.inst_name.trim(),mobile:this.state.mobile.trim(),email:this.state.email.trim(),
                        password:this.state.password.trim(),pincode:this.state.pincode.trim(),district:this.state.district.trim(),
                        state:this.state.state.trim(),location:this.state.location.trim(),address:this.state.address.trim(),
                        groupid:this.state.subCatg,latitude:this.state.lattitude,longitude:this.state.longitude}
        
        const isValidate =this.validate()
        if(isValidate){
            
            this.setState({nameError :""})
            this.setState({emailError :""})
            this.setState({mobileError:""})
            this.setState({groupError:""})
            this.setState({catgError : ""})
            this.setState({subCatgError : ""})
            this.setState({passwordError :""})
            this.setState({addressError : ""})
            this.setState({locationError : ""})
            this.setState({districtError : ""})
            this.setState({stateError : ""})
            this.setState({pincodeError : ""})
            this.props.onInstituteSignup(values,this.props.history)
        }
}
render(){
        return (
            <InstituteHeader clicked={this.signInClickHandler} caption='You have already an account'>
               <form autoComplete='off'>
                    <div style={style.serverErrorMsg}>{this.props.error}</div>
                        <div className='row' style={style.RowPad}>
                            <div className='col-md-8 '>
                                <div style={style.FormGroup}>
                                    <label htmlFor="orgName" className="input-label">Organization name</label>
                                        <input
                                            type="name"
                                            value={this.state.inst_name}
                                            className="form-control"
                                            name="inst_name"
                                            onChange={this.nameHandleChange}
                                            style={style.Input}/>
                                            <div style={style.ErrorMsg}>{this.state.nameError}</div>
                                </div>
                               
                                </div>
                                <div className='col-md-4 nopadleft'>
                                        <div style={style.FormGroup}>
                                            <label htmlFor="mobNum" className="input-label">Mobile number</label>
                                            <input
                                                type="number"
                                                value={this.state.mobile}
                                                className="form-control"
                                                name="mobile"
                                                onChange={this.mobileHandleChange}
                                                style={style.Input}/>
                                                <div style={style.ErrorMsg}>{this.state.mobileError}</div>
                                        </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="orgGroup" className="input-label">Organization group</label>
                                        <select type="name"
                                                className="form-control"
                                                name="group"
                                                value={this.state.group}
                                                onChange={this.selectGroupChange} 
                                                onClick={this.selectGroup}
                                                style={style.Input}>
                                                <option value="N/A">Select group</option>
                                                {this.state.groupList.map(optn =>{
                                                    return<option  key={optn.GROUP_INDEX} value={optn.GROUP_NAME} >{optn.GROUP_NAME}</option>
                                                })}
                                        </select>
                                        <div style={style.ErrorMsg}>{this.state.groupError}</div>
                                      
                                    </div>
                                </div>
                               
                                <div className='col-md-4 nopadleft'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="catgory" className="input-label">category</label>
                                        <select
                                                type="name"
                                                className="form-control"
                                                name="catg"
                                                value={this.state.catg}
                                                onChange={this.selectCatChange}
                                                onClick={this.selectCat}
                                                style={style.Input}>
                                                     <option >{this.state.group === ''?'':'please select category'}</option>
                                                     {this.state.catgList.map(catg =>{
                                                    return<option  key={catg.CATEGORY_INDEX} value={catg.CATEGORY_NAME} >{catg.CATEGORY_NAME}</option>
                                                })}
                                        </select>
                                        <div style={style.ErrorMsg}>{this.state.catgError}</div>
                                    </div>
                                </div> 
                               
                                    <div className='col-md-4 nopadleft'>
                                        <div style={style.FormGroup}>
                                            <label htmlFor="subcat" className="input-label">subcategory</label>
                                            <select
                                                type="name"
                                                className="form-control"
                                                name="subCatg"
                                                value={this.state.subCatg}
                                                onChange={this.selectsubCatChange}
                                                onClick={this.selectSubCatg}
                                                style={style.Input}>
                                                    <option>{this.state.catg === ''?'':'please select subcategory'}</option>
                                                    {this.state.subCatgList.map(subCatg =>{
                                                    return<option  key={subCatg.GROUPID} value={subCatg.GROUPID} >{subCatg.SUBCATEGORY_NAME}</option>
                                                    })}
                                            </select>
                                            <div style={style.ErrorMsg}>{this.state.subCatgError}</div>
                                        </div>
                                    </div>
                                </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="email" className="input-label">Email</label>
                                        <input
                                                type="name"
                                                value={this.state.email}
                                                className="form-control"
                                                name="email"
                                                onChange={this.emailHandleChange}
                                                style={style.Input}/>
                                                 <div style={style.ErrorMsg}>{this.state.emailError}</div>
                                    </div>
                                </div>
                                <div className='col-md-6 nopadleft'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="password" className="input-label">Password</label>
                                        <input
                                                type="password"
                                                value={this.state.password}
                                                className="form-control"
                                                name="password"
                                                onChange={this.passwordHandleChange}
                                                style={style.Input}/>
                                                <div style={style.ErrorMsg}>{this.state.passwordError}</div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="address" className="input-label">Address</label>
                                            <textarea
                                                rows="5"
                                                type="name"
                                                value={this.state.address}
                                                className="form-control"
                                                name="address"
                                                onChange={this.addressHandleChange}
                                               style={style.texareaInput}
                                            />
                                             <div style={style.ErrorMsg}>{this.state.addressError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="location" className="input-label">Location</label>
                                        <PlacesAutocomplete
                                             value={this.state.location}
                                             onChange={this.locationHandleChange}
                                             onSelect={this.handleSelect}
                                             
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                            <input
                                                {...getInputProps({
                                                placeholder: 'Search location ...',
                                                className: 'form-control',
                                                style:{fontSize: '14px',
                                                fontWeight: '400',
                                                backgroundColor: 'rgb(244, 244, 244)',
                                                borderColor: 'rgb(240, 240, 240)',
                                                height: '45px'}
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
                                <div className='col-md-6  nopadleft'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="state" className="input-label">State</label>
                                        <input
                                               type="name"
                                               value={this.state.state}
                                                className="form-control"
                                                name="state"
                                                // onChange={this.stateHandleChange}
                                                readOnly = {true} 
                                               style={style.Input}/>
                                            <div style={style.ErrorMsg}>{this.state.stateError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="district" className="input-label">District</label>
                                        <input
                                               type="name"
                                               value={this.state.district}
                                                className="form-control"
                                                name="district"
                                                onChange={this.distrctHandleChange}
                                                style={style.Input}
                                                 />
                                                <div style={style.ErrorMsg}>{this.state.districtError}</div>
                                    </div>
                                </div>
                                <div className='col-md-6  nopadleft'>
                                    <div style={style.FormGroup}>
                                        <label htmlFor="pincode" className="input-label">Pin code</label>
                                        <input
                                               type="number"
                                               value={this.state.pincode}
                                                className="form-control"
                                                name="pincode"
                                                onChange={this.pincodeHandleChange}
                                               style={style.Input}/>
                                            <div style={style.ErrorMsg}>{this.state.pincodeError}</div>
                                    </div>
                                </div>
                        </div>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <UserButton clicked = {this.handleSubmit}>Continue</UserButton>
                                </div>
                            </div>
                    </form>
              </InstituteHeader>
        );
    }
}
const style ={
	Input:{
		fontSize: '14px',
		fontWeight: '400',
		backgroundColor: 'rgb(244, 244, 244)',
		borderColor: 'rgb(240, 240, 240)',
        height: '45px'
		},
    texareaInput:{
        fontSize: '14px',
		fontWeight: '400',
		backgroundColor: 'rgb(244, 244, 244)',
		borderColor: 'rgb(240, 240, 240)'

        },
    RowPad:{
            paddingTop:'50px'
        },
    InputPad:{
        paddingLeft:'20px'
    },
    FormGroup:{
        marginBottom: '25px'
    },
    ErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'left',
        fontSize: '14px'
    },
    serverErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'center',
        fontSize: '14px',
        marginTop:'35px'

    }
   
}
const mapStateToProps = state =>{
    return{
		error:state.institute.signupErr,
		loading: state.institute.loading,
        
		
	}
}

const mapDispatchToProps = dispatch =>{
    	return{
    		onInstituteSignup:(values,history)=>dispatch(actions.instituteSignup(values,history)),
          
    	}
    }


export default connect(mapStateToProps,mapDispatchToProps)(InstituteSignup);