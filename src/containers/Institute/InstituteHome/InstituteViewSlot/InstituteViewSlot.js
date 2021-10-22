import React,{Component} from 'react'
import Classes from './InstituteViewSlot.module.css'
import { connect } from 'react-redux'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';  
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import InstituteButton from '../../../../components/UI/Button/InstituteButton/InstituteButton'
import  ModalConform from '../../../../components/UI/ModalConform/ModalConform'
import Modals from '../../../../components/UI/Modal/Modal'

class InstituteViewSlot extends Component{
    constructor(props){
        super(props)
            this.state={
                slots:  [],
                slotId:null,
                arrayIndex:null,
                show:false,
                orgSlots:[],
                succesShow:false,
                currentPage: 0,
                perPage: 10,
                offset: 0,
                loading:true
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
      axios.post("/institute/list/counter/slot",{istId:this.props.istId,counterId:this.props.match.params.counterId})
      .then(response=>{
       this.setState({
         slots:response.data,
          })
      })
      .catch((err) =>{
          console.log(err.response)
          
      }) 

    }

      handleClose = () => { 
        this.setState({show:false})
      }
      successHandleClose = () =>{
        this.setState({succesShow:false})
      }
      successHandleUpdated = () =>{
        this.setState({succesShow:false})
      
      }
      selectSlotIdHandler = (slotId,arrayIndex) =>{
        this.setState({slotId:slotId,arrayIndex:arrayIndex})
        this.setState({show:true})
     }

    deleteSlotHandler = () =>{
        axios.post("/delete/slot",{slotId:this.state.slotId})
           .then(response=>{
              this.setState({show:false})
             this.setState({succesShow:true})
            //  let currentItems = this.state.slots
            //  currentItems.splice(this.state.arrayIndex,1)
            //  this.setState({slots:currentItems})
            this.getData()
           })
           .catch((err) =>{
               console.log(err.response)
        })
       
       }
       updateSlotHandler = (selectedSlot) =>{
        this.props.history.push({
            pathname: '/institute/update/slots/slotId='+selectedSlot.SLOT_ID,
          
          })
        

       }
    render(){
    return(
        <InstituteHomeLayout>
              < Modals shows={this.state.succesShow} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!' body='Slot deleted successfully'/>
             <ModalConform shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} confirmBtn={this.deleteSlotHandler} 
                          heading='Delete Slots!' body='Are you sure, you want to delete this slot?'/>
      
             <div className={Classes.CounterPad}>
                  <div className="container-fluid">
                     <h4  className='text-primary' style={style.ProfHead}>Slots</h4>
                       <table id="example" className="table table-striped table-bordered table-sm row-border hover mb-5" >
                         <thead>
                            <tr>
                              <th>ID</th>
                              <th>Slot Name</th>
                              <th>Day</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Interval</th>
                              <th>Token Limit</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.slots.map((item,index)=>{
                            return(
                                <tr key={item.SLOT_ID}>
                                <td>{item.SLOT_ID}</td>
                                <td>{item.SLOT_NAME}</td>
                                <td>{item.SLOT_DAY}</td>
                                <td>{item.SLOT_START}</td>
                                <td>{item.SLOT_END}</td>
                                <td>{item.SLOT_INTERVAL}</td>
                                <td>{item.TOKEN_LIMIT}</td>
                                <td>{item.SLOT_STATUS}</td>
                                <td>
                                    <div className={Classes.ButtonAlign}>
                                      <ul >
                                          <li><UserButton clicked={()=>this.updateSlotHandler(item)}>&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;</UserButton></li>&nbsp;&nbsp;
                                          <li><InstituteButton clicked={()=>this.selectSlotIdHandler(item.SLOT_ID,index)}>Delete</InstituteButton></li>
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
        paddingTop:'20px'
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
export default connect(mapStateToProps)(InstituteViewSlot)