import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Header from './Header/Header'
import Classes from './UserHome.module.css'
import Doctor from '../../components/Doctors/Doctor'
import UserHomeButton from '../../components/UI/Button/UserButton/UserHomeButton/UserHomeButton'
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import Services from '../../components/Services/Service/Service'
import Hospital from '../../components/Institutes/Institute'
import FooterTop from '../../components/Footer/FooterTop/FooterTop'
import FooterBottom from '../../components/Footer/FooterBootom/FooterBottom'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import * as actions from '../../store/actions/index'
import ModalForm from '../../components/UI/ModalForm/ModalForm'
import axios from 'axios'
import HospitalImg from '../../assets/images/services/hosptal.png'
import Clinic from '../../assets/images/services/clinic.png'
import Nuitrition from '../../assets/images/services/nutrition.png'
import DoctorImg from '../../assets/images/services/doctors.png'
import Others from '../../assets/images/services/others.png'
import Lab from '../../assets/images/services/lab.png'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class  UserHome extends Component{
    constructor(props){
        super(props)
            this.state={
               show:false,
                locaSlicSlidertion:'',
                hospitals: [],
                serviceList:[{grp:'HEALTHCARE',catg:'CLINIC',img: Clinic},
                            {grp:'HEALTHCARE',catg:'LAB',img:Lab},
                            {grp:'HEALTHCARE',catg:'NUTRITION CENTRE',img:Nuitrition},
                            {grp:'HEALTHCARE',catg:'VACCINATION CENTRE',img: Others}],
                            locatn:"",
                locName:'Near By',
                lat:'',
                lng:'',
                locError:"",
                doctList:[],
                advtImg:[{img:'advt6.jpg',path:'https://nikshanonline.com/'},
                        {img:'advt2.jpg',path:'https://play.google.com/store/apps/details?id=com.boosttip.boosttipball&hl=en_IN&gl=US'},
                        {img:'advt3.jpg',path:'https://cashkaro.com/join?r=477358&gclid=Cj0KCQjw3f6HBhDHARIsAD_i3D9QPlpv7ECciMqSfMnEefu_XWgR3YtN5ofxClURlEH3X-nYUg_zbP8aAuxAEALw_wcB'},
                        {img:'advt4.jpg',path:'https://www.hyundai.com/worldwide/en.keyword.sustainability.html'},
                        ],
                slideImg:['slider1.jpg','slider2.jpg','slider3.jpg']

            }
    }
    componentDidMount(){
        let lattitude = localStorage.getItem('latitude')
        let longitude =  localStorage.getItem('longitude')
        if((lattitude === null) || (longitude === null) || (lattitude.length === 0) || (longitude.length === 0) ){
            this.setState({show:true})
            const origin = 'NA'
            axios.post('/list/hospitals/clinic',{origin:origin})
            .then(response=>{
                var data = response.data
                var slice = data.slice(0,4)
                this.setState({hospitals:slice})
            })
            .catch((err) =>{
                console.log(err.response);
            })

        }
        else{
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...',locatn:name})
            this.fetchHos()

        }
        axios.post("/admin/list/professionals")
        .then(response=>{
            console.log(response.data);
            const doctData = response.data
            const doctSlice = doctData.slice(0,6)
            this.setState({doctList:doctSlice})
            
        })
        .catch((err) =>{
            console.log(err.response)
            
        })
    }
    fetchHos = () =>{
        const origin = localStorage.getItem('latitude')+','+localStorage.getItem('longitude')
        axios.post('/list/hospitals/clinic',{origin:origin})
        .then(response=>{
            var data = response.data
            var slice = data.slice(0,4)
            this.setState({hospitals:slice})
          
        })
        .catch((err) =>{
            console.log(err.response);
           
        })

    }
    doctorList =() =>{
        this.props.history.push('/doctors')
        
    }
    hospitalViewHandler = () =>{
        this.props.history.push('/hospitals')

    }
    hospitalClinicsViewHandler = () =>{
        this.props.history.push('/hospitals/clinics')

     }
     instituteViewHandler = (item) =>{
        this.props.history.push({
            pathname: '/institute_lists_GROUP='+item.grp+'/CATEGORY='+item.catg,
            state: { detail: item }
           
          })
    }
    instHosBookingSelHandler = (selectedInst) =>{
        this.props.history.push({
            pathname: '/institute_counter_ISTID='+selectedInst.ISTID,
           
          })
    }
    instituteSignUpHandler = () =>{
        this.props.history.push('/institute_register')
    } 
    handleClose = () => {
        this.setState({show:false})
        this.setState({locError:""})
     }
    locHandleChange = locatn =>{
        this.setState({locatn})
     
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
                this.setState({show:false})
                localStorage.setItem('latitude',this.state.lat)
                localStorage.setItem('longitude',this.state.lng)
                this.fetchHos()
        }
    }
    nearByClickHandler = () =>{
        this.setState({show:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
           }
       
    }
    doctProfViewHandler = (proid) =>{
        this.props.history.push('/doctor/profile_PROF_ID='+proid)
    } 

   
   
    render(){
        let  userName= 'Sign in';
        if(this.props.isAuthntcated){
            userName=this.props.userName
        }
        var settings = {  
            dots: true,  
            infinite: true,  
            speed: 2000,  
            centerMode: true,  
            slidesToShow: 2,  
            slidesToScroll: 1,  
            autoplay:true,
            centerPadding:'0px',
            arrows:false,
            responsive: [
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                  
                }
              },
            
            ]
          }; 
          var slideSettings = {
            dots: false,  
            infinite: true,  
            speed: 3500,  
            centerMode: true,  
            slidesToShow: 1,  
            slidesToScroll: 1,  
            autoplay:true,
            centerPadding:'0px',
            arrows:false,
        }
       return(
            <div className={Classes.HomeBgColor}>
                 < ModalForm shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='Add your location!'
                            location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                            label='Select your location for better experience' errorMsg={this.state.locError}/>
                <Header isAuth={this.props.isAuthntcated} username={userName} clicked={this.props.onUserLogout} locname={this.state.locName} 
                        nearBtnClicked={this.nearByClickHandler}/>
                   <div className={Classes.Main}>
                            {/* <CarouselContainer image1={SliderImg1} image2={SliderImg2} image3={SliderImg3} MobSlideImg={Classes.MobSlideImg} ImageSlider={Classes.ImageSlider}/> */}
                            <div className={Classes.containers}>
                                <Slider {...slideSettings} > 
                                    {this.state.slideImg.map((item,index)=>{
                                        return(
                                            <div className={Classes.wdt} key={index} >
                                                {/* <div style={{ backgroundImage: `url(/uploads/advertisement/${item})` }} className={Classes.img}> */}
                                                <img src={`/uploads/slider/${item}`} className='img-responsive' alt={item}/>
                                            </div>  
                                        )
                                    })}
                                </Slider> 
                            </div>
                        <div className={Classes.Doctor}>
                            <div className={Classes.DoctorAllign}>
                                <h3>Find Doctors Available Near You</h3>
                                <div className={Classes.ButtonHomePad}>
                                <UserHomeButton btnstyle={Classes.UserHomeButton} btnstyleName={Classes.UserHomeBtnName} clicked={this.doctorList} disable={false}>See all Doctors</UserHomeButton>
                                </div>
                            </div>
                            <p>Book assured appointments even during the COVID-19 pandemic</p>
                           <div className='row nopadmar'>
                            {this.state.doctList.map((item,index)=>{
                                         return(
                                            <Doctor doctorname={item.FULLNAME}  key={item.PROF_ID} education={item.EDUCATION} speciality={item.SPECIALITY} DoctCardBody={Classes.DocCardBody} doctImage= {`/uploads/professional_dp/${item.PROF_PHOTO}`}
                                            clickDoct={()=>this.doctProfViewHandler(item.PROF_ID)}/>
                                        ) 
                                })} 
                            </div>
                        </div>
                        <div className={Classes.Advt}>
                            <div className={Classes.containers}>
                                <Slider {...settings} > 
                                    {this.state.advtImg.map((item,index)=>{
                                        return(
                                            <div className={Classes.wdt} key={index} >
                                                {/* <div style={{ backgroundImage: `url(/uploads/advertisement/${item})` }} className={Classes.img}> */}
                                                <a  href={item.path}><img src={`/uploads/advertisement/${item.img}`} className='img-responsive' alt={item}/></a>
                                            </div>  
                                        )
                                    })}
                                </Slider> 
                            </div>
                        </div>
                        <div className={Classes.ServiceBg}>
                            <div className={Classes.Services}>
                                <div className='row nopadmar'>
                                    {/* {this.props.t} */}
                              <Services servicename='HOSPITAL' serviceimge={HospitalImg} clicked={this.hospitalViewHandler} />
                                    {this.state.serviceList.map((item,index)=>{
                                         return(
                                            <Services servicename={item.catg} serviceimge={item.img} key={index} clicked={()=>this.instituteViewHandler(item)}/>
                                        )
                                })} 
                                    <Services servicename='DOCTORS' serviceimge={DoctorImg}/>
                                </div>
                            </div>
                        </div>
                        <div className={Classes.FindHospital}>
                            <div className={Classes.Hospitals}>
                                <div className={Classes.HospitalAllign}>
                                        <h3>Find Hospitals Available Near You</h3>
                                    <div className={Classes.ButtonHomePad}>
                                        <UserHomeButton btnstyle={Classes.UserHomeButton} btnstyleName={Classes.UserHomeBtnName} clicked={this.hospitalClinicsViewHandler} disable={false}>See all Hospitals</UserHomeButton>
                                    </div>
                                </div>
                                <p>Book assured appointments even during the COVID-19 pandemic</p>
                                <div className='row nopadmar'>
                                {this.state.hospitals.map((item,index)=>{
                                    return(
                                            <Hospital instName={item.ISTNAME} 
                                            location={item.LOCATION} phnno={item.MOBILE}
                                            instImage={item.COMPANY_DP} key={item.ISTID}
                                            email={item.EMAIL} clickIns={()=>this.instHosBookingSelHandler(item)}
                                            callnum={item.MOBILE}
                                            HosCardBody={Classes.HosCardBody}
                                            InstLayout='col-lg-3 col-md-6 col-sm-6 col-6 HosNopadleft'
                                            />
                                        )
                                })} 
                                  
                                </div>
                           </div>
                        </div>
                        <div className={Classes.Footer}>
                            <FooterTop/>
                            <FooterBottom clicked={this.instituteSignUpHandler}/>
                        </div>
                            < ScrollToTop/>
                    </div>
            </div>
        )
}
}
const mapStateToProps = state =>{
    return{
		isAuthntcated: state.user.tokenId !== null,
        userName: state.user.userName,
       
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserLogout:()=>dispatch(actions.userLogout()),
       
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserHome))