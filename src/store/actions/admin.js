import * as actionTypes from './actionType'
import axios from 'axios'

export const admin_signIn_start = () =>{
    return{
        type:actionTypes.ADMIN_SIGNIN_START
    }
}
export const admin_signIn_success = (adminToken) =>{
    return{
        type: actionTypes.ADMIN_SIGNIN_SUCCESS,
        adminToken:adminToken
    }
}   
export const admin_signIn_fail = (error) =>{
    return{
        type: actionTypes.ADMIN_SIGNIN_FAIL,
        error: error 
    }
}
export const adminSignIn = (values,history)=>{
    return dispatch =>{
        dispatch(admin_signIn_start())
        axios.post('/admin_login',values)
        .then(response => {
            localStorage.setItem('admin_token',response.data)
            dispatch(admin_signIn_success(response.data))
           history.push('/admin/home')
            
        })
        .catch ( error =>{
            console.log(error.response);
            dispatch(admin_signIn_fail(error.response.data))
            
        })
     }
}

export const adminLogout = (history) =>{
    localStorage.removeItem('admin_token')
  return{
        type: actionTypes.ADMIN_LOGOUT

     }
    
 }
 export const authadminCheckState = () =>{
    return dispatch=>{
        const tokenAdmin = localStorage.getItem('admin_token')
        
        if(!tokenAdmin){
            dispatch(adminLogout(admin_signIn_success))
        }
        else{
           dispatch(admin_signIn_success(tokenAdmin))
        }
    }
}