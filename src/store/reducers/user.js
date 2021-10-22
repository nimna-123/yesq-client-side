import * as actionTypes from '../actions/actionType'

const initalState = {
    loading: false,
    error: null,
    signupErr:null,
    signinErr:null,
    forgotErr:null,
    userData: null,
    userVerify:null,
    tokenId:null,
    userName:null,
    detail:null,
    selectdItm:null,
    tokenDetails:null
  
  
}
const reducer = (state=initalState,action)=>{
    switch(action.type){
        case actionTypes.USER_SIGNUP_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.USER_SERVICE_SELECT:
            return{
                ...state,
                selectdItm:action.selectedItem
            }
        case actionTypes.USER_SIGNUP_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                userData:action.userData
               
            }
        case actionTypes.USER_SIGNUP_FAIL:
            return{
                    ...state,
                    loading: false,
                    signupErr: action.error
                }
        case actionTypes.USER_REG_VERIFI_START:
            return{
                ...state,
                loading: true,
                error: null
                }
        case actionTypes.USER_REG_VERIFI_SUCCESS:
            return{
                ...state,
                error: null,
                loading:false
                        }
        case actionTypes.USER_REG_VERIFI_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
                }
       
        case actionTypes.USER_SIGNIN_START:
            return{
                ...state,
                signinErr: null,
                loading: true,
               
            }
        case actionTypes.USER_SIGNIN_SUCCESS:
            return{
                ...state,
                signinErr: null,
                loading: false,
                tokenId:action.tokenId,
                userName:action.userName,
               
            }
        case actionTypes.USER_SIGNIN_FAIL:
            return{
                ...state,
                signinErr: action.error,
                loading:false
            }
        case actionTypes.USER_FORGOT_START:
            return{
                ...state,
                loading: true,
                forgotErr: null
            }
        case actionTypes.USER_FORGOT_SUCCESS:
            return{
                ...state,
                forgotErr: null,
               loading:false,
               userVerify:action.userData
            }
        case actionTypes.USER_FORGOT_FAIL:
                return{
                    ...state,
                    forgotErr: action.error,
                   loading:false
                }
        case actionTypes.USER_FORGOT_VERFI_START:
                    return{
                    ...state,
                    loading: true
                }
        case actionTypes.USER_FORGOT_VERFI_SUCCESS:
                return{
                    ...state,
                    error: null,
                    loading:false
                }
        case actionTypes.USER_FORGOT_VERFI_FAIL:
                return{
                    ...state,
                    error:action.error,
                    loading:false
                }
        case actionTypes.USER_RESET_PSWD_START:
                return{
                    ...state,
                    loading: true
                }
        case actionTypes.USER_RESET_PSWD_FAIL:
                return{
                        ...state,
                        loading: false,
                        error: action.error
                    }
        case actionTypes.USER_RESET_PSWD_SUCCESS:
                return{
                         ...state,
                        error: false,
                        loading: false,
                }
        case actionTypes.USER_TOKEN_BOOKED:
                    return{
                             ...state,
                             tokenDetails:action.tokenDetails
                           
                    }
        case actionTypes.USER_LOGOUT:
                return{
                    ...state,
                    tokenId:null
                }
        
        default:{
            return{
                        ...state
                    }
                }
    }
}
export default reducer