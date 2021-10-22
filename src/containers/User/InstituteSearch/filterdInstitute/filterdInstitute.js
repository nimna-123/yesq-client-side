import React, { Component } from 'react'
import BookingLayoutFilter from '../../../../components/BookingLayouFilter/BookingLayoutFilter'
import Classes from './filterdInstitute.module.css'
import { withRouter } from 'react-router'
import Hospital from '../../../../components/Institutes/Institute'
import axios from 'axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import ModalForm from '../../../../components/UI/ModalForm/ModalForm'
import ReactPaginate from 'react-paginate';
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';
class filterdInstitute extends Component{
    constructor(props){
        super(props)
            this.state={
            filterdInstitute:[],
            currentPage: 0,
            perPage: 2,
            offset: 0,
            orgfilterdInstitute:[],
            loading:true,
            locatn:"",
            locName:'Near By',
            lat:'',
            lng:'',
            show:false,
            locError:"",
            locationName:"",
            locLat:"",
            locLng:"",
            serachWrd:""

              
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
       
       if(this.props.location.state !== undefined ){
            axios.post('/search/result/institute/by/location/',{keyWord:this.props.location.state.searchKey,origin:this.props.location.state.lat+','+this.props.location.state.lng})
            .then(response=>{
                var data = response.data;
                var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
                this.setState({filterdInstitute:response.data,pageCount: Math.ceil(data.length / this.state.perPage),
                    orgfilterdInstitute:slice,loading:false})
                
            })
            .catch((err) =>{
                // console.log(err.response);
                this.setState({loading:false})
           })
        }
        else{
          this.props.history.push('/')  
        } 
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
		const data = this.state.filterdInstitute;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			orgfilterdInstitute:slice
		})
	
    }
    handleClose = () => {
        this.setState({show:false})
        this.setState({locError:""})
     }
    locHandleChange = locatn =>{
        this.setState({locatn})
     
    }
    locHandleChangeHandler = locationName =>{
        this.setState({locationName})
     
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
    locHandleSelect = async (locationName) => {
        this.setState({ locationName });
        const results = await geocodeByAddress(locationName);
        const latLng = await getLatLng(results[0]);
        this.setState({locLat:latLng.lat,locLng:latLng.lng})
        };
       
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
            this.setState({show:false})
            localStorage.setItem('latitude',this.state.lat)
            localStorage.setItem('longitude',this.state.lng)
        }
    //    window.location.reload();
        
    }
    instHosBookingHandler = (selectedInst) =>{
        this.props.history.push({
             pathname: '/institute_counter_ISTID='+selectedInst.ISTID,
            })
     }
     keyChangeHandler = (e) =>{
        this.setState({serachWrd:e.target.value})
    }
    nearBtnClickHandler = () =>{
        this.setState({show:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
           }
    }
    locSearchHandler = () =>{
        this.setState({locationName:"",serachWrd:""})
       
        if((this.state.serachWrd !== "") && (this.state.locationName !== "")){
            this.setState({loading:true})
            axios.post('/search/result/institute/by/location/',{keyWord:this.state.serachWrd,origin:this.state.locLat+','+this.state.locLng})
            .then(response=>{
                var data = response.data;
                var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
                this.setState({filterdInstitute:response.data,pageCount: Math.ceil(data.length / this.state.perPage),
                    orgfilterdInstitute:slice,loading:false})
                
            })
            .catch((err) =>{
                // console.log(err.response);
                this.setState({loading:false})
           })

        }
    }
    render(){
        let filterInst;
        if(this.state.loading){
            filterInst = <Spinner/>
        }
        else{
            filterInst = (this.state.orgfilterdInstitute.length===0?<p className='NoResults'>No Matches Found</p>:this.state.orgfilterdInstitute.map((item,index)=>{
                return(
                    <Hospital instName={item.ISTNAME} 
                        location={item.ADDRESS} phnno={item.MOBILE}
                        instImage={item.COMPANY_DP} key={item.ISTID}
                        email={item.EMAIL} clickIns={()=>this.instHosBookingHandler(item)}
                        HosCardBody={Classes.HosCardBody}
                        callnum={item.MOBILE}
                        InstLayout='col-lg-3 col-md-6 col-sm-6 col-6 HosNopadleft'/>
                     
                    )
            })
            )
        }
       
        return(
          
        <BookingLayoutFilter nearByClick={this.nearBtnClickHandler} loctnName={this.state.locName} searchLocName={this.state.locationName} 
        searchLocChange={this.locHandleChangeHandler} searchLocSelect={this.locHandleSelect } searchKeyChange={this.keyChangeHandler} searchBtnClick={this.locSearchHandler} searchWrd={this.state.serachWrd}>
              < ModalForm shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='Add your location!'
            location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
            label='Select your location for better experience' errorMsg={this.state.locError} />
                <div className={Classes.PadLeft}>
                    <div className='row'> 
                        {filterInst}
                    </div>
                </div>
                {this.state.orgfilterdInstitute.length!==0?<div className={Classes.PaginationPad}>
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
        </BookingLayoutFilter>
        
    )
}
}
export default withRouter(filterdInstitute)