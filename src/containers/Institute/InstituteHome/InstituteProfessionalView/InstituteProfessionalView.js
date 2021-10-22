import React, { Component } from 'react'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import Classes from'./InstituteProfessionalView.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 
import {withRouter} from 'react-router-dom'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import InstituteButton from '../../../../components/UI/Button/InstituteButton/InstituteButton'
import axios from 'axios'
import ModalConform from '../../../../components/UI/ModalConform/ModalConform'
import Modals from '../../../../components/UI/Modal/Modal'


class InstituteProfessionalView extends Component{
  constructor(props){
    super(props)
        this.state={
            profList:  [],
            show: false,
           profsId:null,
           arrayKey:null,
           succesShow:false,
           data: [],
           cols:[]
       }
}
  componentDidMount(){
   
    axios.post("/institute/view/professionals")
    .then(response=>{
     
    this.setState({
     
        profList:response.data,
      })
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

  successHandleClose = () =>{
    this.setState({succesShow:false})
  }
  successHandleUpdated = () =>{
    this.setState({succesShow:false})

  }

  handleClose = () => {
    this.setState({show:false})
  }
  handleShow = () => {
    this.setState({show:true})
  };
  deleteConfirmHandler = () =>{
  this.setState({deletes:true})
  }
  selectIdHandler = (profId,key) =>{
    this.setState({profsId:profId,arrayKey:key})
    this.setState({show:true})

  }
  

deleteProfHandler = () =>{
 axios.post("/institute/delete/professional/account",{id:this.state.profsId})
    .then(response=>{
      this.setState({show:false})
      this.setState({succesShow:true})
      let currentItems = this.state.profList
      currentItems.splice(this.state.arrayKey,1)
      this.setState({profList:currentItems})
     
    
    })
    .catch((err) =>{
        console.log(err.response)
        
    })

}
updateProfHandler = (selectedItem) =>{
  this.props.history.push({
    pathname: '/institute/update/professional/profId='+selectedItem.PROF_ID,
   
  })

}
  render(){
    return(
        <InstituteHomeLayout >
           < Modals shows={this.state.succesShow} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!' body='Account deleted successfully'/>
           <ModalConform shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} confirmBtn={this.deleteProfHandler} 
                          heading='Delete Professional!' body='Are you sure, you want to delete this professional account?'/>
      
           <div className={Classes.MainDiv}>
     
      
      <div className="container-fluid">
      <h4  className='text-primary' style={style.ProfHead}>Professionals</h4>
          
     
      <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
          <thead>
            <tr>
            <th>ID</th>
                        <th>Full Name</th>
                        <th>Speciality</th>
                        <th>Education</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Service Status</th>
                        <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.profList.map((item,index) => {
              return (
                        <tr key={item.PROF_ID}>
                            <td>{item.PROF_ID}</td>
                            <td>{item.FULLNAME}</td>
                            <td>{item.SPECIALITY}</td>
                            <td>{item.EDUCATION}</td>
                            <td>{item.PHONE}</td>
                            <td>{item.EMAIL}</td>
                            <td>{item.SERVICE_STATUS}</td>
                            <td>
                                <div className={Classes.ButtonAlign}>
                                  <ul >
                                    <li><UserButton clicked={()=>this.updateProfHandler(item)}>&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;</UserButton></li>&nbsp;&nbsp;
                                    <li><InstituteButton clicked={()=>this.selectIdHandler(item.PROF_ID,index)}>Delete</InstituteButton></li>
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
    ProfViewPad:{
        padding:'30px 50px 80px 40px'
    },
    ProfHead:{
        paddingBottom:'20px'
    }
}
export default withRouter(InstituteProfessionalView)