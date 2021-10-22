import React, { Component } from 'react';
import AdminLayout from '../../../../components/AdminLayout/AdminLayout'
import Classes from './InstituteList.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 
import axios from 'axios'
import {AiFillDelete} from "react-icons/ai"
import {AiFillEdit} from "react-icons/ai"
class AdmintInstituteList extends Component{
    constructor(props){
        super(props)
            this.state={
                instList:  [],
                
              
           }
    }
    componentDidMount(){
        axios.post("/admin/list/institute")
        .then(response=>{
            console.log(response.data);
            
         this.setState({
            instList:response.data, 
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
    viewInst = (instId) =>{
        this.props.history.push({
            pathname: '/admin/profile/INST_ID='+instId,
            
          })
    }
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
                        <th>NAME</th>
                        <th>MOBILE</th>
                        <th>ADDRESS</th>
                        <th>GROUP</th>
                        <th>CATAGORY</th>
                        <th>SUBCATAGORY</th>
                        <th>DISTRICT</th>
                        <th>STATE</th>
                        <th>VIEW</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
              
                    {this.state.instList.map((item,index) => {
                    return (
                                <tr key={item.ISTID}>
                                    <td>{item.ISTID}</td>
                                    <td>{item.ISTNAME}</td>
                                    <td>{item.MOBILE}</td>
                                    <td>{item.ADDRESS}</td>
                                    <td>{item.GROUP_NAME}</td>
                                    <td>{item.CATEGORY_NAME}</td>
                                    <td>{item.SUBCATEGORY_NAME}</td>
                                    <td>{item.DISTRICT}</td>
                                    <td>{item.STATE}</td>
                                     <td><button className={Classes.ViewButton} onClick={()=>this.viewInst(item.ISTID)}>View</button></td>
                                     <td><AiFillDelete color='black' size='18px' cursor='pointer' onClick={this.deleteHandler}/>&nbsp;&nbsp;&nbsp;<AiFillEdit color='black' size='22px' cursor='pointer' onClick={this.updateHandler}/></td>
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
  
 

}

export default AdmintInstituteList