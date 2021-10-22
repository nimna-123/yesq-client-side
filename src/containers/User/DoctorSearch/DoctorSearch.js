import React from 'react'
import { Component } from 'react'
import Spinner from '../../../components/UI/Spinner/Spinner'
import BookingLayout from '../../../components/BookingLayout/BookingLayout'
import Doctor from '../../../components/Doctors/Doctor'
import Classes from './DoctorSearch.module.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import ModalForm from '../../../components/UI/ModalForm/ModalForm'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';
class DoctorSearch extends Component{
    constructor(props){
        super(props)
            this.state={
              doctList:[],
              orgDoctList:[],
              loading:true,
              currentPage: 0,
              perPage: 6,
              offset: 0,
              locatn:"",
             locName:'Near By',
                lat:'',
                lng:'',
                show:false,
                locError:"",
                serach:''

            } 
    }
   componentDidMount(){
    axios.post("/admin/list/professionals")
    .then(response=>{
        var data = response.data;
        var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)
        this.setState({doctList:response.data,pageCount: Math.ceil(data.length / this.state.perPage),
            orgDoctList:slice,loading:false})
       this.setState({doctList:response.data})
         
    })
    .catch((err) =>{
        console.log(err.response)
        
    })
    let lattitude = localStorage.getItem('latitude')
    let longitude =  localStorage.getItem('longitude')
    if((lattitude === null) || (longitude === null) || (lattitude.length === 0) || (longitude.length === 0) ){
        // this.setState({show:true})
    }
    else{
        const name = localStorage.getItem('location')
        this.setState({locName:name.substring(0,8)+'...',locatn:name})
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
    const data = this.state.doctList;
    
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgDoctList:slice
    })

}
inputChangeHandler = (e) =>{
    this.setState({serach:e.target.value})

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
    }
    //    window.location.reload();
    }
    nearBtnClickHandler = () =>{
        this.setState({show:true})
        if(localStorage.getItem('location') !== null){
            this.setState({locatn:localStorage.getItem('location')})
        }
    }
    doctProfViewHandler = (proid) =>{
        this.props.history.push('/doctor/profile_PROF_ID='+proid)
    }
    render(){
        let doctors;
        if(this.state.loading){
            doctors = <Spinner/>
        }  
        else{
            if(this.state.serach === ""){
                doctors = (this.state.orgDoctList.length===0?<p className={Classes.NoResults}>No results</p>:this.state.orgDoctList.map((item,index)=>{
                        return(
                            <Doctor doctorname={item.FULLNAME} doctorspl={item.EMAIL} key={item.PROF_ID} education={item.EDUCATION} speciality={item.SPECIALITY} DoctCardBody={Classes.DocCardBody} doctImage= {`/uploads/professional_dp/${item.PROF_PHOTO}`}
                            clickDoct={()=>this.doctProfViewHandler(item.PROF_ID)}/>
                            
                            )
                    })
                    )
            }
            else{
                const filterd = this.state.doctList.filter((items)=>{
                    return items = items.FULLNAME.toLowerCase().includes(this.state.serach.toLowerCase())
                     })
                     doctors = (filterd.length===0?<p className={Classes.NoResults}>No matches found</p>:filterd.map((item,index)=>{
                    return(
                        <Doctor doctorname={item.FULLNAME} doctorspl={item.EMAIL} key={item.PROF_ID} location={item.LOCATION} education={item.EDUCATION} speciality={item.SPECIALITY} DoctCardBody={Classes.DocCardBody} doctImage= {`/uploads/professional_dp/${item.PROF_PHOTO}`}
                        clickDoct={()=>this.doctProfViewHandler(item.PROF_ID)}/>
     
                    )
                })
                )
            }
        }
    return(
       <BookingLayout nearByClick={this.nearBtnClickHandler} loctnName={this.state.locName}>
           < ModalForm shows={this.state.show} hide={this.handleClose} closeBtn={this.handleClose} heading='Add your location!'
            location={this.state.locatn} locationChange={this.locHandleChange} btnClick={this.locationSubmit} select={this.handleSelect}
            label='Select your location for better experience' errorMsg={this.state.locError}/>
               <div className={Classes.Search}>
                        <input type='text' placeholder='Choose a doctor' className={Classes.SerachIcon} onChange={this.inputChangeHandler} value={this.state.serach} name='serach'/>
                    </div>
                    <div className={Classes.PadLeft}>
                        <div className='row nopadmar'>
                      {doctors}
                        </div>
                     </div>
                     {this.state.orgDoctList.length!==0? <div className={Classes.PaginationPad}>
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


export default DoctorSearch