import * as actionTypes from './actionType'
import axios from 'axios'
export const institute_signup_start = () =>{
    return{
        type:actionTypes.INSTITUTE_SIGNUP_START
    }
}
export const institute_signup_success = (instituteData) =>{

    return{
        type: actionTypes.INSTITUTE_SIGNUP_SUCCESS,
        instituteData:instituteData

    }
}
export const institute_signup_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_SIGNUP_FAIL,
        error: error
    }
}
export const instituteSignup = (values,history)=>{
   return dispatch =>{
        dispatch(institute_signup_start())
        axios.post('/verify/institute',values)
        .then(response => {
           
            dispatch(institute_signup_success(response.data))
            history.push('/verify/institute')
        })
        .catch ( error =>{
            dispatch(institute_signup_fail(error.response.data))
        })
    }
}
export const institute_verify_start = () =>{
    return{
        type: actionTypes.INSTITUTE_VERIFY_START
    }
}
export const institute_verify_success = () =>{ 
    return{
        type: actionTypes.INSTITUTE_VERIFY_SUCCESS
    }
}
export const institute_verify_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_VERIFY_FAIL,
        error: error
    }
}
export const instituteVerify= (values,history)=>{
    return dispatch =>{
    dispatch(institute_verify_start())
        axios.post('/institute/registration',values)
        .then(response => {
            
            dispatch(institute_verify_success())
            history.push('/success')
        })
        .catch ( error =>{
          
            dispatch(institute_verify_fail(error.response.data)) 
        })
    }
}
export const institute_signIn_start = () =>{
    return{
        type:actionTypes.INSTITUTE_SIGNIN_START 
    }
}
export const institute_signIn_success = (token) =>{
    return{
        type: actionTypes.INSTITUTE_SIGNIN_SUCCESS,
        token:token
    }
}   
export const institute_signIn_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_SIGNIN_FAIL,
        error: error 
    }
}
export const instituteSignIn = (values,history)=>{
    return dispatch =>{
        dispatch(institute_signIn_start())
        axios.post('/institute/login',values)
        .then(response => {
            localStorage.setItem('tokens',response.data)
            dispatch(institute_signIn_success(response.data))
           
            history.push('/institute/home')
            
            
        })
        .catch ( error =>{
            dispatch(institute_signIn_fail(error.response.data))
            
        })
     }
}
export const institute_forgot_start = () =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_START
    }
}
export const institute_forgot_success = (instituteData) =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_SUCCESS,
        instituteData:instituteData
    }
}
export const institute_forgot_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_FAIL,
        error: error
    }
}
export const instituteForgot= (values,history)=>{
    return dispatch =>{
        dispatch(institute_forgot_start())
        axios.post('/institute/create/otp',values)
        .then(response => {
           
            dispatch(institute_forgot_success(response.data))
            history.push({
                pathname: '/institute/create/otp'
               
            })
           
        })
        .catch (error =>{
            dispatch(institute_forgot_fail(error.response.data))
         })
    }
}
export const institute_forgot_verifi_start = () =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_VERFI_START
    }
}
export const institute_forgot_verifi_success = () =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_VERFI_SUCCESS
    }
}
export const institute_forgot_verifi_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_FORGOT_VERFI_FAIL,
        error: error
    }
}
export const instituteForgotVerify= (values,history)=>{
    return dispatch =>{
        dispatch(institute_forgot_verifi_start())
        axios.post('/institute/validate/otp',values)
        .then(response => {
            dispatch(institute_forgot_verifi_success())
            history.push('/institute/reset/password')
           
        })
        .catch ( error =>{
            dispatch(institute_forgot_verifi_fail(error.response.data))
            
        })
       
    }
}
export const institute_reset_pswd_start = () =>{
    return{
        type: actionTypes.INSTITUTE_RESET_PSWD_START
    }
}
export const institute_reset_pswd_success = () =>{
    return{
        type: actionTypes.INSTITUTE_RESET_PSWD_SUCCESS
    }
}
export const institute_reset_pswd_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_RESET_PSWD_FAIL,
        error: error
    }
}
export const instituteResetPswd = (values,history)=>{
    return dispatch =>{
        dispatch(institute_reset_pswd_start())
        axios.post('/institute/reset/password',values)
        .then(response => {
            dispatch(institute_reset_pswd_success())
            history.push('/institute/login')
          
        })
        .catch (error =>{
            dispatch(institute_reset_pswd_fail(error))
           
        })
       
       
    }
}



export const institute_change_pswd_start = () =>{
    return{
        type: actionTypes.INSTITUTE_CHANGE_PSWD_START
    }
}
export const institute_change_pswd_success = () =>{
    return{
        type: actionTypes.INSTITUTE_CHANGE_PSWD_SUCCESS
    }
}
export const institute_change_pswd_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_CHANGE_PSWD_FAIL,
        error: error
    }
}
export const instituteChangePswd= (values,history)=>{
    
    return dispatch =>{
        dispatch(institute_change_pswd_start())
        axios.post('/institute/change/password',values)
        .then(response => {
            dispatch(institute_change_pswd_success())
            history.push('/institute_success')
        })
        .catch ( error =>{
            dispatch(institute_change_pswd_fail(error.response.data))
            
        })
    }
}
export const instituteLogout = (history) =>{
    localStorage.removeItem('tokens')
  return{
        type: actionTypes.INSTITUTE_LOGOUT

     }
    
 }
 export const authInstCheckState = () =>{
     return dispatch=>{
         const tokenId = localStorage.getItem('tokens')
         
         if(!tokenId){
             dispatch(instituteLogout())
            
         }
         else{
             dispatch(institute_signIn_success(tokenId))
         }
     }
 }
 export const institute_fetchDet_start = () =>{
    return{
        type: actionTypes.INSTITUTE_FETCHDET_START
    }
}
export const institute_fetchDet_success = (istDet) =>{
    return{
        type: actionTypes.INSTITUTE_FETCHDET_SUCCESS,
        istDet:istDet
    }
}
export const institute_fetchDet_fail = (error) =>{
    return{
        type: actionTypes.INSTITUTE_FETCHDET_FAIL,
        error: error
    }
}
export const instituteFetchDet= (values)=>{
    return dispatch =>{
        dispatch(institute_fetchDet_start())
        axios.post('/institute/home',values)
        .then(response => {
            dispatch(institute_fetchDet_success(response.data))
        })
        .catch ( error =>{
            dispatch(institute_fetchDet_fail(error))
        })
    }
}