import React from 'react'
import ProfileDetailsLayout from '../../ProfileDetailsLayout/ProfileDetailsLayout'
import axios from 'axios'
import { Component } from 'react'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Counter from '../../../../components/Counter/Counter'

class DrConsultHosCounterList extends Component{
    constructor(props){
        super(props)
            this.state={
              instName:'',
                location:'',
                contact:'',
                email:'',
                profImg:'',
                loading:true,
                counter:[]
            
            }
        }
    componentDidMount(){
            axios.post("/institute/home",{istId:this.props.match.params.istId})
            .then(response=>{
                this.setState({instName:response.data.ISTNAME,
                    contact:response.data.MOBILE,
                    location:response.data.ADDRESS,
                    email: response.data.EMAIL,
                    profImg: response.data.COMPANY_DP})
            })
            .catch((err) =>{
                console.log(err.response) 
                        
            })
            axios.post('/api/list/counter/by/professional',{prof_id:this.props.match.params.profid,istId:this.props.match.params.istId})
                .then(response=>{
                   this.setState({counter:response.data,loading:false})

                })
                .catch((err)=>{
                    console.log(err.response);

                }) 
        }
  
    counterSelectHandler = (counterId) =>{
        // this.props.history.push({pathname:'/'})
        this.props.history.push({pathname:'/doctor/hospital_list/token/book_ProfId='+this.props.match.params.profid+'/InstituteId='+this.props.match.params.istId+'/counter_id='+counterId})

    }
    render(){
        let counterList;
        if(this.state.loading){
            counterList = <Spinner/>
        }
        else{
            counterList =  (this.state.counter.length === 0?<p className='NoResults'>No results</p>:this.state.counter.map((item,index)=>{
                        return(
                            < Counter countername={item.DISPLAY_NAME} key={item.COUNTER_ID} click={()=>this.counterSelectHandler(item.COUNTER_ID)}/>
                            )
                    }) )
        }
    return(
            <div>
           
             < ProfileDetailsLayout profName={this.state.instName} contact={this.state.contact} location={this.state.location} email={this.state.email} profImg={this.state.profImg === 'NA'? `/uploads/company_dp/defaulthos.jpg`:`/uploads/company_dp/${this.state.profImg}`}>
                <div style={style.CounterPad}>
                    <div className='row nopadmar'>
                        {counterList}
                    </div>
                </div>
              </ProfileDetailsLayout>
            </div> 
        )
    }
}
const style={
    CounterPad:{
        paddingTop:'20px',
        paddingBottom:'20px'
    }
}
export default DrConsultHosCounterList