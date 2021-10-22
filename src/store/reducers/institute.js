import * as actionTypes from '../actions/actionType'
const initalState = {
    loading: false,
    error: null,
    groupList:true,
    signupErr:null,
    instituteData:null,
    signinErr:null,
    forgotErr:null,
    token:null,
    istId:null,
    istDet:null,
    istDetErr:null,
    otpData:null,
    

}
const reducer = (state=initalState,action)=>{
    switch(action.type){
        case actionTypes.INSTITUTE_SIGNUP_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.INSTITUTE_SIGNUP_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                instituteData:action.instituteData
                
            }     
        case actionTypes.INSTITUTE_SIGNUP_FAIL:
            return{
                    ...state,
                    loading: false,
                    signupErr: action.error
                }
        case actionTypes.INSTITUTE_VERIFY_START:
                        return{
                            ...state,
                            loading: true,
                                
                        }
        case actionTypes.INSTITUTE_VERIFY_SUCCESS:
                        return{
                            ...state,
                            loading: false,
                            error: null,
                             
                        }
        case actionTypes.INSTITUTE_VERIFY_FAIL:
                        return{
                            ...state,
                            loading: false,
                            error: action.error
                        }
        case actionTypes.INSTITUTE_SIGNIN_START:
                    return{
                        ...state,
                        loading: true,
                        signinErr: null,
                        istId:null
                    }
        case actionTypes.INSTITUTE_SIGNIN_SUCCESS:
                    return{
                        ...state,
                        loading: false,
                        signinErr: null,
                        token:action.token,
                        istId:action.token
                    }
        case actionTypes.INSTITUTE_SIGNIN_FAIL:
                return{
                        ...state,
                        loading: false,
                        signinErr: action.error,
                        istId:null
                        }
        case actionTypes.INSTITUTE_FORGOT_START:
                return{
                    ...state,
                    loading: true,
                    forgotErr:null,
                    
                }
        case actionTypes.INSTITUTE_FORGOT_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    forgotErr:null,
                    otpData:action.instituteData
                }
        case actionTypes.INSTITUTE_FORGOT_FAIL:
                    return{
                        ...state,
                        loading: false,
                        forgotErr:action.error
                    }
        case actionTypes.INSTITUTE_FORGOT_VERFI_START:
                    return{
                        ...state,
                        loading: true,
                            
                    }
        case actionTypes.INSTITUTE_FORGOT_VERFI_SUCCESS:
                    return{
                        ...state,
                        loading: false,
                        error: null
                    }
        case actionTypes.INSTITUTE_FORGOT_VERFI_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.error
                    }
        case actionTypes.INSTITUTE_RESET_PSWD_START:
                    return{
                            ...state,
                            loading: true,
                            error: null
                         }
        case actionTypes.INSTITUTE_RESET_PSWD_SUCCESS:
                    return{
                            ...state,
                            loading: false,
                            error: null,
                           
                        }
        case actionTypes.INSTITUTE_RESET_PSWD_FAIL:
                    return{
                                ...state,
                                loading: false,
                                error: action.error
                         }
        
        case actionTypes.INSTITUTE_CHANGE_PSWD_START:
                            return{
                                ...state,
                                loading: true,
                                    
                            }
        case actionTypes.INSTITUTE_CHANGE_PSWD_SUCCESS:
                            return{
                                ...state,
                                loading: false,
                                error: null
                            }
        case actionTypes.INSTITUTE_CHANGE_PSWD_FAIL:
                            return{
                                ...state,
                                loading: false,
                                error: action.error
                            }
        case actionTypes.INSTITUTE_LOGOUT:
                            return{
                                    ...state,
                                    token:null
                                }
        case actionTypes.INSTITUTE_FETCHDET_START:
                            return{
                                    ...state,
                                    loading: true,
                                    istDetErr: null
                                }
        case actionTypes.INSTITUTE_FETCHDET_SUCCESS:
                            return{
                                    ...state,
                                    istDetErr: null,
                                    istDet:action.istDet
                                }
        case actionTypes.INSTITUTE_FETCHDET_FAIL:
                            return{
                                    ...state,
                                    istDetErr: action.error
                                 }
                        
        default:{
            return{
                        ...state
                    }
                }
    }
}
export default reducer