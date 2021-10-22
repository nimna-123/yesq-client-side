import React,{Component} from 'react'
import ProfileDetailsLayout from '../../ProfileDetailsLayout/ProfileDetailsLayout'
import Classes from './DoctorTokenBook.module.css'
import moment from 'moment'
import {connect} from 'react-redux'
import PrevIcon from '../../../../assets/images/prevIcon.png'
import NextIcon from '../../../../assets/images/nextIcon.png'
import BookingForm from '../../../../components/BookingForm/BookingForm'
import axios from 'axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Slots from '../../../../components/Slots/SlotsWithoutProf/SlotsWithoutProf'
import * as actions from '../../../../store/actions/index'
import Modals from '../../../../components/UI/Modal/Modal'
import ModalFail from '../../../../components/UI/ModalFail/ModalFail'

class DoctorTokenBook extends Component{
    constructor(props){
        super(props)
            this.state={
               clickedFrst: false,
                clickedSecnd: false,
                clickedTrd: false,
                name:"",
                mobile:"",
                age:"",
                gender:'MALE',
                ageError:"",
                mobileError:"",
                nameError:"",
                counterId:'',
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
                bookingDate:'',
                profName:'',
                instName:'',
                location:'',
                contact:'',
                email:'',
                profImg:'',
                daysList:[],
                days : ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'],
                dates : [],
                dayArray:[],
                consltDays:[],
                startDate:'',
                counterName:''
               
              
               
            }
        }
    componentDidMount(){
        axios.all([axios.post(`/institute/update/professional`,{id:this.props.match.params.profid}),
        axios.post(`/institute/home`,{istId:this.props.match.params.istId}),
        axios.post(`/institute/update/counter`,{id:this.props.match.params.counterId})])
        .then(axios.spread((profResponse, instResponse,counterResponse) => { 
            this.setState({profName:profResponse.data.FULLNAME})
            this.setState({counterName:counterResponse.data.DISPLAY_NAME})
            this.setState({instName:instResponse.data.ISTNAME,
            contact:instResponse.data.MOBILE,
            location:instResponse.data.ADDRESS,
            email: instResponse.data.EMAIL,
            profImg: instResponse.data.COMPANY_DP}) 
        })).catch(error => console.log(error)); 
       axios.post('/api/list/day/by/institute/counter/professional',{counterId:this.props.match.params.counterId,istId:this.props.match.params.istId,profId:this.props.match.params.profid})
            .then(response=>{
                const distnctDay = [...new Set(response.data.map(el=>el.SLOT_DAY))]
                this.setState({consltDays:distnctDay})
                const dayarray= response.data.map((item)=>{
                    return this.state.days.indexOf(item.SLOT_DAY)
                  })
                  this.setState({dayArray:dayarray})
                  let today = new Date()
                    for(let i=0; this.state.dates.length < 3 ; i++){
                        const day = today.getDay()
                        if(dayarray.includes(day)){
                            let month = today.toLocaleString('hd-IN', {month:'short'})
                            let day = today.toLocaleString('en-US', {day:'2-digit'})
                            const date = day + " " + month + " " + today.getFullYear()
                            let { dates} = this.state;
                            this.state.dates.push(date)
                            this.setState({dates:dates})
                        }
                            today.setDate(today.getDate()+1) 
                    }
                    this.setState({startDate:this.state.dates[0]})
                  const currentDate =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
                   const currentDay = new Date(this.state.dates[0]).getDay()
                   this.setState({bookingDate:currentDate})
                axios.post('/front/token/slot/time/by/professional',{date:currentDate,day:this.state.days[currentDay],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
                .then(response=>{
                   
                    this.setState({slots:response.data,loading:false,date:currentDate})

                }).catch((err)=>{ 
                    
                })
            })
            .catch(err=>{
                console.log(err); 
            })
        }
        nextDateChangeHandler = () =>{
                this.setState({loading:true,id:''})
                 let nextDate = new Date(this.state.dates[2])
                 nextDate.setDate(nextDate.getDate()+1)
                let currentItems = this.state.dates
                 currentItems.splice(0,3)
                 this.setState({dates:currentItems})
                 this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
                 for(let i=0; this.state.dates.length < 3 ; i++){
                    const nextDay = nextDate.getDay()
                        if(this.state.dayArray.includes(nextDay)){
                        let month = nextDate.toLocaleString('hd-IN', {month:'short'})
                        let day = nextDate.toLocaleString('en-US', {day:'2-digit'})
                        const date = day + " " + month + " " + nextDate.getFullYear()
                        let { dates} = this.state;
                        this.state.dates.push(date)
                        this.setState({dates:dates})
                     }
                        nextDate.setDate(nextDate.getDate()+1)
                }
                const currentDate =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
                const currentDay = new Date(this.state.dates[0]).getDay()
                this.setState({bookingDate:currentDate})
                axios.post('/front/token/slot/time/by/professional',{date:currentDate,day:this.state.days[currentDay],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
                .then(response=>{
                   this.setState({slots:response.data,loading:false,date:currentDate})
                    }).catch((err)=>{
                })
        }  
         prevDateChangeHandler = () =>{
             this.setState({id:''})
           let prevDate = new Date(this.state.dates[0])
            if(prevDate>new Date(this.state.startDate)){
                this.setState({loading:true})
                prevDate.setDate(prevDate.getDate()-1)
                let currentItems = this.state.dates
                currentItems.splice(0,3)
                this.setState({dates:currentItems})
                this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
                for(let i=0; this.state.dates.length < 3 ; i++){
                    const prevDay = prevDate.getDay()
                        if(this.state.dayArray.includes(prevDay)){
                        let month = prevDate.toLocaleString('hd-IN', {month:'short'})
                        let day = prevDate.toLocaleString('en-US', {day:'2-digit'})
                        const date = day + " " + month + " " + prevDate.getFullYear()
                        let { dates} = this.state;
                        this.state.dates.unshift(date)
                        this.setState({dates:dates})
                        }
                        prevDate.setDate(prevDate.getDate()-1)
                    } 
                    const currentDate =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
                    const currentDay = new Date(this.state.dates[0]).getDay()
                    this.setState({bookingDate:currentDate})
                    axios.post('/front/token/slot/time/by/professional',{date:currentDate,day:this.state.days[currentDay],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
                    .then(response=>{
                        this.setState({slots:response.data,loading:false,date:currentDate})
                    }).catch((err)=>{
                        
                    })
            }
          
        }
            
         ThrdDatestyleChangeHandler = () =>{
            this.setState({id:''})
             this.setState({loading:true})
             this.setState({clickedSecnd:true,clickedTrd:false,clickedFrst:false})
             const newDateThrd =   moment(new Date(this.state.dates[1])).format('YYYY-MM-DD')
             const newDayTrd = new Date(this.state.dates[1]).getDay()
             this.setState({bookingDate:newDateThrd})
            axios.post('/front/token/slot/time/by/professional',{date: newDateThrd,day:this.state.days[newDayTrd],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
             .then(response=>{
                this.setState({slots:response.data,loading:false,date:newDateThrd})
                }).catch((err)=>{
                 
            })
        }
         secndDateStyleChangeHandler = () =>{
            this.setState({id:''})
             this.setState({loading:true})
             this.setState({clickedTrd: true,clickedSecnd:false,clickedFrst:false})
             const newDateScnd =  moment(new Date(this.state.dates[2])).format('YYYY-MM-DD')
             const newDayScnd = new Date(this.state.dates[2]).getDay()
            this.setState({bookingDate:newDateScnd}) 
             axios.post('/front/token/slot/time/by/professional',{date:newDateScnd,day:this.state.days[newDayScnd],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
             .then(response=>{
                this.setState({slots:response.data,loading:false,date:newDateScnd})
            }).catch((err)=>{
                 
             })
        }
         frstDateStyleChangeHandler = () => {
            this.setState({id:''})
             this.setState({loading:true})
             this.setState({clickedFrst:true,clickedSecnd:false,clickedTrd:false})
            const newDateFrst =  moment(new Date(this.state.dates[0])).format('YYYY-MM-DD')
             const newDayFrst = new Date(this.state.dates[0]).getDay()
            this.setState({bookingDate:newDateFrst})
            axios.post('/front/token/slot/time/by/professional',{date:newDateFrst,day:this.state.days[newDayFrst],istid:this.props.match.params.istId,counter:this.props.match.params.counterId,profId:this.props.match.params.profid})
             .then(response=>{
               this.setState({slots:response.data,loading:false,date:newDateFrst})
                }).catch((err)=>{
                 
                })
             } 
    InputChangeHamdler = (e) =>{
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
    styleChangeHanldler = (index,time,slotId) =>{
        this.setState({id:index,bookingTime:time,slotid:slotId})
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const isValidate =this.validate()
        if(isValidate){
            this.setState({nameError :""})
            this.setState({ageError :""})
            this.setState({mobileError:""})
        const inputs = {
            uid:this.props.uid, name:this.state.name.trim(),age:this.state.age,mobile:this.state.mobile,gender:this.state.gender,istid:this.props.match.params.istId,counter:this.props.match.params.counterId, slot:{token_no:this.state.id+1,time:this.state.bookingTime,slot_id:this.state.slotid,date:moment(new Date(this.state.date)).format('YYYY-MM-DD')},institute:this.state.instName}
        if(this.props.isAuthenticated){
            axios.post("/user/generate/token",inputs)
            .then(response=>{
                const tokenDate = new Date(this.state.date)
                    const tokenDateConverted =  moment(tokenDate).format('YYYY-MM-DD')
                if(response.data.status){
                this.setState({tokenDateConv:tokenDateConverted,show:true})
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
            tokens=<Spinner/>
        }else{
            tokens = ( this.state.slots.length === 0?<p className={Classes.NoResults}>No Slots Available</p>:
                this.state.slots.map((item,index)=>{
                    return(
                     <div className={Classes.SlotsPad} key={index}>
                       <Slots slotName={item.SLOT_NAME} >
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
                })
          
            )

        }
      
       let days = (this.state.consltDays.map((item,index)=>{
           return( <li key={index}>{item+','}</li>)
          
       }))
      
       return(
        < ProfileDetailsLayout profName={this.state.instName} contact={this.state.contact} location={this.state.location} email={this.state.email} profImg={this.state.profImg === 'NA'? `/uploads/company_dp/defaulthos.jpg`:`/uploads/company_dp/${this.state.profImg}`}>
              < Modals shows={this.state.show} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!'
             body={'Your Booking is confirmed at'+ this.state.instName+ ',counter:'+this.state.counterName+ ' Token No:' + (this.state.id+1) + ' Date:'  + this.state.tokenDateConv + ' Time:' + this.state.bookingTime}/>
             < ModalFail shows={this.state.showFail} hide={this.FailHandleClose} closeBtn={this.FailHandleUpdated} heading='Failed!'
             body={'Your are already booked in this slot!'}/>
                <ul className={Classes.ListDays}>
                      <li><span className={Classes.ProfName}>{this.state.profName.toUpperCase()}</span> Available in</li><br/>
                          {days}
                </ul>
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
                    {tokens } 
                </div>
                {this.state.slots.length!==0? <BookingForm changeHandler={this.InputChangeHamdler} name={this.state.name} mob={this.state.mobile} age={this.state.age} click={this.handleSubmit}nameErr={this.state.nameError} mobError={this.state.mobileError} 
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
export default connect(mapStateToProps,mapDispatchToProps)(DoctorTokenBook)

