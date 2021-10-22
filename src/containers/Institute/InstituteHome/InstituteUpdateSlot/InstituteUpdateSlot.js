import React,{Component} from 'react'
import Classes from './InstituteUpdateSlot.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import axios from 'axios'
import Modals from '../../../../components/UI/Modal/Modal'
import moment from 'moment'
class InstituteUpdateSlot extends  Component{
    constructor(props){
        super(props)
            this.state={
              profList:[],
              professional:"NA",
              slot_name:"",
              slot_status:"",
              remarks:"NA",
              slot_end:"",
              slot_intrvl:"",
              slot_start:"",
              slotId:"",
              show:false,
              slotStartError:"",
              nameError:"",
              slotEndError:"",
              SlotIntError:"",
              profName:"No professional",
              profId:'NA',
              slotDay:'',
             days:['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']

        }  
    }
    componentDidMount(){ 
        axios.post("/institute/edit/slot",{id:this.props.match.params.slotId})
        .then(response=>{
            
           const slotStartTime = response.data.SLOT_START
                var convertedStartTime = moment(slotStartTime, 'hh:mm A').format('HH:mm')
                const slotEndTime = response.data.SLOT_END
                var convertedEndTime = moment(slotEndTime, 'hh:mm A').format('HH:mm')
                this.setState({slotId:response.data.SLOT_ID,slot_name:response.data.SLOT_NAME,slot_status:response.data.SLOT_STATUS,remarks:response.data.REMARKS,slot_end:convertedEndTime,slot_intrvl:response.data.SLOT_INTERVAL,slot_start:convertedStartTime,profId:response.data.PRO_ID,slotDay:response.data.SLOT_DAY})
                if(response.data.PRO_ID !== 'NA'){
                    axios.post("/institute/update/professional",{id:response.data.PRO_ID})
                    .then(resp=>{
                            this.setState({profName:resp.data.FULLNAME,professional:resp.data.PROF_ID})
                    })
                    .catch((err) =>{
                        console.log(err.response) 
                                
                    })

                }
               
        }).catch((err) =>
        {      
             console.log(err.response)
        })
   
    axios.post("/institute/view/professionals")
        .then(response=>{
            this.setState({profList:response.data})
          
        }).catch((err) =>
          {
              console.log(err.response)
        })
    }
    inputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
     }
     radioChangeHandler = (e) =>{
        this.setState({slot_status:e.target.value})

     }
     handleUpdated = () =>{
        this.setState({show:false})
        this.props.history.goBack()
     }
     handleClose = () => {
        this.setState({show:false})
     }
     validate = () => {
        let nameError = "";
        let slotStartError = "";
        let slotEndError="";
        let SlotIntError = "";
       
       
       if (!this.state.slot_name) {
            nameError = "This field is required";
            this.setState({nameError})
          }
       if (!this.state.slot_start) {
            slotStartError = "This field is required.";
            this.setState({slotStartError})
          }
          if (!this.state.slot_end) {
            slotEndError= "This field is required.";
            this.setState({slotEndError})
          }
          if (!this.state.slot_intrvl) {
            SlotIntError= "This field is required.";
            this.setState({SlotIntError})
          }
         
          if (nameError||slotStartError||slotEndError||SlotIntError)  {
            this.setState({nameError,slotStartError,slotEndError,SlotIntError});
            return false;
          }
          return true
      
 }
 
     updateHandler= (e) =>{
         e.preventDefault()
         const inputs = {slot_id:this.state.slotId,prof_id:this.state.professional,slotname:this.state.slot_name,startTime:this.state.slot_start,endTime:this.state.slot_end,slotInterval:this.state.slot_intrvl,status:this.state.slot_status,remarks:this.state.remarks,slotDay:this.state.slotDay}
            const isValidate =this.validate()
            if(isValidate){
                axios.post("/institute/update/slot",inputs)
                .then(response=>{
                this.setState({show:true})
                }).catch((err) =>
                {
                    console.log(err.response)
                })
                this.setState({nameError:"",slotStartError:"",slotEndError:"",SlotIntError:""})
             }
        }
   
    
    render(){
        let optns;
       if(this.state.professional === 'NA'){
           optns = (  <select 
            type='text'
            name="professional"
            className="form-control"
            value = {this.state.professional}
            onChange={this.inputChangeHandler}
            style={style.Input}
            >           
                      <option value='NA'>No Professional</option>
                            {this.state.profList.map(optn =>{
                            return<option  key={optn.PROF_ID} value={optn.PROF_ID}>{optn.FULLNAME}</option>
                        })}
                    </select>)
       }
       else{
        optns = (  <select 
            type='text'
            name="professional"
            className="form-control"
            value = {this.state.professional}
            onChange={this.inputChangeHandler}
            style={style.Input}
            >           
                      <option disabled selected hidden>{this.state.profName}</option>
                            {this.state.profList.map(optn =>{
                            return<option  key={optn.PROF_ID} value={optn.PROF_ID}>{optn.FULLNAME}</option>
                        })}
                        <option  value='NA'>No professional</option>
                        
                    </select>) 

       }
       let dayOption;
       if(this.state.slotDay !== ''){
        dayOption = (  <select 
            type='text'
            name="slotDay"
            className="form-control"
            value = {this.state.slotDay}
            onChange={this.inputChangeHandler}
            style={style.Input}
            >           
                {this.state.days.map(day =>{
                            return<option  key={day} value={day}>{day}</option>
                        })}
                    </select>)
       }
       
     

       
    
       
        return(
            <InstituteHomeLayout>
                 < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleUpdated} heading='SUCCESS!' body='Successfully Updated'/>
                  <h3 className={Classes.MainHead}>Slot Edit</h3>
                  <form className={Classes.FormPad} autoComplete='off'>
              <div className='row'>
                    <div className='col-md-4'>
                            <div className={Classes.FormGroup}  >
                                <label htmlFor="prof" className={Classes.InputLabel}>Select Professional</label>
                                {optns}
                              
                    </div>
                    <div className={Classes.FormGroup}  >
                                <label htmlFor="slot_name" className={Classes.InputLabel}>Slot name</label>
                                    <input 
                                        type='text'
                                        name="slot_name"
                                        className="form-control"
                                        style={style.Input}
                                        value={this.state.slot_name}
                                        onChange={this.inputChangeHandler}
                                    />
                                     <div className={Classes.ErrorMsg}>{this.state.nameError}</div>
                     </div>
                    <div className={Classes.FormGroupRemark}  >
                                <label htmlFor="slot_status" className={Classes.InputLabel}>Slot status:</label>
                                    <div className='row rowmarprof'>
                                        <div className='col-md-4 '>
                                            <label >
                                                 <input 
                                                    type="radio" 
                                                    name="slot_status"
                                                    value='OPEN'
                                                    onChange={this.radioChangeHandler}
                                                    checked ={this.state.slot_status === 'OPEN'}  
                                                />&nbsp;&nbsp;&nbsp;Open
                                            </label>
                                        </div>
                                        <div className='col-md-4 nopadmar'>
                                            <label >
                                                <input 
                                                    type="radio"
                                                    name="slot_status" 
                                                    value='CLOSE'
                                                    onChange={this.radioChangeHandler}
                                                    checked ={this.state.slot_status === 'CLOSE'} 
                                                    required
                                                               
                                                />&nbsp;&nbsp;&nbsp;Close</label>
                                        </div>
                                    </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className={Classes.FormGroup}  >
                         <label htmlFor="remarks" className={Classes.InputLabel}>Remarks</label>
                            <input 
                                type='text'
                                name="remarks"
                                className="form-control"
                                style={style.Input}
                                value={this.state.remarks}
                                onChange={this.inputChangeHandler}
                            />
                             
                     </div>
                    <div className={Classes.FormGroup}  >
                        <label htmlFor="slot_end" className={Classes.InputLabel}>Slot end</label>
                            <input
                                type='time'
                                name="slot_end"
                                className="form-control"
                                style={style.Input}
                                value={this.state.slot_end}
                                onChange={this.inputChangeHandler}
                            />
                            <div className={Classes.ErrorMsg}>{this.state.slotEndError}</div>
                    </div>
                    <div className={Classes.FormGroup}  >
                         <label htmlFor="slot_intervl" className={Classes.InputLabel}>Slot interval in minutes</label>
                            <input 
                                type='text'
                                name="slot_intrvl"
                                className="form-control"
                                style={style.Input}
                                value={this.state.slot_intrvl}
                                onChange={this.inputChangeHandler}
                                
                            />
                            <div className={Classes.ErrorMsg}>{this.state.SlotIntError}</div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className={Classes.FormGroup}  >
                         <label htmlFor="slot_start" className={Classes.InputLabel}>Slot start</label>
                            <input 
                                type='time'
                                name="slot_start"
                                className="form-control"
                                style={style.Input}
                                 onChange={this.inputChangeHandler}
                                 value={this.state.slot_start}
                            />
                            <div className={Classes.ErrorMsg}>{this.state.slotStartError}</div>
                    </div>
                    <div className={Classes.FormGroup}  >
                    <label htmlFor="day" className={Classes.InputLabel}>Select Day</label>
                    {dayOption}
                             
                             
                     </div>
                 </div>
                    <button className={Classes.UpdateBtn} onClick={this.updateHandler}>Update</button>
            </div>
        </form>
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
export default InstituteUpdateSlot 