import React, { Component } from 'react';
import AdminLayout from '../../../../components/AdminLayout/AdminLayout'
import ViewProfile from '../../../../components/ProfileView/ProfileView'
import axios from 'axios'
class AdminProfile extends Component{
    constructor(props){
        super(props)
            this.state={
                instList:  [],
                imgUrl:''
            }
    }
    componentDidMount(){
        axios.post("/admin/institute/profile",{istid:this.props.match.params.istId})
        .then(response=>{
           
         this.setState({
            instList:response.data,
            })
            this.setState({ imgUrl: response.data.COMPANY_DP })
        })
        .catch((err) =>{
            console.log(err.response)
            
        })
    }
   
   
    render(){
  
    return( 
       
       <AdminLayout>
           <div style={style.ProfileLayout}>
           <div className='row' >
                <div className='col-md-4'>
                  <img style={style.ImageCard} alt="instImg" src={this.state.imgUrl === 'NA' ? `/uploads/company_dp/defaulthos.jpg` : `/uploads/company_dp/${this.state.imgUrl}`} />
                </div>
                <ViewProfile id={this.state.instList.ISTID} orgName={this.state.instList.ISTNAME}  mobile={this.state.instList.MOBILE} email={this.state.instList.EMAIL}
                address={this.state.instList.ADDRESS} grp={this.state.instList.GROUP_NAME} cat={this.state.instList.CATEGORY_NAME} subcat={this.state.instList.SUBCATEGORY_NAME} loc={this.state.instList.LOCATION} sate={this.state.instList.STATE} distr={this.state.instList.DISTRICT} pincode={this.state.instList.PINCODE}/>
            </div>
            </div>
        </AdminLayout>

    )
}
}
const style={
    ProfileLayout:{
        padding:'0px 30px'
    },
    ImageCard:{ 
        display: 'flex',
        border: '1px solid rgb(177, 173, 173)',
        width: '100%',
        height: '300px',
        marginTop: '55px',
        borderRadius: '10px'
    }
  
 }

export default AdminProfile