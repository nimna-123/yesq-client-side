import React,{useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import Classes from './InstituteResetPswd.module.css'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import InstituteAuthHeader from '../../../../components/InstituteAuthHeader/InstituteAuthHeader'
import Spinner from '../../../../components/UI/Spinner/Spinner'

const InstituteResetPswd = (props) =>{
    useEffect(() => {
        if(props.otpData === null){
            props.history.push('/institute/forgot/password')
        }
        else{
           
        }

    }, [props.history,props.otpData]);
  
    const formik = useFormik
	({
		initialValues:
		{
			new_pswd: ""
        },
        validationSchema: Yup.object
			({
				new_pswd: Yup.string()
					.required("Enter your new password")
                    .min(6, "Password should be at least 6 characters ")
            }),

		onSubmit: (values,onSubmitprops) => {
			let newPswdTrim = values.new_pswd
            const uid = props.otpData.uid
			const inputs = {password:newPswdTrim,uid:uid}
            props.onInstituteResetPswd(inputs,props.history)
            onSubmitprops.resetForm()
          
        }
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<input type='password'
						   name="new_pswd"
                           value={formik.values.new_pswd}
                           onChange={formik.handleChange}
						   onBlur={formik.handleBlur}
                           className="form-control"
                           placeholder='password'
							style={style.Input} />
                             {formik.touched.new_pswd && formik.errors.new_pswd && (<div className={Classes.ErrorMsg}>{formik.errors.new_pswd}</div>)}
            </div>
			
		</form>
	);
    if(props.loading){
		form = <Spinner/>
	}
    return(
        <InstituteAuthHeader  caption='Business with us'>
              <InstituteLayout head='Reset Password YesQ Pvt. Ltd.' subHead=''>
                {form}
                 <UserButton clicked={formik.handleSubmit}>Reset Password</UserButton>
            </InstituteLayout>
        </InstituteAuthHeader>
      

    )
}
const style ={
    Input:{
        paddingLeft: '10px',
        fontWeight: '500',
        height: '50px',
        backgroundColor: '#eef0f8',
        borderColor: 'rgb(240, 240, 240)'
        }

}
const mapStateToProps = state =>{
    return{
		instData:state.institute.instituteData,
        otpData:state.institute.otpData,
        loading:state.institute.loading,
        error:state.institute.error
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onInstituteResetPswd:(values,history)=>dispatch(actions.instituteResetPswd(values,history))
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InstituteResetPswd))