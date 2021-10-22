import React from 'react'
import Classes from './ProfileDetailsLayout.module.css'
import BookingLayout from '../../../components/BookingLayout/BookingLayout'
import PhnIcon from '../../../assets/images/phone.png'
import Location from '../../../assets/images/location.png'
import Email from '../../../assets/images/email.png'
import { Component } from 'react'
import ModalForm from '../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class InstituteProfileLayout extends Component{
    constructor(props){
        super(props)
            this.state={
            locatn:"",
            locName:'Near By',
            lat:'',
            lng:'',
            show:false,
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
    handleClose = () => {
        this.setState({show:false})
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
            this.setState({show:false})
            localStorage.setItem('latitude',this.state.lat)
            localStorage.setItem('longitude',this.state.lng)
        }
    //    window.location.reload();
        
    }
    nearBtnClickHandler = () =>{
        this.setState({show:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
           }
    }
    render(){
    return(
        <BookingLayout nearByClick={this.nearBtnClickHandler} loctnName={this.state.locName}>
            < ModalForm shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='Add your location!'
            location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
            label='Select your location for better experience' errorMsg={this.state.locError}/>
           
            <div className={Classes.HosProf}> 
                <div className='row'> 
                    <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                        <div className={Classes.HosDetails}>
                            <div className='d-flex justify-content-center'>
                                <div className={Classes.HosImg}>
                                  <img src={this.props.profImg} alt='doct1' className='img-fluid'/>
                                </div>
                            </div>
                                <h2>{this.props.profName}</h2>
                                <div className={Classes.DetailPad}>
                                    <div className={Classes.ProdPad}>
                                        <div className='row'>
                                            <div className='col-md-1 col-sm-1 col-1 nopadmar'>
                                                <img src={Location} alt='location' className={Classes.IconImg}/>
                                            </div>
                                            <div className='col-md-10 col-sm-10 col-10 nopad'>
                                                <h5 className={Classes.ProfDeatailLoc}>{this.props.location}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Classes.ProdPad}>
                                        <div className='row'>
                                            <div className='col-md-1 col-sm-1 col-1 nopadmar'>
                                                <img src={PhnIcon} alt='phone' className={Classes.IconImg}/>
                                            </div>
                                            <div className='col-md-10 col-sm-10 col-10 nopad'>
                                                    <h5 className={Classes.ProfDeatail} style={{marginTop:'5px'}}>{this.props.contact}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Classes.ProdPad}>
                                        <div className='row'>
                                            <div className='col-md-1 col-sm-1 col-1 nopadmar'>
                                                <img src={Email} alt='phone' className={Classes.IconImg}/>
                                            </div>
                                            <div className='col-md-10 col-sm-10 col-10 nopad'>
                                                    <h5 className={Classes.ProfDeatail} style={{marginTop:'5px'}}>{this.props.email}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                        <div className=' col-lg-8 col-md-8 col-sm-6 col-12'>
                            <div className={Classes.Services}>
                                {this.props.children}                                
                            </div>
                        
                    </div>
                </div>
            </div>

        </BookingLayout>

    )
    }

}
export default InstituteProfileLayout