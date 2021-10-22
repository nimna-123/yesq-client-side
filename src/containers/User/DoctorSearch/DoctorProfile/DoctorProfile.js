import React from 'react'
import Classes from './DoctorProfile.module.css'
import DoctorProfileLayout from '../../DoctProfDetailLayout/DoctProfDetailLayout'
import Hospital from '../../../../components/Institutes/Institute'
import Days from '../../../../components/Days/Days'
import { Component } from 'react'
import axios from 'axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class DoctorProfile extends Component{
        constructor(props){
                super(props)
                    this.state={
                     days:[{id:0,dayName:'SUNDAY'},{id:1,dayName:'MONDAY'},{id:2,dayName:'TUESDAY'},{id:3,dayName:'WEDNESDAY'},{id:4,dayName:'THURSDAY'},{id:5,dayName:'FRIDAY'},{id:6,dayName:'SATURDAY'}],
                     profId:'',
                     profName:'',
                     location:'',
                     phone:'',
                     email:'',
                     profDp:'',
                     hospitals:[],
                     day:'NA',
                     loading:true,
                     education:'',
                     speciality:''
                    }

                }
        componentDidMount(){
               axios.post("/institute/update/professional",{id:this.props.match.params.profid})
                 .then(response=>{
                         this.setState({profName:response.data.FULLNAME,education:response.data.EDUCATION,profDp:response.data.PROF_PHOTO,profId:response.data.PROF_ID,speciality:response.data.SPECIALITY})
                 })
                .catch((err) =>{
                        console.log(err.response) 
                        
                })
                axios.post('/api/list/institute/by/professional',{prof_id:this.props.match.params.profid})
                .then(response=>{
                        this.setState({hospitals:response.data,loading:false})
                })
                .catch((err) =>{
                        console.log(err.response);
                })
        }
        selectHandler = (item) =>{
                this.props.history.push({pathname:'/doctor/hospital/lists_DayId='+item.id+'/day='+item.dayName+'/ProfId='+this.props.match.params.profid})
        }
        instHosBookingSelHandler = (istId) =>{
                this.props.history.push({pathname:'/doctor/hospital/counter_ProfId='+this.props.match.params.profid+'/InstituteId='+istId})
        }
        render(){
                let hosList;
                if(this.state.loading){
                        hosList = <Spinner/>
                }
                else{
                        hosList =  (this.state.hospitals.length === 0?<p className='NoResults'>No results</p>:this.state.hospitals.map((item,index)=>{
                                return(
                                        <Hospital instName={item.ISTNAME} 
                                        location={item.LOCATION} phnno={item.MOBILE}
                                        instImage={item.COMPANY_DP} key={item.ISTID}
                                            email={item.EMAIL} clickIns={()=>this.instHosBookingSelHandler(item.ISTID)}
                                            HosCardBody={Classes.HosCardBody}
                                            InstLayout='col-lg-4 col-md-6 col-sm-12 col-6 HosNopadleft'
                                        />
                                    )
                            }) )
                }
        return(
        <DoctorProfileLayout profName={this.state.profName} education={this.state.education} speciality={this.state.speciality}  profImg={`/uploads/professional_dp/${this.state.profDp}`}>
                <div className={Classes.Days}>
                        <div className={Classes.SelectDay}>
                                <h4>Choose a Perticular Days</h4>
                        </div>
                        <div className='row nopadmar'>
                                {this.state.days.map((item,index)=>{
                                        return(
                                                <Days day={item.dayName} key={index} clicked={()=>this.selectHandler(item)}/>
                                        )
                                })}
                        </div>
                </div> 
                <div className={Classes.HosLists}>
                        <div className={Classes.HosList}>
                                <div className={Classes.SelectHos}>
                                        <h4>Choose a Hospital Consulted By {this.state.profName} </h4>
                                 </div>
                                <div className='row nopadmar'>
                                        {hosList}
                               
                                </div>
                        </div>
                </div>

            </DoctorProfileLayout>
                )
        }
}
export default DoctorProfile