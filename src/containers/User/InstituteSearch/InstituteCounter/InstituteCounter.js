import React, { Component } from 'react'
import ProfileDetailsLayout from '../../ProfileDetailsLayout/ProfileDetailsLayout'
import {withRouter} from 'react-router-dom'
import Counter from '../../../../components/Counter/Counter'
import axios from 'axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class InstituteCounter extends Component{
    constructor(props){
        super(props)
            this.state={
              name:'',
              contact:'',
              location:'',
              email:'',
              profImg:  '',
              counters:[],
              loading: true
                 }
    }
    componentDidMount = () =>{
        axios.post("/institute/list/counter",{istId:this.props.match.params.istid})
        .then(response=>{
            this.setState({counters:response.data})
        })
        .catch((err) =>{
            console.log(err.response)
        })
        axios.post("/institute/home",{istId:this.props.match.params.istid})
        .then(response=>{
            this.setState({name:response.data.ISTNAME,
            contact:response.data.MOBILE,
            location:response.data.ADDRESS,
                email: response.data.EMAIL,
             profImg: response.data.COMPANY_DP,
            loading:false})   
          
        }).catch((err) =>
          {
              console.log(err.response)
        })
    }
    counterSelectHandler = (slectCounter) =>{
        this.props.history.push({
            pathname: '/institute_counter_COUNTERID='+slectCounter+'/ISTID='+this.props.match.params.istid,
           
          })

    }
    render(){
        let counters;
        if(this.state.loading){
            counters = <Spinner/>
        }
        else{
            counters = (this.state.counters.length===0)?<p className='NoResults'>No results</p>:this.state.counters.map((item,index)=>{
               return(
                < Counter countername={item.DISPLAY_NAME} key={item.COUNTER_ID} click={()=>this.counterSelectHandler(item.COUNTER_ID)}/>
                )
            })
        }
    return(
        <ProfileDetailsLayout profName={this.state.name} contact={this.state.contact} location={this.state.location} email={this.state.email}
          profImg={this.state.profImg === 'NA'? `/uploads/company_dp/defaulthos.jpg`:`/uploads/company_dp/${this.state.profImg}`}>
            <div style={style.Counters}>
                <div className='row nopadmar'> 
                     {counters}
                </div> 
            </div>
        </ProfileDetailsLayout>
        
    )
}
}   
const style={
    Counters:{
        padding: '15px 0px'
    },
   
}


export default withRouter(InstituteCounter)