import React, { Component } from 'react'
import Toolbar from '../../../../components/Header/Toolbar/Toolbar'
import SideDrawer from '../../../../components/Header/SideDrawer/SideDrawer'
import {withRouter} from 'react-router-dom'
import  {
    geocodeByAddress,
    getLatLng,
   
  } from 'react-places-autocomplete';

class  Header extends Component{
    constructor(props){
        super(props)
            this.state={
                showSideDrawer: false,
                locatn:'',
                serachWrd:'',
                lat:'',
                lng:''
                
        } 
    }
   
    sideDrawerHnadler = () =>{
        this.setState({showSideDrawer:false})
        
    }
    locationChangeHandler = (e) =>{
        this.setState({serachWrd:e.target.value})
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
    searchHandler = () =>{
        if((this.state.locVal) !== '' && (this.state.serachWrd !== '')){
            const filterItem = { lat: this.state.lat,lng:this.state.lng ,searchKey:this.state.serachWrd}
            // if(this.props.location.pathname === '/hospital/search'){
            //     this.props.history.push('/')  
            //     console.log('hai');
            // }
            // else{
                this.props.history.push( {pathname: "/hospital/search",
                state: filterItem});

            // }
            
           
            
        }
    }
    drawertoggleHandler = () =>{
            this.setState(( prevState)=>{
            return  {showSideDrawer: !prevState.showSideDrawer}
        })
    
           
    }
    signInHandler = () =>{
        this.props.history.push('/signin')

        }
    render(){
        return(
            <Toolbar toggleClicked={this.drawertoggleHandler} 
            clicked={this.signInHandler} 
            isAuthnticated={this.props.isAuth}
            user={this.props.username}
            click={this.props.clicked}
            nearLocname={this.props.locname}
            nearByClicked={this.props.nearBtnClicked}
            location={this.props.locatn} 
            locationChange={this.props.locChange}
            select={this.props.locSelect}
            keyVal={this.props.serchKey}
            keyChange={this.props.keyChang}
            searchClick={this.props.searchClick}>
                <SideDrawer  closed={this.sideDrawerHnadler}
                open={this.state.showSideDrawer}
                isAuthnticated={this.props.isAuth}
                user={this.props.username}
                click={this.props.clicked}
                nearByClicked={this.props.nearBtnClicked}/>
            </Toolbar>

        )
    }
}
export default withRouter(Header)