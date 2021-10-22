import React, { Component } from 'react'
import Classes from './ExpiredToken.module.css'
import UserAccountLayout from '../../../../../components/UserAccountLayout/UserAccountLayout'
import TokenNavLink from '../../../../../components/TokenNavLinks/TokenNavLink'
import {connect} from 'react-redux'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Spinnser from '../../../../../components/UI/Spinner/Spinner'
import ModalForm from '../../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';
class ExpiredToken extends Component{
    constructor(props){
        super(props)
            this.state={
                exprToken: [],
                currentPage: 0,
                perPage: 2,
                offset: 0,
                orgExprToken: [],
                loading:true.valueOf,
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
        axios.post("/user/expired/tokens",{uid:this.props.uid})
        .then(response=>{
            var data = response.data;
            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
           this.setState({
            loading:false,
            exprToken:response.data,
               pageCount: Math.ceil(data.length / this.state.perPage),
               orgExprToken:slice})
          
        })
        .catch((err) =>{
            console.log(err.response);
           
           
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
		const data = this.state.exprToken;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			orgExprToken:slice
		})
	
    }
    handleLocClose = () =>{
        this.setState({showLoc:false})
        this.setState({locError:""})
    }
    locHandleChange = locatn =>{
        this.setState({locatn})
     
    }
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
      handleSelect = async (locatn) => {
       this.setState({ locatn });
       const results = await geocodeByAddress(locatn);
       const latLng = await getLatLng(results[0]);
       this.setState({lat:latLng.lat,lng:latLng.lng})
       };
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
            token =  (this.state.orgExprToken.length===0?<p className={Classes.NoResults}>No results</p>:this.state.orgExprToken.map((item,index)=>{
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
                                           
                                        </div>
                                    </div>
                                </div>
                           
                            </div>
                          
                        </div>
                      
                        </div>
                    )
                    }))} 
        return(
            <React.Fragment>
                < ModalForm shows={this.state.showLoc} hide={this.handleLocClose} closeBtn={this.handleLocClose} heading='Add your location!'
                    location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
                    label='Select your location for better experience'  errorMsg={this.state.locError}/>
                 <UserAccountLayout  head='My Tokens' nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName}>
                      <TokenNavLink/>
                     
                      { token}
                      {this.state.orgExprToken.length!==0? <div className={Classes.PaginationPad}>
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
export default connect(mapStateToProps)(ExpiredToken)