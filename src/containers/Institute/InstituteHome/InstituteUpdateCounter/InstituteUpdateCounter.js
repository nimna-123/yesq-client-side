import React, { Component } from 'react'
import Classes from './InstituteUpdateCounter.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import axios from 'axios'
import Modals from '../../../../components/UI/Modal/Modal'
class InstituteUpdateCounter extends Component{
    constructor(props){
        super(props)
            this.state={
                counter_name:"",
                display_name:"",
                counter_status:"",
                service_name:"",
                remarks:"NA",
                counter_id:null,
                show:false,
                nameError:"",
                displayNameError:"",
                ServiceNameError:""



            }
        }
    componentDidMount(){
       axios.post("/institute/update/counter",{id:this.props.match.params.counterId})
        .then(response=>{
           this.setState({counter_id:response.data.COUNTER_ID,counter_name:response.data.COUNTER_NAME,display_name:response.data.DISPLAY_NAME,
            counter_status:response.data.COUNTER_STATUS,service_name:response.data.SERVICE_NAME,remarks:response.data.REMARKS})
            
        }).catch((err) =>
        {
             console.log(err.response)
        })
    
    }
    inputChangeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})

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
        let displayNameError = "";
        let ServiceNameError="";
       
       if (!this.state.counter_name) {
            nameError = "This field is required";
            this.setState({nameError})
          }
       if (!this.state.display_name) {
            displayNameError = "This field is required.";
            this.setState({displayNameError})
          }
          if (!this.state.service_name) {
            ServiceNameError= "This field is required.";
            this.setState({ServiceNameError})
          }
          
          if (nameError||displayNameError||ServiceNameError)  {
            this.setState({nameError,displayNameError ,ServiceNameError});
            return false;
          }
          return true
      
 }
    updateHandler = (e) =>{
      e.preventDefault()
      const isValidate =this.validate()
      if(isValidate){
        const inputs = {countername:this.state.counter_name,displayname:this.state.display_name,servicename:this.state.service_name,
                        counterstatus:this.state.counter_status,remarks:this.state.remarks,counterid:this.state.counter_id}
         axios.post('/api/institute/update/counter',inputs)
            .then(response=>{
              
                this.setState({show:true})
                
            }).catch((err) => 
            {
                 console.log(err.response)
            })
            this.setState({nameError:"",displayNameError:"",ServiceNameError:""})
        }
    }
    render(){
        let form = (
            <form className={Classes.FormPad} autoComplete='off'>
              <div className='row'>
                <div className='col-md-6'>
                    <div className={Classes.FormGroup}  >
                         <label htmlFor="counter_name" className={Classes.InputLabel}>Counter name</label>
                            <input 
                                type='text'
                                name="counter_name"
                                className="form-control"
                                style={style.Input}
                                value={this.state.counter_name}
                                onChange={this.inputChangeHandler}
                            />
                             <div className={Classes.ErrorMsg}>{this.state.nameError}</div>
                     </div>
                    <div className={Classes.FormGroup}  >
                        <label htmlFor="display_name" className={Classes.InputLabel}>Display name</label>
                            <input
                                type='text'
                                name="display_name"
                                className="form-control"
                                style={style.Input}
                                value={this.state.display_name}
                                onChange={this.inputChangeHandler}
                            />
                            <div className={Classes.ErrorMsg}>{this.state.displayNameError}</div>
                    </div>
                    <div className={Classes.FormGroupRemark}  >
                                <label htmlFor="counter_status" className={Classes.InputLabel}>Status</label>
                                    <div className='row rowmarprof'>
                                        <div className='col-md-4 '>
                                            <label >
                                                 <input 
                                                    type="radio" 
                                                    name="counter_status"
                                                    value='ACTIVE'
                                                    onChange={this.inputChangeHandler}
                                                    checked ={this.state.counter_status === 'ACTIVE'}  
                                                />&nbsp;&nbsp;&nbsp;Active
                                            </label>
                                        </div>
                                        <div className='col-md-4 nopadmar'>
                                            <label >
                                                <input 
                                                    type="radio"
                                                    name="counter_status" 
                                                    value='INACTIVE'
                                                    onChange={this.inputChangeHandler}
                                                    checked ={this.state.counter_status === 'INACTIVE'} 
                                                               
                                                />&nbsp;&nbsp;&nbsp;Inactive</label>
                                        </div>
                                    </div>
                    </div>
                   
                </div>
                <div className='col-md-6'>
                <div className={Classes.FormGroup}  >
                         <label htmlFor="service_name" className={Classes.InputLabel}>Service name</label>
                            <input 
                                type='text'
                                name="service_name"
                                className="form-control"
                                style={style.Input}
                                onChange={this.inputChangeHandler}
                                value={this.state.service_name}
                             />
                             <div className={Classes.ErrorMsg}>{this.state.ServiceNameError}</div>
                    </div>
                    <div className={Classes.FormGroup}  >
                         <label htmlFor="remarks" className={Classes.InputLabel}>Remarks</label>
                            <input 
                                type='text'
                                name="remarks"
                                className="form-control"
                                style={style.Input}
                                 onChange={this.inputChangeHandler}
                                 value={this.state.remarks}
                               
                                     />
                    </div>
                 </div>
                    <button className={Classes.UpdateBtn} onClick={this.updateHandler}>Update</button>
            </div>
        </form>
        )
        return(
            <InstituteHomeLayout>
                 < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleUpdated} heading='SUCCESS!' body='Successfully Updated'/>
                  <h3 className={Classes.MainHead}>Counter Edit</h3>
                  {form}
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
export default InstituteUpdateCounter