import React from 'react'
import Classes from './DrConsultHosList.module.css'
import DoctorProfileLayout from '../../DoctProfDetailLayout/DoctProfDetailLayout'
import Hospital from '../../../../components/Institutes/Institute'
import axios from 'axios'
import { Component } from 'react'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class DrConsultHosList extends Component{
    constructor(props){
        super(props)
            this.state={
                dayId:'',
                profId:'',
                profName:'',
                profDp:'',
                loading:true,
                hospitals:[],
                education:'',
                speciality:''
            
            }
        }
    componentDidMount(){
        this.setState({dayId:this.props.match.params.dayId})
       
       axios.post("/institute/update/professional",{id:this.props.match.params.profid})
            .then(response=>{
                    this.setState({profName:response.data.FULLNAME,education:response.data.EDUCATION,profDp:response.data.PROF_PHOTO,profId:response.data.PROF_ID,speciality:response.data.SPECIALITY})
            })
            .catch((err) =>{
                console.log(err.response) 
                        
            })
            axios.post('/api/list/institute/by/profid/day',{prof_id:this.props.match.params.profid,slotDay:this.props.match.params.day})
                .then(response=>{
                    this.setState({loading:false,hospitals:response.data})

                })
                .catch((err)=>{
                    console.log(err.response);

                }) 
        }
    selectInstituteHandler = (istId) =>{
        this.props.history.push({pathname:'/doctor/hospital/counter_DayId='+this.props.match.params.dayId+'/day='+this.props.match.params.day+'/ProfId='+this.props.match.params.profid+'/InstituteId='+istId})
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
                                    email={item.EMAIL} clickIns={()=>this.selectInstituteHandler(item.ISTID)}
                                    HosCardBody={Classes.HosCardBody}
                                    InstLayout='col-lg-4 col-md-6 col-sm-12 col-6 HosNopadleft'
                                />
                            )
                    }) )
        }
    return(
        <div>
             <DoctorProfileLayout profName={this.state.profName} education={this.state.education} speciality={this.state.speciality}  profImg={`/uploads/professional_dp/${this.state.profDp}`}>
                 <div className={Classes.HosList}>
                    <div className='row nopadmar'>
                        {hosList}
                                       
                    </div>
                </div>
            </DoctorProfileLayout>

        </div> 

    )
    }
}
export default DrConsultHosList