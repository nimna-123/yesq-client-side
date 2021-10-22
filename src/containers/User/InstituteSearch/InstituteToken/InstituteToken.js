import React,{Component} from 'react'
import {connect} from 'react-redux'
import Classes from './InstituteToken.module.css'
import ProfileDetailsLayout from '../../ProfileDetailsLayout/ProfileDetailsLayout'
import PrevIcon from '../../../../assets/images/prevIcon.png'
import NextIcon from '../../../../assets/images/nextIcon.png'
import Slots from '../../../../components/Slots/Slots'
import SlotsWithoutProf from '../../../../components/Slots/SlotsWithoutProf/SlotsWithoutProf'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Modals from '../../../../components/UI/Modal/Modal'
import ModalFail from '../../../../components/UI/ModalFail/ModalFail'
import BookingForm from '../../../../components/BookingForm/BookingForm'
import axios from 'axios'
import moment from 'moment'
import * as actions from '../../../../store/actions/index'
class InstituteToken extends Component{
    constructor(props){
        super(props)
            this.state={
               dates:[],
               clickedFrst: false,
               clickedSecnd: false,
               clickedTrd: false,
               name:"",
               mobile:"",
               age:"",
               ageError:"",
               mobileError:"",
               nameError:"",
               instName:'',
               contact:'',
               location:'',
               email:'',
               gender:'MALE',
               profImg:'',
               istId:'',
               counterId:'',
               days:[ "SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"],
               slots:[],
               loading:true,
               selectedItem:"",
               id:'',
               bookingTime:'',
               slotid:'',
               date:'',
               show:false,
               tokenDateConv:'',
               showFail:false,
               bookingDate:''
               


        } 
    }
    componentDidMount(){
       const date = new Date()
       for(let i=0; this.state.dates.length < 3 ; i++){
        let month = date.toLocaleString('hd-IN', {month:'short'})
        let day = date.toLocaleString('en-US', {day:'2-digit'})
        const today = day + " " + month + " " + date.getFullYear()
         let { dates} = this.state;
         this.state.dates.push(today)
         this.setState({dates:dates})
         date.setDate(date.getDate()+1)
       } 
      this.setState({istId:this.props.match.params.istId})
       this.setState({counterId:this.props.match.params.counterId})
       const newDate =  moment(new Date()).format('YYYY-MM-DD')
       const newDay = new Date().getDay()
      axios.post('/front/token/slot/time',{istid:this.props.match.params.istId,counter:this.props.match.params.counterId,day:this.state.days[newDay ],date:newDate}) 
       .then(response=>{
            this.setState({slots:response.data,loading:false,date:newDate})
        }).catch((err) =>
        {
             console.log(err.response)
       })
        axios.post("/institute/home",{istId:this.props.match.params.istId})
        .then(response=>{
            this.setState({instName:response.data.ISTNAME,
            contact:response.data.MOBILE,
            location:response.data.ADDRESS,
            email: response.data.EMAIL,
            profImg: response.data.COMPANY_DP})
          
        }).catch((err) =>
          {
              console.log(err.response)
        })
   }
   nextDateChangeHandler = () =>{
       this.setState({loading:true})
            let frstDate = new Date(this.state.dates[0])
            frstDate.setDate(frstDate.getDate()+3)
            let currentItems = this.state.dates
            currentItems.splice(0,3)
            this.setState({dates:currentItems})
            for(let i=0; this.state.dates.length < 3 ; i++){
                let month = frstDate.toLocaleString('hd-IN', {month:'short'})
                let day = frstDate.toLocaleString('en-US', {day:'2-digit'})
                const nextDay = day + " " + month + " " + frstDate.getFullYear()
                 let { dates} = this.state;
                 this.state.dates.push(nextDay)
                 this.setState({dates:dates})
                 frstDate.setDate(frstDate.getDate()+1)
               } 
           
            this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
           const newDateNext =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
            const newDayNxt = new Date(this.state.dates[0]).getDay()
            this.setState({bookingDate:newDateNext})
          axios.post('/front/token/slot/time',{istid:this.state.istId,counter:this.state.counterId,day:this.state.days[newDayNxt],date:newDateNext})
       .then(response=>{
      
          this.setState({slots:response.data,loading:false,date:newDateNext})
         
       }).catch((err) =>
         {
             console.log(err.response)
       })

    }
    prevDateChangeHandler = () =>{
        this.setState({loading:true})
        let frstDate = new Date(this.state.dates[0])
        if(frstDate>new Date()){
        frstDate.setDate(frstDate.getDate()-3)
        let currentItems = this.state.dates
        currentItems.splice(0,3)
        this.setState({dates:currentItems})
        for(let i=0; this.state.dates.length < 3 ; i++){
            let month = frstDate.toLocaleString('hd-IN', {month:'short'})
            let day = frstDate.toLocaleString('en-US', {day:'2-digit'})
            const prevDay = day + " " + month + " " + frstDate.getFullYear()
             let { dates} = this.state;
             this.state.dates.push(prevDay)
             this.setState({dates:dates})
             frstDate.setDate(frstDate.getDate()+1)
           } 
           this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
           const newDatePrv =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
           const newDayPrv = new Date(this.state.dates[0]).getDay()
           this.setState({bookingDate:newDatePrv})
          axios.post('/front/token/slot/time',{istid:this.state.istId,counter:this.state.counterId,day:this.state.days[newDayPrv ],date:newDatePrv})
           .then(response=>{
               this.setState({slots:response.data,loading:false,date:newDatePrv})
             
           }).catch((err) =>
             {
                 console.log(err.response)
           })
       
        }
        else{
            this.setState({loading:false})
        }
       
    }
    ThrdDatestyleChangeHandler = () =>{
        this.setState({loading:true})
        this.setState({clickedSecnd:true,clickedTrd:false,clickedFrst:false})
        const newDateThrd =   moment(new Date(this.state.dates[1])).format('YYYY-MM-DD')
        const newDayTrd = new Date(this.state.dates[1]).getDay()
        this.setState({bookingDate:newDateThrd})
        axios.post('/front/token/slot/time',{istid:this.state.istId,counter:this.state.counterId,day:this.state.days[newDayTrd],date:newDateThrd})
        .then(response=>{
           this.setState({slots:response.data,loading:false,date:newDateThrd})
          
        }).catch((err) => 
          {
              console.log(err.response)
        })

    }
    secndDateStyleChangeHandler = () =>{
        this.setState({loading:true})
        this.setState({clickedTrd: true,clickedSecnd:false,clickedFrst:false})
        const newDateScnd =  moment(new Date(this.state.dates[2])).format('YYYY-MM-DD')
        const newDayScnd = new Date(this.state.dates[2]).getDay()
        this.setState({bookingDate:newDateScnd}) 
        axios.post('/front/token/slot/time',{istid:this.state.istId,counter:this.state.counterId,day:this.state.days[newDayScnd],date:newDateScnd})
        .then(response=>{
            this.setState({slots:response.data,loading:false,date:newDateScnd})
        }).catch((err) =>
          {
              console.log(err.response)
        })

    }
    frstDateStyleChangeHandler = () => {
        this.setState({loading:true})
        this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
       const newDateFrst =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
        const newDayFrst = new Date(this.state.dates[0]).getDay()
       this.setState({bookingDate:newDateFrst})
       axios.post('/front/token/slot/time',{istid:this.state.istId,counter:this.state.counterId,day:this.state.days[newDayFrst],date:newDateFrst})
        .then(response=>{
          
           this.setState({slots:response.data,loading:false,date:newDateFrst})
          
        }).catch((err) =>
          {
              console.log(err.response)
        })

    }
    inputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
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
        this.setState({showFail:false})
      
      }
    validate = () => {
        let nameError = "";
        let mobileError="";
       let ageError="";

        if (!this.state.name) {
            nameError = "This field is required";
            this.setState({nameError})
        }
       if (!this.state.mobile) {
            mobileError = "This field is required";
            this.setState({mobileError})
        }
        if (!this.state.age) {
            ageError = "EThis field is required";
            this.setState({ageError})
        }
        if ((this.state.mobile) && (this.state.mobile.length<10 || this.state.mobile.length>10)) {
            mobileError = "Mobile number should be 10 digits";
            this.setState({mobileError})
          }
        if (nameError || mobileError ||  ageError)  {
            this.setState({nameError,mobileError,ageError});
            return false;
          }
        
          return true
      
    } 
    handleSubmit = (e) =>{
        e.preventDefault()
        const isValidate =this.validate()
        if(isValidate){
            this.setState({nameError :""})
            this.setState({ageError :""})
            this.setState({mobileError:""})
            const inputs = {uid:this.props.uid,name:this.state.name.trim(),mobile:this.state.mobile,age:this.state.age,istid:this.state.istId,counter:this.state.counterId,gender:this.state.gender,
                slot:{token_no:this.state.id+1,time:this.state.bookingTime,slot_id:this.state.slotid,date:moment(new Date(this.state.date)).format('YYYY-MM-DD')},institute:this.state.instName}
               
                    const tokenDate = new Date(this.state.date)
                    const tokenDateConverted =  moment(tokenDate).format('YYYY-MM-DD')
                    if(this.props.isAuthenticated){
                            axios.post("/user/generate/token",inputs)
                            .then(response=>{
                               if(response.data.status){
                                    this.setState({show:true,tokenDateConv:tokenDateConverted})
                                    this.setState({name:"",age:"",mobile:""})
                                }
                                else{
                                    this.setState({name:"",age:"",mobile:"",showFail:true})

                                }
                            }).catch((err) =>
                            {
                                console.log(err.response)
                            })
                    }
                    else{
                        this.props.onUserTokenBooked(inputs)
                        this.props.history.push({
                            pathname: '/user/siginin/token/booking',
                            state: { detail: inputs }
                          })
                        }
        }
    }
    styleChangeHanldler = (index,time,slotId) =>{
        this.setState({id:index,bookingTime:time,slotid:slotId})
    }

    render(){
      
        let attachedFrstClass = [Classes.DateActiveItem,Classes.DateActiveBg]
        let attachedSecondClass = [Classes.DateSecondItem,Classes.DateScndBg]
        let attachedThrdClass = [Classes.DateThirdItem,Classes.DateThrdBg]
        if(this.state.clickedSecnd){
            attachedSecondClass = [Classes.DateActiveItem,Classes.DateActiveBg]
            attachedFrstClass =  [Classes.DateSecondItem,Classes.DateScndBg]
            attachedThrdClass = [Classes.DateThirdItem,Classes.DateThrdBg]
        }
        if(this.state.clickedTrd){
            attachedThrdClass = [Classes.DateActiveItem,Classes.DateActiveBg]
            attachedFrstClass =  [Classes.DateSecondItem,Classes.DateScndBg]
            attachedSecondClass = [Classes.DateThirdItem,Classes.DateThrdBg]
        }
        if(this.state.clickedFrst){
            attachedFrstClass = [Classes.DateActiveItem,Classes.DateActiveBg]
            attachedSecondClass = [Classes.DateSecondItem,Classes.DateScndBg]
            attachedThrdClass = [Classes.DateThirdItem,Classes.DateThrdBg]
        }
        let tokens;
        if(this.state.loading){
            tokens = <Spinner/>
        }
        else{
            tokens = (this.state.slots.length===0)?<p className={Classes.NoResults}>No Slot Available</p>:this.state.slots.map((item,index)=>{
               if(item.PRO_ID === 'NA'){
                    return(
                        <div className={Classes.SlotsPad} key={index}>
                            <SlotsWithoutProf  slotName={item.SLOT_NAME} >
                                <div className='row'> 
                               {item.TIME_PERIODS.map((priods,indexs)=>{
                                      if(typeof(priods)==='string'){
                                            let TokenClasses = [Classes.TokenLayout]
                                            if(this.state.id === indexs && this.state.slotid === item.SLOT_ID){
                                                 TokenClasses = [Classes.TokenLayout,Classes.TokenSelected]
                                             } 
                                                return(
                                                    <div className='col-md-3 col-sm-6 col-4 nopadmar' key={indexs}>
                                                        <div className={Classes.TokenPad}>
                                                            <div className={TokenClasses.join(' ')} onClick={()=>this.styleChangeHanldler(indexs,priods,item.SLOT_ID)}>
                                                                <h5 className={Classes.TokenName}>{priods}</h5> 
                                                            </div>
                    
                                                        </div>
                                                    </div> 
                                                )
                                         }
                            
                                        else{ 
                                            return(
                                                <div className='col-md-3 col-sm-6 col-4 nopadmar' key={indexs}>
                                                    <div className={Classes.TokenPad}>
                                                        <div className={Classes.TokenBooked}  >
                                                            <h5 className={Classes.TokenBookName}>{priods.time}</h5> 
                                                        </div>
                
                                                    </div>
                                                </div>
                                            )
                                        }
                                   
                                    })}
                                </div>
                            </SlotsWithoutProf> 
                       </div>      
                    )  
                  
                }
                else{
                    const profile = item.PROF_PHOTO
                    return(
                        <div className={Classes.SlotsPad} key={index}>
                            <Slots  profImg={profile} profName={item.FULLNAME} >
                                <div className='row'> 
                                
                                        {item.TIME_PERIODS.map((priods,indexs)=>{
                                            if(typeof(priods)==='string'){
                                                let TokenClasses = [Classes.TokenLayout]
                                                if(this.state.id === indexs && this.state.slotid === item.SLOT_ID){
                                                     TokenClasses = [Classes.TokenLayout,Classes.TokenSelected]
                                                 } 
                                       
                                                    return(
                                                        <div className='col-md-3 col-sm-6 col-4 nopadmar' key={indexs}>
                                                            <div className={Classes.TokenPad}>
                                                                <div className={TokenClasses.join(' ')} onClick={()=>this.styleChangeHanldler(indexs,priods,item.SLOT_ID)}>
                                                                    <h5 className={Classes.TokenName}>{priods}</h5> 
                                                                </div>
                        
                                                            </div>
                                                        </div>
                                                    )
                                             }
                                
                                            else{
                                                return(
                                                    <div className='col-md-3 col-sm-6 col-4 nopadmar' key={indexs}>
                                                        <div className={Classes.TokenPad}>
                                                            <div className={Classes.TokenBooked}  >
                                                                <h5 className={Classes.TokenBookName}>{priods.time}</h5> 
                                                            </div>
                    
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                </div>
                            </Slots>
                        </div>
                     ) 
                   
                }
             
               
            })
        }
  

        return(
        < ProfileDetailsLayout profName={this.state.instName} contact={this.state.contact} location={this.state.location} email={this.state.email} profImg={this.state.profImg === 'NA'? `/uploads/company_dp/defaulthos.jpg`:`/uploads/company_dp/${this.state.profImg}`}>
            < Modals shows={this.state.show} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!'
             body={'Your Booking is confirmed at'+ this.state.instName+ ' Token No' + (this.state.id+1) + ' Date'  + this.state.tokenDateConv + ' Time' + this.state.bookingTime}/>
             < ModalFail shows={this.state.showFail} hide={this.FailHandleClose} closeBtn={this.FailHandleUpdated} heading='Failed!'
             body={'Your are already booked in this slot!'}/>
        <div className={Classes.Tokens}>
            <div className='row'>
                    <div className={Classes.PrevBtn}>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img src={PrevIcon} alt='prevarrow' width='35px' height='35px' onClick={this.prevDateChangeHandler}/>
                        </div>
                    </div> 
                 
                    <div className={attachedFrstClass.join(' ')}  onClick={this.frstDateStyleChangeHandler}>
                        {this.state.dates[0]}
                    </div>
                    <div className={attachedSecondClass.join(' ')} onClick={this.ThrdDatestyleChangeHandler}>
                        {this.state.dates[1]}
                    </div>
                    <div className={attachedThrdClass.join(' ')} onClick={this.secndDateStyleChangeHandler}>
                        {this.state.dates[2]}
                    </div>
                    <div className={Classes.NextBtn}>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img src={NextIcon} alt='nextarrow' width='35px' height='35px' onClick={this.nextDateChangeHandler}/>
                        </div>
                    </div>
                  
            </div>
                { tokens} 
        </div>
            {this.state.slots.length!==0? <BookingForm changeHandler={this.inputChangeHandler} name={this.state.name} mob={this.state.mobile} 
             age={this.state.age} click={this.handleSubmit}nameErr={this.state.nameError} mobError={this.state.mobileError} 
             ageErr={this.state.ageError} btnDisable={this.state.id.length<1}/>:null}  
    </ProfileDetailsLayout>
    )
} 
} 

const mapStateToProps = state => {
    return {
      isAuthenticated:state.user.tokenId !== null,
     uid:state.user.tokenId,
     tokenDetails:state.user.tokenDetails
    };
  };
  const mapDispatchToProps = dispatch =>{
    return{
      onUserTokenBooked: (inputs) =>dispatch(actions.user_token_booked(inputs)),
    
    }
    
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(InstituteToken)