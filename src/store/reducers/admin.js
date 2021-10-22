import * as actionTypes from '../actions/actionType'
const initalState = {
    loading: false,
    error: null,
    adminToken:null,
   
    

}
const reducer = (state=initalState,action)=>{
    switch(action.type){
      
        case actionTypes.ADMIN_SIGNIN_START:
                    return{
                        ...state,
                        loading: true,
                        error: null,
                        
                    }
        case actionTypes.ADMIN_SIGNIN_SUCCESS:
                    return{
                        ...state,
                        loading: false,
                        error: null,
                        adminToken:action.adminToken
                       
                    }
        case actionTypes.ADMIN_SIGNIN_FAIL:
                return{
                        ...state,
                        loading: false,
                        error: action.error,
                       
                        }
        case actionTypes.INSTITUTE_LOGOUT:
                return{
                        ...state,
                        adminToken:null
                    }
   
        default:{
            return{
                        ...state
                    }
                }
    }
}
export default reducer