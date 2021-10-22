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
  import Classes from './InstituteCounter.module.css'
  import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
  import InstituteButton from '../../../../components/UI/Button/InstituteButton/InstituteButton'
  import  ModalConform from '../../../../components/UI/ModalConform/ModalConform'
  import Modals from '../../../../components/UI/Modal/Modal'
  

  class InstituteCounters extends Component{
    constructor(props){
      super(props)
          this.state={
              counters:  [],
              counter_id:null,
              show:false,
              arrayIndex:null,
              succesShow:false,
            
          
      }
  }
    componentDidMount(){
      this.getData()
     
      $(document).ready(function () {
        setTimeout(function(){
        $('#example').DataTable();
         } ,5000);
    });
     
  }
  getData = () =>{
    axios.post("/institute/list/counter",{istId:this.props.istId})
    .then(response=>{
     this.setState({
      counters:response.data,
        })
    })
    .catch((err) =>{
        console.log(err.response)
        
    })
  }
 
  handleClose = () => {
    this.setState({show:false})
  }
  counterIdSelecter = (id,index) =>{
    this.setState({counter_id:id,arrayIndex:index})
    this.setState({show:true})

  }
  successHandleClose = () =>{
    this.setState({succesShow:false})
  }
  successHandleUpdated = () =>{
    this.setState({succesShow:false})

  }


  UpdateCounterHandler = (selectedCounter) =>{
    this.props.history.push({
      pathname: '/institute/update/counterId='+selectedCounter.COUNTER_ID,
    
    })


  }
  deleteCounterHandler = () =>{
    axios.post("/institute/delete/counter",{id:this.state.counter_id})
      .then(response=>{
        this.setState({show:false})
        this.setState({succesShow:true})
        // let currentItems = this.state.counters
        // currentItems.splice(this.state.arrayIndex,1)
        // this.setState({counters:currentItems})
        this.getData()
      })
      .catch((err) =>{
          console.log(err.response)
    }) 
  
  }
  viewSlots = (counterId) =>{
    this.props.history.push({
      pathname: '/institute/view/slots/counterId='+counterId,
      
    })

  }
    render(){
      return(
          <InstituteHomeLayout>
            < Modals shows={this.state.succesShow} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!' body='Counters deleted successfully'/>
            <ModalConform shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} confirmBtn={this.deleteCounterHandler} 
                            heading='Delete Slots!' body='Are you sure, you want to delete this Counter?'/>
              <div className={Classes.CounterPad}>
                  <div className="container-fluid">
                     <h4  className='text-primary' style={style.ProfHead}>Counter</h4>
                       <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
                         <thead>
                            <tr>
                            <th>ID</th>
                              <th>Counter Name</th>
                              <th>Display Name</th>
                              <th>Service Name</th>
                              <th>Status</th>
                              <th>Remarks</th>
                              <th>Slots</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.state.counters.map((item,index) => {
                                return (
                                  <tr key={item.COUNTER_ID}>
                                      <td>{item.COUNTER_ID}</td>
                                      <td>{item.COUNTER_NAME}</td>
                                      <td>{item.DISPLAY_NAME}</td>
                                      <td>{item.SERVICE_NAME}</td>
                                      <td>{item.COUNTER_STATUS}</td>
                                      <td>{item.REMARKS}</td>
                                      <td><button className={Classes.ViewButton} onClick={()=>this.viewSlots(item.COUNTER_ID)}>View</button></td>
                                      <td>
                                          <div className={Classes.ButtonAlign}>
                                            <ul >
                                                <li><UserButton clicked={()=>{this.UpdateCounterHandler(item)}}>&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;</UserButton></li>&nbsp;&nbsp;
                                                <li><InstituteButton clicked={()=>this.counterIdSelecter(item.COUNTER_ID,index)}>Delete</InstituteButton></li>
                                            </ul>
                                          </div>
                                        </td>
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
      CounterHead:{
          paddingBottom: '25px',
          paddingTop:'20px',
         
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
  export default connect(mapStateToProps)(InstituteCounters)