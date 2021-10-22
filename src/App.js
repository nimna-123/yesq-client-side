import { Route, Switch,withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import UserSignup from './containers/User/UserAuth/UserSignup/UserSignup'
import UserSignIn from './containers/User/UserAuth/UserSignIn/UserSignIn'
import UserForgotPswd from './containers/User/UserAuth/UserForgotPswd/UserForgotPswd'
import UserRegVerification from './containers/User/UserAuth/UserRegVerification/UserRegVerification'
import UserResetPswd from './containers/User/UserAuth/UserResetPswd/UserResetPswd'
import UserForgotVerification from './containers/User/UserAuth/UserForgotVerification/UserForgotVerification'
import InstituteSignIn from './containers/Institute/InstitutAuth/InstituteSignIn/InstituteSignIn'
import InstituteForgotPswd from './containers/Institute/InstitutAuth/InstituteForgotPswd/InstituteForgotPswd'
import InstituteForgotVerification from './containers/Institute/InstitutAuth/InstituteForgotVerification/InstituteForgotVerification'
import InstituteResetPswd from './containers/Institute/InstitutAuth/InstituteResetPswd/InstituteResetPswd'
import InstituteSignup from './containers/Institute/InstitutAuth/InstituteSignup/InstituteSignup'
import InstituteVerification from './containers/Institute/InstitutAuth/InstituteVerification/InstituteVerification'
import InstituteSuccess from './containers/Institute/InstituteHome/InstituteSuccess/InstituteSuccess'
import InstituteHome from './containers/Institute/InstituteHome/InstituteHome'
import InstituteProfileEdit from './containers/Institute/InstituteHome/InstituteProfileEdit/InstituteProfileEdit'
import InstituteCounters from './containers/Institute/InstituteHome/InstituteCounters/InstituteCounters'
import InstituteCreateCounter from './containers/Institute/InstituteHome/InstitueCreateCounter/InstituteCreateCounter'
import InstituteCounterAddSlot from './containers/Institute/InstituteHome/InstituteCounterAddSlot/InstituteCounterAddSlot'
import InstituteTokensBooked from './containers/Institute/InstituteHome/InstituteTokensBooked/InstituteTokensBooked'
import InstituteProfessionalView from './containers/Institute/InstituteHome/InstituteProfessionalView/InstituteProfessionalView'
import InstituteProfessionalRegister from './containers/Institute/InstituteHome/InstituteProfessionalRegister/InstituteProfessionalRegister'
import InstituteChangePswd from './containers/Institute/InstituteHome/InstituteChangePswd/InstituteChangePswd'
import UserHome from './containers/User/Userhome'
import DoctorSearch from './containers/User/DoctorSearch/DoctorSearch'
import DoctorProfile from './containers/User/DoctorSearch/DoctorProfile/DoctorProfile'
import HospitalLists from './containers/User/InstituteSearch/HospitalLists/HospitalList'
import InstituteLists from './containers/User/InstituteSearch/InstituteLists/InstituteLists'
import InstituteToken from './containers/User/InstituteSearch/InstituteToken/InstituteToken'
import InstiSuccesNoti from './containers/Institute/InstituteHome/InstitutesuccesNoti/InstituteSuccesNoti'
import InstituteUpdateProf from './containers/Institute/InstituteHome/InstituteUpdateProf/InstituteUpdateProf'
import InstituteViewSlot from './containers/Institute/InstituteHome/InstituteViewSlot/InstituteViewSlot'
import InstituteUpdateSlot from './containers/Institute/InstituteHome/InstituteUpdateSlot/InstituteUpdateSlot'
import InstitituteUpdateCounter from './containers/Institute/InstituteHome/InstituteUpdateCounter/InstituteUpdateCounter'
import InstituteCounter from './containers/User/InstituteSearch/InstituteCounter/InstituteCounter'
import UserProfile from './containers/User/UserAccount/UserProfile/UserProfile'
import EditProfile from './containers/User/UserAccount/EditProfile/EditProfile'
import ProfileSettings from './containers/User/UserAccount/ProfileSettings/ProfileSettings'
import ActiveToken from './containers/User/UserAccount/Tokens/ActiveTokens/ActiveToken'
import CancelledToken from './containers/User/UserAccount/Tokens/CancelldTokens/CancelledToken'
import ExpiredToken from './containers/User/UserAccount/Tokens/ExpiredTokens/ExpiredToken'
import UserSignInBook from './containers/User/UserAuth/UserSignInBook/UserSignInBook'
import HospClinicLists from './containers/User/InstituteSearch/ClinicHoslist/ClinicHosList'
import filterdInstitute from './containers/User/InstituteSearch/filterdInstitute/filterdInstitute'
import AdminSignIn from './containers/AdminPanel/AdminLogin/AdminLogin'
import AdminHome from './containers/AdminPanel/AdminHome/AdminHome' 
import UsersList from './containers/AdminPanel/AdminHome/UsersList/UsersList'
import AdmintInstituteList from './containers/AdminPanel/AdminHome/InstituteList/InstituteList'
import AdminProfile from './containers/AdminPanel/AdminHome/AdminInsProfile/AdminInsProfile'
import NotFound from './components/NotFound/NotFound'
import AdmintProfList from './containers/AdminPanel/AdminHome/AdminProff/AdminProf'
import DrConsultHosList from './containers/User/DoctorSearch/DrConsultHosList/DrConsultHosList'
import DoctorTokenBookByDay from './containers/User/DoctorSearch/DocterToken/DoctorTokenBookByDay/DoctorTokenBookByDay'
import DoctorTokenBook from './containers/User/DoctorSearch/DocterToken/DoctorTokenBook'
import DrConsultHosCounterListByDay from './containers/User/DoctorSearch/DoctorConsultHospitalCouter/DoctorConsultHospitalCounterByDay/DoctorConsultHospitalCounterByDay'
import DrConsultHosCounterList from './containers/User/DoctorSearch/DoctorConsultHospitalCouter/DoctorConsultHospitalCounter'
import './App.css';
import * as actions from './store/actions/index'



class App extends Component { 
  componentDidMount(){
    this.props.onTryuAutoSignup()
    this.props.Signup()
    this.props.adminSignup()
   }
  render(){
    let routes = (
      
        <Switch>
          {/* common routes */}
            <Route path="/" exact component={UserHome} />
            <Route path="/signup" component={UserSignup} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/forgot_password" component={UserForgotPswd} />
            <Route path="/hospitals/clinics" component={HospClinicLists} />
            <Route path="/hospitals" component={ HospitalLists} />
            <Route path="/hospital/search" component={ filterdInstitute} />
            <Route path="/doctors" component={ DoctorSearch} />
            <Route path="/institute_register" component={InstituteSignup} />
            <Route path="/success" component={InstituteSuccess} />
            <Route path="/institute/login" component={InstituteSignIn} />
           <Route path="/institute/forgot/password" component={InstituteForgotPswd} />
          <Route path="/institute_counter_COUNTERID=:counterId/ISTID=:istId" component={InstituteToken} />
          <Route path="/institute_lists_GROUP=:grp/CATEGORY=:catg" component={InstituteLists} />
          <Route path="/institute_counter_ISTID=:istid" component={InstituteCounter}/>
          <Route path="/institute/create/otp" component={InstituteForgotVerification} />
          <Route path="/institute/reset/password" component={InstituteResetPswd} />
          <Route path="/verify/institute" component={InstituteVerification} />
          <Route path="/verify/register" component={UserRegVerification} />
          <Route path="/send_otp" component={UserForgotVerification} />
          <Route path="/verification" component={UserResetPswd} />
          <Route path="/user/siginin/token/booking" component={UserSignInBook} />
          <Route path="/admin_login" component={AdminSignIn} />
          <Route path = "/doctor/hospital_list/token/book_ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBook}/> 
          <Route path="/doctor/profile_PROF_ID=:profid" component={DoctorProfile} />
          <Route path = "/doctor/hospital/lists_DayId=:dayId/day=:day/ProfId=:profid" component={DrConsultHosList}/>
          <Route path = "/doctor/hospital/counter_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterListByDay}/>
          <Route path = "/doctor/hospital/counter_ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterList}/>
          <Route path = "/doctor/hospital/token/booking_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBookByDay}/>
          { this.props.isAdminAuth?
          <Route path="/admin/home" component={AdminHome} />:null
          }
          { this.props.isAdminAuth?
          <Route path="/admin/list/users" component={UsersList} />:null
          }
           { this.props.isAdminAuth?
         <Route path="/admin/list/institute" component={AdmintInstituteList} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/profile" component={AdminProfile} />:null
        }
         { this.props.isAdminAuth?
           <Route path="/admin/list/professional" component={AdmintProfList} />:null
          }
          <Route path="*" component={NotFound} /> 
      </Switch>
    )
   
    if ( this.props.isAuthenticated ) {
      routes = (
       <Switch>
       
          <Route path="/" exact component={UserHome} />
          <Route path="/signup" component={UserSignup} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/forgot_password" component={UserForgotPswd} />
          <Route path="/institute_register" component={InstituteSignup} />
          <Route path="/institute/login" component={InstituteSignIn} />
          <Route path="/institute/forgot/password" component={InstituteForgotPswd} />
          <Route path="/hospitals/clinics" component={HospClinicLists} />
          <Route path="/hospital/search" component={ filterdInstitute} />
          <Route path="/hospitals" component={HospitalLists} />
          <Route path="/institute_lists_GROUP=:grp/CATEGORY=:catg" component={InstituteLists} />
          <Route path="/institute_counter_ISTID=:istid" component={InstituteCounter}/>
          <Route path="/institute_counter_COUNTERID=:counterId/ISTID=:istId" component={InstituteToken} />
          <Route path="/success" component={InstituteSuccess} />
          <Route path="/verification" component={UserResetPswd} />
         
          <Route path="/user/profile" component={UserProfile} />
          <Route path="/user/edit/profile" component={EditProfile} />
          <Route path="/user/settings" component={ProfileSettings} />
          <Route path="/user/mytokens" component={ActiveToken } />
           <Route path="/user/cancelled/tokens" component={CancelledToken} />
          <Route path="/user/expired/tokens" component={ExpiredToken} />
          <Route path="/user/siginin/token/booking" component={UserSignInBook} />
         

          <Route path="/institute/create/otp" component={InstituteForgotVerification} />
          <Route path="/institute/reset/password" component={InstituteResetPswd} />
          <Route path="/verify/institute" component={InstituteVerification} />

          <Route path="/user/siginin/token/booking" component={UserSignInBook} />
          <Route path="/send_otp" component={UserForgotVerification} />
          <Route path="/verification" component={UserResetPswd} />
          <Route path="/verify/register" component={UserRegVerification} />
          <Route path="/doctors" component={ DoctorSearch} />
          <Route path="/doctor/profile_PROF_ID=:profid" component={DoctorProfile} />
          <Route path = "/doctor/hospital/lists_DayId=:dayId/day=:day/ProfId=:profid" component={DrConsultHosList}/>
          <Route path = "/doctor/hospital/counter_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterListByDay}/>
          <Route path = "/doctor/hospital/counter_ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterList}/>
          <Route path = "/doctor/hospital_list/token/book_ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBook}/> 
          <Route path = "/doctor/hospital/token/booking_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBookByDay}/>

          <Route path="/admin_login" component={AdminSignIn} />
          { this.props.isAdminAuth?
          <Route path="/admin/home" component={AdminHome} />:null
          }
          { this.props.isAdminAuth?
          <Route path="/admin/list/users" component={UsersList} />:null
          }
           { this.props.isAdminAuth?
         <Route path="/admin/list/institute" component={AdmintInstituteList} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/profile" component={AdminProfile} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/list/professional" component={AdmintProfList} />:null
          }
          <Route path="*" component={NotFound} />
          
      </Switch>
        
       );
    }
   
    if ( this.props.isInstituteAuth ) {
      routes = (
       <Switch>
            <Route path="/" exact component={UserHome} />
            <Route path="/signup" component={UserSignup} />
            <Route path="/signin" component={UserSignIn} />
           <Route path="/forgot_password" component={UserForgotPswd} />
           <Route path="/institute_register" component={InstituteSignup} />
            <Route path="/institute/login" component={InstituteSignIn} />
            <Route path="/institute/forgot/password" component={InstituteForgotPswd} />
            <Route path="/hospitals/clinics" component={HospClinicLists} />
            <Route path="/hospital/search" component={ filterdInstitute} />
            <Route path="/hospitals" component={HospitalLists} />
            <Route path="/institute/home" component={InstituteHome} />
            <Route path="/institute_lists_GROUP=:grp/CATEGORY=:catg" component={InstituteLists} />
            <Route path="/institute_counter_ISTID=:istid" component={InstituteCounter}/>
            <Route path="/institute_counter_COUNTERID=:counterId/ISTID=:istId" component={InstituteToken} />
            <Route path="/user/siginin/token/booking" component={UserSignInBook} />
            <Route path="/verification" component={UserResetPswd} />
            <Route path="/verify/register" component={UserRegVerification} />
            <Route path="/send_otp" component={UserForgotVerification} />

            <Route path="/institute/edit/profile" component={InstituteProfileEdit} />
           <Route path="/institute/create/otp" component={InstituteForgotVerification} />
            <Route path="/institute/create/counter" component={InstituteCreateCounter} />
            <Route path="/institute/counter/add/slot" component={InstituteCounterAddSlot} />
            <Route path="/institute/active/tokens" component={InstituteTokensBooked} />
            <Route path="/institute/view/professionals" component={InstituteProfessionalView} />
            <Route path="/institute/register/professional" component={InstituteProfessionalRegister} />
            <Route path="/institute/change/password" component={InstituteChangePswd} />
            <Route path="/institute/list/counter" component={InstituteCounters} />
            <Route path="/success" component={InstituteSuccess} />
            <Route path="/institute_success" component={InstiSuccesNoti} />
            <Route path="/institute/update/professional/profId=:profId" component={InstituteUpdateProf} /> 
            <Route path="/institute/view/slots/counterId=:counterId" component={InstituteViewSlot}/>
            <Route path="/institute/update/slots/slotId=:slotId" component={InstituteUpdateSlot}/>
            <Route path="/institute/update/counterId=:counterId" component={ InstitituteUpdateCounter}/>

            <Route path="/institute/create/otp" component={InstituteForgotVerification} />
          <Route path="/institute/reset/password" component={InstituteResetPswd} />
          <Route path="/verify/institute" component={InstituteVerification} />
          <Route path="/doctors" component={ DoctorSearch} />
          <Route path="/doctor/profile_PROF_ID=:profid" component={DoctorProfile} />
          <Route path = "/doctor/hospital/lists_DayId=:dayId/day=:day/ProfId=:profid" component={DrConsultHosList}/>
          <Route path = "/doctor/hospital/counter_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterListByDay}/>
          <Route path = "/doctor/hospital/counter_ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterList}/>
          <Route path = "/doctor/hospital_list/token/book_ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBook}/> 
          <Route path = "/doctor/hospital/token/booking_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBookByDay}/>
         

          <Route path="/admin_login" component={AdminSignIn} />
          { this.props.isAdminAuth?
          <Route path="/admin/home" component={AdminHome} />:null
          }
          { this.props.isAdminAuth?
          <Route path="/admin/list/users" component={UsersList} />:null
          }
           { this.props.isAdminAuth?
         <Route path="/admin/list/institute" component={AdmintInstituteList} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/profile" component={AdminProfile} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/list/professional" component={AdmintProfList} />:null
          }
          <Route path="*" component={NotFound} />
           
          
      </Switch>
        
       );
    }
    if ( this.props.isInstituteAuth && this.props.isAuthenticated) {
      routes = (
        <Switch>
             <Route path="/" exact component={UserHome} />
             <Route path="/signup" component={UserSignup} />
             <Route path="/signin" component={UserSignIn} />
            <Route path="/forgot_password" component={UserForgotPswd} />
            <Route path="/institute_register" component={InstituteSignup} />
             <Route path="/institute/login" component={InstituteSignIn} />
             <Route path="/institute/forgot/password" component={InstituteForgotPswd} />
             <Route path="/hospitals/clinics" component={HospClinicLists} />
             <Route path="/hospital/search" component={ filterdInstitute} />
             <Route path="/hospitals" component={HospitalLists} />
             <Route path="/institute/home" component={InstituteHome} />
             <Route path="/institute_lists_GROUP=:grp/CATEGORY=:catg" component={InstituteLists} />
             <Route path="/institute_counter_ISTID=:istid" component={InstituteCounter}/>
             <Route path="/institute_counter_COUNTERID=:counterId/ISTID=:istId" component={InstituteToken} />
             <Route path="/user/siginin/token/booking" component={UserSignInBook} />
             <Route path="/verification" component={UserResetPswd} />
             <Route path="/verify/register" component={UserRegVerification} />
             <Route path="/send_otp" component={UserForgotVerification} />
 
             <Route path="/institute/edit/profile" component={InstituteProfileEdit} />
            <Route path="/institute/create/otp" component={InstituteForgotVerification} />
             <Route path="/institute/create/counter" component={InstituteCreateCounter} />
             <Route path="/institute/counter/add/slot" component={InstituteCounterAddSlot} />
             <Route path="/institute/active/tokens" component={InstituteTokensBooked} />
             <Route path="/institute/view/professionals" component={InstituteProfessionalView} />
             <Route path="/institute/register/professional" component={InstituteProfessionalRegister} />
             <Route path="/institute/change/password" component={InstituteChangePswd} />
             <Route path="/institute/list/counter" component={InstituteCounters} />
             <Route path="/success" component={InstituteSuccess} />
             <Route path="/institute_success" component={InstiSuccesNoti} />
             <Route path="/institute/update/professional/profId=:profId" component={InstituteUpdateProf} /> 
             <Route path="/institute/view/slots/counterId=:counterId" component={InstituteViewSlot}/>
             <Route path="/institute/update/slots/slotId=:slotId" component={InstituteUpdateSlot}/>
             <Route path="/institute/update/counterId=:counterId" component={ InstitituteUpdateCounter}/>
 
             <Route path="/institute/create/otp" component={InstituteForgotVerification} />
           <Route path="/institute/reset/password" component={InstituteResetPswd} />
           <Route path="/verify/institute" component={InstituteVerification} />

           <Route path="/user/profile" component={UserProfile} />
          <Route path="/user/edit/profile" component={EditProfile} />
          <Route path="/user/settings" component={ProfileSettings} />
          <Route path="/user/mytokens" component={ActiveToken } />
           <Route path="/user/cancelled/tokens" component={CancelledToken} />
          <Route path="/user/expired/tokens" component={ExpiredToken} />

          <Route path="/institute/create/otp" component={InstituteForgotVerification} />
          <Route path="/institute/reset/password" component={InstituteResetPswd} />
          <Route path="/verify/institute" component={InstituteVerification} />

          <Route path="/doctors" component={ DoctorSearch} />
          <Route path="/doctor/profile_PROF_ID=:profid" component={DoctorProfile} />
          <Route path = "/doctor/hospital/lists_DayId=:dayId/day=:day/ProfId=:profid" component={DrConsultHosList}/>
          <Route path = "/doctor/hospital/counter_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterListByDay}/>
          <Route path = "/doctor/hospital/counter_ProfId=:profid/InstituteId=:istId" component={ DrConsultHosCounterList}/>
          <Route path = "/doctor/hospital_list/token/book_ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBook}/> 
          <Route path = "/doctor/hospital/token/booking_DayId=:dayId/day=:day/ProfId=:profid/InstituteId=:istId/counter_id=:counterId" component={DoctorTokenBookByDay}/>

          <Route path="/admin_login" component={AdminSignIn} />
          { this.props.isAdminAuth?
          <Route path="/admin/home" component={AdminHome} />:null
          }
          { this.props.isAdminAuth?
          <Route path="/admin/list/users" component={UsersList} />:null
          }
           { this.props.isAdminAuth?
         <Route path="/admin/list/institute" component={AdmintInstituteList} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/profile" component={AdminProfile} />:null
          }
           { this.props.isAdminAuth?
           <Route path="/admin/list/professional" component={AdmintProfList} />:null
          }
          <Route path="*" component={NotFound} />
      </Switch> 
         
        );
    }  
    

  return (
    <div>
     <Switch>
         {routes}
      </Switch>
     </div>
    
   
    
   
  );
}
}
const mapStateToProps = state => {
  return {
    isAuthenticated:state.user.tokenId !== null,
    // isGetVerified:state.user.userData !== null,
    isInstituteAuth:state.institute.token !== null,
    // isInstGetVerfy:state.institute.instituteData !==null,
    isDetail:state.user.detail !== null,
    isAdminAuth:state.admin.adminToken !== null
  };
};
const mapDispatchToProps = dispatch =>{
  return{
    onTryuAutoSignup: () =>dispatch(actions.authCheckState()),
    Signup: () =>dispatch(actions.authInstCheckState()),
    adminSignup: () =>dispatch(actions.authadminCheckState())
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
