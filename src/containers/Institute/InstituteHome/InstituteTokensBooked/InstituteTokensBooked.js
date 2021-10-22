import React, { Component } from 'react'
import { connect } from 'react-redux';
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';  

class InstituteTokensBooked extends Component{
  constructor(props){
    super(props)
        this.state={
           bookedToken:  []
        
    }
}
componentDidMount(){
    axios.post("/institute/active/tokens",{istId:this.props.istId})
    .then(response=>{
      
     this.setState({bookedToken:response.data})
     
    })
    .catch((err) =>{
        console.log(err.response)
        
    })
    $(document).ready(function () {
      setTimeout(function(){
      $('#example').DataTable();
       } ,5000);
    });
  }
  render(){
  return(
        <InstituteHomeLayout>
            <div style={style.TokenBookedPad}>
                  <div className="container-fluid">
                     <h4  className='text-primary' style={style.ProfHead}>Tokens Booked</h4>
                       <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
                         <thead>
                            <tr>
                              <th>Token</th>
                              <th>Name</th>
                              <th>Contact</th>
                              <th>Counter</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Patient details</th>
                            <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.bookedToken.map((item,index)=>{
                            return(
                              <tr key={item.TOKEN_ID}>
                              <td>{item.TOKEN_NO}</td>
                              <td>{item.FULLNAME}</td>
                              <td>{item.MOBILE}</td>
                              <td>{item.COUNTER_ID}</td>
                              <td>{item.TOKEN_DATE}</td>
                              <td>{item.TOKEN_TIME}</td>
                              <td>{item.REMARKS}</td>
                              <td>{item.TOKEN_STATUS}</td>
                         </tr>
                           )
                          })} 
                        </tbody>
                      </table>
                    </div>
          </div>
        </InstituteHomeLayout>
    )
}
}
const style={
    TokenBookedPad:{
        padding:'30px 50px 80px 40px'
    },
    CounterHead:{
        paddingBottom:'25px'
    },
    ProfHead:{
      paddingBottom:'10px'
    }
}
const mapStateToProps = state =>{
  return{

      istId:state.institute.istId
  }
}

export default connect(mapStateToProps)(InstituteTokensBooked)