import * as actionTypes from './actionType'
import axios from 'axios'


export const user_signup_start = () =>{
    return{
        type:actionTypes.USER_SIGNUP_START
    }
}
export const user_signup_success = (userData) =>{
    return{
        type: actionTypes.USER_SIGNUP_SUCCESS,
        userData:userData
        
    }
}
export const user_signup_fail = (error) =>{
    return{
        type: actionTypes.USER_SIGNUP_FAIL,
        error: error
    }
}
export const userSignup = (values,history)=>{
    return dispatch =>{
        dispatch(user_signup_start())
        axios.post('/verify/register',values)
        .then(response => {
            
            dispatch(user_signup_success(response.data))
            history.push({
                pathname: '/verify/register'
                
            })
        })
        .catch ( error =>{
            dispatch(user_signup_fail(error.response.data))
            // console.log(error.response)
        })
        
    }
}
export const user_reg_verfi_start = () =>{
    return{
        type:actionTypes.USER_REG_VERIFI_START
    }

}
export const user_reg_verfi_fail = (error) =>{
   return{
       type:actionTypes.USER_REG_VERIFI_FAIL,
       error: error
   }

}
export const user_reg_verfi_success = () =>{
   return{
       type:actionTypes.USER_REG_VERIFI_SUCCESS
   }

}
export const userRegVerifi= (otpDet,history) =>{
    console.log(otpDet)
   return dispatch =>{
        dispatch(user_reg_verfi_start())
       axios.post('/register',otpDet)
        .then(response =>{
            dispatch(user_reg_verfi_success())
           
            history.push({
                pathname: '/signin'
            })
           
        })
        .catch( error =>{
            dispatch(user_reg_verfi_fail(error.response.data))
            console.log(error.response)
        })
    }
}
export const user_signin_start = () =>{
    return{
        type:actionTypes.USER_SIGNIN_START
    }
}
export const user_signin_success = (tokenId,name) =>{
    return{
        type: actionTypes.USER_SIGNIN_SUCCESS,
        tokenId:tokenId,
        userName:name,
       
    }
}
export const user_signin_fail = (error) =>{
    return{
        type:actionTypes.USER_SIGNIN_FAIL,
        error: error
    }
}
export const userSignin = (values,history) =>{
    return dispatch =>{
        dispatch(user_signin_start())
        axios.post('/signin',values)
        .then(response =>{
            localStorage.setItem('token',response.data.uid)
            localStorage.setItem('name',response.data.name)
            dispatch(user_signin_success(response.data.uid,response.data.name))
            history.push({
                pathname: '/'
            })
        })
        .catch( error =>{
            dispatch(user_signin_fail(error.response.data.errMsg))
            console.log(error.response)
        })  
    }
} 
export const user_forgot_start = () =>{
    return{
        type: actionTypes.USER_FORGOT_START  
    }
}
export const user_forgot_success = (userData) =>{
    return{
        type: actionTypes.USER_FORGOT_SUCCESS,
        userData:userData
    }
}
export const user_forgot_fail = (error) =>{
    return{
        type: actionTypes.USER_FORGOT_FAIL,
        error: error
    }
}
export const userForgot = (values,history) =>{
   return dispatch =>{
        dispatch(user_forgot_start())
       axios.post('/send_otp',values)
        .then(response =>{
            console.log(response);
            dispatch(user_forgot_success(response.data))
            history.push('/send_otp')
            // console.log(response)
            
        })
        .catch( error =>{
            dispatch(user_forgot_fail(error.response.data))
            // console.log(error.response)
        })
    }
}
export const user_forgot_verfi_start = () =>{
    return{
        type: actionTypes.USER_FORGOT_VERFI_START
    }
}
export const user_forgot_verfi_success= () =>{
    return{
        type: actionTypes.USER_FORGOT_VERFI_SUCCESS,
        
    }
}
export const user_forgot_verfi_fail= (error) =>{
    return{
        type: actionTypes.USER_FORGOT_VERFI_FAIL,
        error: error
    }   
}

export const userForgotVerfi = (otpDet,history) =>{
  
    return dispatch =>{
         dispatch(user_forgot_verfi_start())
        axios.post('/verification',otpDet)
         .then(response =>{
             dispatch(user_forgot_verfi_success())
             history.push('/verification')
             console.log(response)
             
         })
         .catch( error =>{
             dispatch(user_forgot_verfi_fail(error.response.data))
            //  console.log(error.response)
             

         })
        
     }
 }
 export const user_reset_pswd_start = () =>{
    return{
        type: actionTypes.USER_RESET_PSWD_START
    }
}
export const user_reset_pswd_fail= (error) =>{
    return{
        type: actionTypes.USER_RESET_PSWD_FAIL,
        error: error
    }   
}
export const user_reset_pswd_success= () =>{
    return{
        type: actionTypes.USER_RESET_PSWD_SUCCESS,
        
    }
}
export const userResetPswd = (values,history) =>{
    return dispatch =>{
         dispatch(user_reset_pswd_start())
        axios.post('/changepassword',values)
         .then(response =>{
             dispatch(user_reset_pswd_success())
             history.push('/signin')
            //  console.log(response)
         })
         .catch( error =>{
             dispatch(user_reset_pswd_fail(error))
            //  console.log(error.response)
         })
        
     }
 }
 export const userLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    
  
   
     return{
        type: actionTypes.USER_LOGOUT

     }
    
 }
 export const authCheckState = () =>{
     return dispatch=>{
         const token = localStorage.getItem('token')
         const name = localStorage.getItem('name')
       
         if(!token){
             dispatch(userLogout())
         }
         else{
             dispatch(user_signin_success(token,name))
         }
     }
 }
 export const user_service_select= (selectedItem) =>{
  return{
        type: actionTypes.USER_SERVICE_SELECT,
        selectedItem:selectedItem
    }
}
export const user_token_booked= (tokenDetails) =>{
    return{
          type: actionTypes.USER_TOKEN_BOOKED,
          tokenDetails:tokenDetails
      }
  }
  


