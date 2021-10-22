import React from 'react'
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import Classes from './InstituteSignIn.module.css'
import { Link } from "react-router-dom"
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import InstituteAuthHeader from '../../../../components/InstituteAuthHeader/InstituteAuthHeader'
import Spinner from '../../../../components/UI/Spinner/Spinner'


const InstituteSignIn = (props) =>{
	const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
    
    const formik = useFormik
	({
		initialValues:
		{
			user_name: "",
			password: "",
		},
		validationSchema: Yup.object
		({
			user_name: Yup.string()
				
					.required("Enter your username")
					.matches(phoneRegex, "Invalid Mobile Number"),
			password: Yup.string()
					.min(6, "Password should be at least 6 characters ")
					.required("Enter your password"),
				
		}),
		onSubmit: (values,onSubmitprops) => {
			
			let mobileTrim = values.user_name
			let passwordTrim = values.password.trim()
			const inputs = {username: mobileTrim, password: passwordTrim}
          	props.onInstituteSignIn(inputs,props.history)
			onSubmitprops.resetForm()
		}
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.InputPad} >
						<input type="text"
								name="user_name"
								value={formik.values.user_name}
                                onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
                               className="form-control textbox"
								style={style.Input}
                                placeholder='username' />
                                 {formik.touched.user_name && formik.errors.user_name && (<div className={Classes.ErrorMsg}>{formik.errors.user_name}</div>)}
            </div>
            <div className={Classes.InputPad} >
						<input type="password"
								name="password"
								value={formik.values.password}
                                onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
                               className="form-control textbox"
								style={style.Input}
                                placeholder='password' />
                                 {formik.touched.password && formik.errors.password && (<div className={Classes.ErrorMsg}>{formik.errors.password}</div>)}
            </div>
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}
    return(
		<InstituteAuthHeader  caption='Business with us'>
			<InstituteLayout head='Sign In YesQ Pvt. Ltd.'>
			<div className={Classes.ServerErrorMsg}>{props.error}</div>
				{form}
				<UserButton clicked={formik.handleSubmit}>sign in</UserButton>
				<p className={Classes.ForgtPwsd}><Link to='/institute/forgot/password' className={Classes.ForgtPwsdLink}>Forgot password?</Link></p>
			</InstituteLayout >
		</InstituteAuthHeader>
	)
	

	

       
}
const style ={
	Input:{
		paddingLeft: '10px',
        fontWeight: '500',
		backgroundColor: '#eef0f8',
        height:'50px',
		borderColor: 'rgb(240, 240, 240)',
		}
    
}
const mapStateToProps = state =>{
    return{
		error:state.institute.signinErr,
		loading: state.institute.loading,
        
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onInstituteSignIn:(values,history)=>dispatch(actions.instituteSignIn(values,history))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(InstituteSignIn)