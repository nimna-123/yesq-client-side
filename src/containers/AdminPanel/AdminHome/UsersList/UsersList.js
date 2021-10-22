import React, { Component } from 'react';
import AdminLayout from '../../../../components/AdminLayout/AdminLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 
import axios from 'axios'
class UsersList extends Component{
    constructor(props){
        super(props)
            this.state={
                userList:  [],
                
              
           }
    }
    componentDidMount(){
        axios.post("/admin/list/users")
        .then(response=>{
           
         this.setState({
            userList:response.data,
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
   
   
    render(){
  
    return( 
       
       <AdminLayout>
           <div style={style.TableLayout}>
            <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
                 <thead>
                    <tr>
                        
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                     {this.state.userList.map((item,index) => {
                    return (
                                <tr key={item.UID}>
                                    <td>{item.UID}</td>
                                    <td>{item.FULLNAME}</td>
                                    <td>{item.USERID}</td>
                                    
                                
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
    }
 

}

export default UsersList