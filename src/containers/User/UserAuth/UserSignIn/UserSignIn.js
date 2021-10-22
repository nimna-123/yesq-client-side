import React from 'react'
import { Link } from "react-router-dom"
import Userlayout from '../../../../components/UserLayout/UserLayout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Classes from './UserSignIn.module.css'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'
const UserSignIn = (props) => {
    const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
    const formik = useFormik
	({ 
		initialValues:
		{
			user_id: "",
			user_passwd: "",
		},
		validationSchema: Yup.object
		({
				user_id: Yup.string()
					.matches(phoneRegex, "Invalid Mobile Number")
					//  .min(10, "Mobile number must be 10 digits")
					//  .max(10, "Mobile number must be 10 digits")
					.required("Enter your mobile number"),
				user_passwd: Yup.string()
					.min(6, "Password should be at least 6 characters ")
					.required("Enter your password"),
				
		}),
		onSubmit: (values,onSubmitprops) => {
			let mobileTrim = values.user_id
			let passwordTrim = values.user_passwd.trim()
			const inputs = { mobile: mobileTrim, password: passwordTrim}
            props.onUserSignin(inputs,props.history)
			onSubmitprops.resetForm()
		}
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<label htmlFor="mobNum" className="input-label">Mobile Number</label>
					<input type='text'
						   name="user_id"
						   value={formik.values.user_id}
                           onChange={formik.handleChange}
						    onBlur={formik.handleBlur}
						    className="form-control"
							style={style.Input} />
                            {formik.touched.user_id && formik.errors.user_id && (<div className={Classes.ErrorMsg}>{formik.errors.user_id}</div>)}
			</div>
			<div className={Classes.FormGroup} >
						<label htmlFor="pswd" className="input-label">Password</label>
							<input type="password"
								name="user_passwd"
								value={formik.values.user_passwd}
                                onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
								className="form-control textbox"
								style={style.Input} />
                                {formik.touched.user_passwd && formik.errors.user_passwd && (<div className={Classes.ErrorMsg}>{formik.errors.user_passwd}</div>)}
			</div>
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}
    return (
        <div>
            <Userlayout head="SIGN IN" st={Classes.MainPad}>
			<div className={Classes.ServerErrorMsg}>{props.error}</div>
            {form}
            <p className={Classes.ForgotHead}><Link to='/forgot_password'>Forgot Password?</Link></p>
            <UserButton clicked={formik.handleSubmit}>SIGN IN</UserButton>
            <p className={Classes.SignUpHead}>You don't have an account?<span className={Classes.SignUpLink}><Link to='/signup'>Sign up!</Link></span></p>
            </Userlayout>
        </div>
    )
    
}
const style ={
	Input:{
		paddingLeft: '10px',
        fontWeight: '500',
		backgroundColor: 'rgb(244, 244, 244)',
		borderColor: 'rgb(240, 240, 240)',
		}
}
const mapStateToProps = state =>{
    return{
		error:state.user.signinErr,
		loading: state.user.loading,
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserSignin:(values,history)=>dispatch(actions.userSignin(values,history))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(UserSignIn)
