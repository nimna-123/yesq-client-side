import React, { Component } from 'react';
import InstituteHomeLayout from '../../../components/InstituteHomeLayout/InstituteHomeLayout'
import ViewProfile from '../../../components/ProfileView/ProfileView'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import Classes from './InstituteHome.module.css'
import Modals from '../../../components/UI/Modal/Modal'


import axios from 'axios'
class InstituteHome extends Component{
    state = {
        instDet: {},
        imgUrl: '',
        selectedFile: null,
        imageChange: false,
        show:false
      };
    
    componentDidMount() { 
        axios.post("/institute/home",{istId:this.props.istId})
        .then(response=>{
            this.setState({ instDet:response.data})
           this.setState({
           imgUrl:response.data.COMPANY_DP
           })
            
        }).catch((err) =>
          {
              console.log(err.response)
        })
        
                
    }
    fileSelectHandler = (event) =>{
        this.setState({
            selectedFile:event.target.files[0]
        })
    }
     handleUpdated = () =>{
         this.setState({ show: false })
         window.location.reload();
     }
     handleClose = () => {
         this.setState({ show: false })
         window.location.reload(); 
     }
    handleShow = () => {
        this.setState({show:true})
     };
    fileUploadHandler = (e) =>{
        e.preventDefault();
         let formData = new FormData()
        formData.append('company_dp',this.state.selectedFile)
        formData.append('istId',this.props.istId)
       
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        axios.post("/institute/upload/dp",formData,config)
            .then(response => {
            this.setState({show:true})
            
        }).catch((err) =>
        {
              console.log(err.response)
        })

    }
   
    render(){
  
    return( 
       
        <InstituteHomeLayout>
             < Modals shows={this.state.show} hide={this.handleClose} closeBtn={this.handleUpdated} heading='SUCCESS!' body='Profile photo Added successfully'/>
             <div className='row' style={style.RowMarg}>
                <div className='col-md-4'>
                    <h3 className={Classes.UploadImgCap}>Upload your profile photo</h3>
                    <img className={Classes.imageCard} alt="instImg" src={this.state.imgUrl === 'NA' ? `/uploads/company_dp/defaulthos.jpg` : `/uploads/company_dp/${this.state.imgUrl}`} />
                        <form onSubmit={this.fileUploadHandler}>
                            <input type='file' name='company_dp' onChange={this.fileSelectHandler} className={Classes.InputFile} /><br/>
                            <button className={Classes.ImgUploadBtn} type="submit">Upload</button>
                        </form>
                </div>
                <ViewProfile id={this.props.istId} orgName={this.state.instDet.ISTNAME} mobile={this.state.instDet.MOBILE} email={this.state.instDet.EMAIL}
                address={this.state.instDet.ADDRESS} grp={this.state.instDet.GROUP_NAME} cat={this.state.instDet.CATEGORY_NAME} subcat={this.state.instDet.SUBCATEGORY_NAME} loc={this.state.instDet.LOCATION} sate={this.state.instDet.STATE} distr={this.state.instDet.DISTRICT} pincode={this.state.instDet.PINCODE}/>
               
           </div>
           
    </InstituteHomeLayout>

    )
}
}
const style={
    RowMarg:{
       padding:'50px'
    },
   
}
const mapStateToProps = state =>{
    return{
		error:state.institute.forgotErr,
		loading: state.institute.loading,
        istId:state.institute.istId
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		onInstLogout:(history)=>dispatch(actions.instituteLogout(history))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(InstituteHome)