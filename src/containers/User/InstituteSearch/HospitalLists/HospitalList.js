import React, { Component } from 'react'
import BookingLayout from '../../../../components/BookingLayout/BookingLayout'
import Classes from './HospitalList.module.css'
import Hospital from '../../../../components/Institutes/Institute'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import ModalForm from '../../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';
class HospitalLists extends Component{
    constructor(props){
        super(props)
            this.state={
             hospitals:[],
             currentPage: 0,
             perPage: 2,
             offset: 0,
             orgHospital:[],
             loading:true, 
             serach:'',
             locatn:"",
            locName:'Near By',
            lat:'',
            lng:'',
            show:false,
            locError:""
              
             }
    }
    componentDidMount(){
        let lattitude = localStorage.getItem('latitude')
        let longitude =  localStorage.getItem('longitude')
        if((lattitude === null) || (longitude === null) || (lattitude.length === 0) || (longitude.length === 0) ){
            // this.setState({show:true})
            const origin = 'NA'
            axios.post('/list/hospitals',{origin:origin})
            .then(response=>{
                var data = response.data;
                var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
                this.setState({hospitals:response.data,pageCount: Math.ceil(data.length / this.state.perPage),
                    orgHospital:slice,loading:false})
                    
              })
            .catch((err) =>{
              console.log(err.response);
                this.setState({loading:false})
               
            })
        }
        else{
            const name = localStorage.getItem('location')
            this.setState({locName:name.substring(0,8)+'...',locatn:name})
            this.fetchHos()
        }
    }
    fetchHos = () =>{
        const origin = localStorage.getItem('latitude')+','+localStorage.getItem('longitude')
        axios.post('/list/hospitals',{origin:origin})
        .then(response=>{
            var data = response.data;
            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
            this.setState({hospitals:response.data,pageCount: Math.ceil(data.length / this.state.perPage),
                orgHospital:slice,loading:false})
          })
        .catch((err) =>{
            console.log(err.response); 
            this.setState({loading:false})
           
        })
        

    }
    inputChangeHandlr = (e) =>{
        this.setState({serach:e.target.value})

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
		const data = this.state.hospitals;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			orgHospital:slice
		})
	
    }
    instHosBookingHandler = (selectedInst) =>{
       this.props.history.push({
            pathname: '/institute_counter_ISTID='+selectedInst.ISTID,
           })
    }
    handleClose = () => {
        this.setState({show:false})
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
            this.setState({show:false})
             localStorage.setItem('latitude',this.state.lat)
            localStorage.setItem('longitude',this.state.lng)
            this.fetchHos()
        }
    //    window.location.reload();
    }
    nearBtnClickHandlr = () =>{
        this.setState({show:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
           }
       
    }
    render(){
        let hospital;
        if(this.state.loading){
            hospital = <Spinner/>
        }
        else{
            if(this.state.serach === ""){
            hospital = (this.state.orgHospital.length===0?<p className={Classes.NoResults}>No Institute Registerd</p>:this.state.orgHospital.map((item,index)=>{
                
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
        else {
            const filterd = this.state.hospitals.filter((items)=>{
               return items = items.ISTNAME.toLowerCase().includes(this.state.serach.toLowerCase())
                })
           hospital = (filterd.length===0?<p className={Classes.NoResults}>No matches found</p>:filterd.map((item,index)=>{
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
       
        }
        return(
            <BookingLayout nearByClick={this.nearBtnClickHandlr} loctnName={this.state.locName} >
              < ModalForm shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='Add your location!'
            location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
            label='Select your location for better experience' errorMsg={this.state.locError}/>
            <div className={Classes.Search}>
                <input type='text' placeholder='Choose a hospital' className={Classes.SerachIcon} onChange={this.inputChangeHandlr} value={this.state.serach}/>
            </div>
            <div className={Classes.PadLeft}>
                <div className='row'> 
                    {hospital}
                </div>
            </div>
            {this.state.orgHospital.length!==0?<div className={Classes.PaginationPad}>
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
              
            

        </BookingLayout>
        
    )
}
}
export default HospitalLists