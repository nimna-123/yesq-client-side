import React, { Component } from 'react';
import AdminLayout from '../../../../components/AdminLayout/AdminLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 
import axios from 'axios'
// import {AiFillDelete} from "react-icons/ai"
// import {AiFillEdit} from "react-icons/ai"
class AdmintProfList extends Component{
    constructor(props){
        super(props)
            this.state={
                ProfList:  [],
                
              
           }
    }
    componentDidMount(){
        axios.post("/admin/list/professionals")
        .then(response=>{
            this.setState({
            ProfList:response.data, 
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
    // viewProf = (profId) =>{
    //     this.props.history.push({
    //         pathname: '/admin/profile/INST_ID='+profId,
            
    //       })
    // }
    // deleteHandler = () =>{
    //     console.log('delete');
    // }
    // updateHandler = () =>{
    //     console.log('update');
    // }
   
   
    render(){
  
    return( 
       
       <AdminLayout>
           <div style={style.TableLayout}>
            <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
                 <thead>
                    <tr>
                        
                        <th>ID</th>
                        <th>FULL NAME</th>
                        <th>EDUCATION</th>
                        <th>SPECIALITY</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>SERVICE STATUS</th>
                        {/* <th>VIEW</th>
                        <th>ACTIONS</th> */}
                    </tr>
                </thead>
                <tbody>
              
                    {this.state.ProfList.map((item,index) => {
                    return (
                                <tr key={item.PROF_ID}>
                                    <td>{item.PROF_ID}</td>
                                    <td>{item.FULLNAME}</td>
                                    <td>{item.EDUCATION}</td>
                                    <td>{item.SPECIALITY}</td>
                                    <td>{item.PHONE}</td>
                                    <td>{item.EMAIL}</td>
                                     <td>{item.SERVICE_STATUS}</td>
                                    {/* <td><button style={style.ViewButton} onClick={()=>this.viewProf(item.PROF_ID)}>View</button></td>
                                     <td><AiFillDelete color='black' size='18px' cursor='pointer' onClick={this.deleteHandler}/>&nbsp;&nbsp;&nbsp;<AiFillEdit color='black' size='22px' cursor='pointer' onClick={this.updateHandler}/></td> */}
                                
                                </tr>
                                )
                    })}
                </tbody>
            </table>
        </div>
         
          

       </AdminLayout>

    )
}
}
const style={
    TableLayout:{
        padding:'50px 30px'
    },
    ViewButton:{
        width: '95%',
        height:'35px',
        backgroundColor:'rgb(126, 40, 206)',
        color:'#fff',
        outline: 'none',
        border: 'none',
        borderRadius: '7px',
        fontSize: '13px'
    
    }
}

export default AdmintProfList