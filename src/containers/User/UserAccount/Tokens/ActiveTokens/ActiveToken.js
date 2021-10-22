import React, { Component } from 'react'
import Classes from './ActiveToken.module.css'
import UserAccountLayout from '../../../../../components/UserAccountLayout/UserAccountLayout'
import TokenNavLink from '../../../../../components/TokenNavLinks/TokenNavLink'
import {connect} from 'react-redux'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Spinnser from '../../../../../components/UI/Spinner/Spinner'
import ModalConform from '../../../../../components/UI/ModalConform/ModalConform'
import Modals from '../../../../../components/UI/Modal/Modal'
import ModalForm from '../../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class ActiveToken extends Component{
    constructor(props){
        super(props)
            this.state={
                activeToken: [],
                currentPage: 0,
                perPage: 2,
                offset: 0,
                orgactiveToken: [],
                loading:true,
                show:false,
                tokenId:'',
                arrayKey:'', 
                succesShow:false,
                locatn:"",
                locName:'Near By',
                lat:'',
                lng:'',
                showLoc:false,
                locError:""

            }
    }
  
    componentDidMount(){
        let lattitude = localStorage.getItem('latitude')
        let longitude =  localStorage.getItem('longitude')
        if((lattitude === null) || (longitude === null) || (lattitude.length === 0) || (longitude.length === 0) ){
            // this.setState({show:true})
           }
        else{
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...',locatn:name})
           
        }
        this.getData()
    }
    getData = () =>{
        axios.post("/user/mytokens",{uid:this.props.uid})
        .then(response=>{
            var data = response.data;
            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
           this.setState({
            loading:false,
               activeToken:response.data,
               pageCount: Math.ceil(data.length / this.state.perPage),
               orgactiveToken:slice})
          
        })
        .catch((err) =>{
            console.log(err.response);
           
        })

    }
    deleteHandler = () =>{
        axios.post("/user/cancel/booked/tokens",{id:this.state.tokenId,uid:this.props.uid})
        .then(response=>{
        //  let currentItems = this.state.activeToken
        //   currentItems.splice(this.state.arrayKey,1)
        //   this.setState({ activeToken:currentItems})
        //   let OrgcurrentItem = this.state.orgactiveToken
        //   OrgcurrentItem.splice(this.state.arrayKey,1)
        //   this.setState({ orgactiveToken:OrgcurrentItem})
            this.setState({show:false})
            this.setState({succesShow:true})
            this.getData()
            //  console.log(this.state.activeToken);
            //  console.log(this.state.orgactiveToken);
        
        })
        .catch((err) =>{
            console.log(err.response)
            
        })
    }
    handlePageClick = (e) =>{
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    }
    loadMoreData() {
		const data = this.state.activeToken;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			orgactiveToken:slice
		})
	
    }
    handleClose = () => {
        this.setState({show:false})
        
      }
      selectIdHandler = (toknId,key) =>{
        this.setState({tokenId:toknId,arrayKey:key})
        this.setState({show:true})
      
      }
      successHandleClose = () =>{
        this.setState({succesShow:false})
      }
      successHandleUpdated = () =>{
        this.setState({succesShow:false})
      }
      handleLocClose = () =>{
        this.setState({showLoc:false})
        this.setState({locError:""})
    }
    locHandleChange = locatn =>{
        this.setState({locatn})
     
    }
      handleSelect = async (locatn) => {
       this.setState({ locatn });
       const results = await geocodeByAddress(locatn);
       const latLng = await getLatLng(results[0]);
       this.setState({lat:latLng.lat,lng:latLng.lng})
    };
    locValidate = () =>{
        let locError=""
        if (!this.state.locatn) {
         locError = "required";
         this.setState({locError})
        }
         if(locError){
             this.setState({locError})
             return false
         }
         return true
    }
     locationSubmit = () =>{
        const isLocValidate =this.locValidate()
        if(isLocValidate){
            this.setState({locError:""})
            localStorage.setItem('location',this.state.locatn)
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...'})
            this.setState({showLoc:false})
            localStorage.setItem('latitude',this.state.lat)
            localStorage.setItem('longitude',this.state.lng)
        }
      
    //    window.location.reload();
    }
    nearBtnClickHandlr = () =>{
        this.setState({showLoc:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
        }
       
    }
    render(){
        let token;
        if(this.state.loading){
            token = <Spinnser/>
        }
        else{
            token =  (this.state.orgactiveToken.length===0?<p className={Classes.NoResults}>No results</p>:this.state.orgactiveToken.map((item,index)=>{
                return(
                    <div className='row' style={style.TokenPad} key={item.TOKEN_ID}>
                        <div className={Classes.TokenLayout} >
                            <div className={Classes.TopHead}>
                                <h3>{item.ISTNAME}</h3>
                                <h3>{item.COUNTER_NAME}</h3>
                            </div>
                            <div className={Classes.TokenDet}>
                                <div className='row'>
                                    <div className='col-md-8 col-sm-8 col-8'>
                                        <h6>Token:{item.TOKEN_NO}</h6><br/>
                                         <h6>Date::{item.TOKEN_DATE}</h6><br/>
                                        <h6>Time:{item.TOKEN_TIME}</h6>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4 col-sm-4 col-4'>
                                            <div className={Classes.BookedStatus}>
                                                <h3>{item.TOKEN_STATUS}</h3>
                                            </div>
                                            <button className={Classes.CancelBtn} onClick={()=>this.selectIdHandler(item.TOKEN_ID,index)}>cancel</button>
                                        </div>
                                    </div>
                                </div>
                           
                            </div>
                          
                        </div>
                      
                        </div>
                    )
                    })
            )} 

        
        
        return(
            <React.Fragment>
                 < Modals shows={this.state.succesShow} hide={this.successHandleClose} closeBtn={this.successHandleUpdated} heading='SUCCESS!' body='Token Cancelled successfully'/>
                    <ModalConform shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} confirmBtn={this.deleteHandler} 
                          heading='Cancel Token!!' body='Are you sure, you want to cancel this token?'/>
                          < ModalForm shows={this.state.showLoc} hide={this.handleLocClose} closeBtn={this.handleLocClose} heading='Add your location!'
                    location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                    label='Select your location for better experience' errorMsg={this.state.locError}/>
                 <UserAccountLayout  head='My Tokens' nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName}>
                    <TokenNavLink/>
                 { token}
               {this.state.orgactiveToken.length!==0? <div className={Classes.PaginationPad}>
                 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div>:null}
            </UserAccountLayout>
        </React.Fragment>
           
        )
    }
}
const style={
    TokenPad:{
        marginTop:'20px',
        padding:'10px'
    }
}
const mapStateToProps = state =>{
    return{
		uid:state.user.tokenId
       }
}
export default connect(mapStateToProps)(ActiveToken)