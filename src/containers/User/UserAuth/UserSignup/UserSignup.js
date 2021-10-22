import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import UserLayout from '../../../../components/UserLayout/UserLayout'
import Classes from './UserSignup.module.css'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'

const UserSignup = (props)=>{
	

	const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
	
	const formik = useFormik
	({
		initialValues:
		{
			full_name: "",
			user_id: "",
			user_passwd: "",
			confirm_passwd: ""
		},
		validationSchema: Yup.object
		({
				full_name: Yup.string()
					.required("Enter your name"),
				user_id: Yup.string()
					.matches(phoneRegex, "Invalid Mobile Number")
					.required("Enter your mobile number"),
				user_passwd: Yup.string()
					.min(6, "Password should be at least 6 characters ")
					.required("Enter your password"),
				confirm_passwd: Yup.string()
					.oneOf([Yup.ref("user_passwd")], "Password do not match")
					.min(6, "Password should be at least 6 characters ")
					.required("Re-enter your password")
			}),

		onSubmit: (values,onSubmitprops) => {
			let nameTrim = values.full_name.trim()
			let mobileTrim = values.user_id
			let passwordTrim = values.user_passwd.trim()
			let confirm_passwordTrim = values.confirm_passwd.trim()
			const inputs = { name: nameTrim, mobile: mobileTrim, password: passwordTrim, confirm_password: confirm_passwordTrim }
			props.onUserSignup(inputs,props.history)
			
		}
	});
	let form = (
		<form  autoComplete="off" style={style.formMarg}>
			<div  className={Classes.FormGroup}>
				<label htmlFor="fullName" className="input-label">Full Name</label>
					<input
						type="name"
						className="form-control"
						name="full_name"
						value={formik.values.full_name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={style.Input}/>
						{formik.touched.full_name&& formik.errors.full_name && (<div className={Classes.ErrorMsg}>{formik.errors.full_name}</div>)}
			</div>
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
				<label htmlFor="paswd" className="input-label">Password</label>
					<input type="password"
							name="user_passwd"
							value={formik.values.user_passwd}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Passwords must be at least 6 characters"
							className="form-control textbox"
							style={style.Input} />
						{formik.touched.user_passwd && formik.errors.user_passwd && (<div className={Classes.ErrorMsg}>{formik.errors.user_passwd}</div>)}
			</div>
			<div className="clearfix add_bottom_15"></div>
				<div className={Classes.FormGroup}>
					<label htmlFor="confirmPswd" className="input-label">Confirm Password</label>
						<input type="password"
								name="confirm_passwd"
								placeholder="Re-type password"
								className="form-control textbox"
								value={formik.values.confirm_passwd}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								style={style.Input}
									/>
						{formik.touched.confirm_passwd && formik.errors.confirm_passwd && (<div className={Classes.ErrorMsg}>{formik.errors.confirm_passwd}</div>)}
				</div>
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}

	return (
		<div>
                <UserLayout head="Create Account" st={Classes.MainPad}>
					 <div className={Classes.ServerErrorMsg}>{props.error}</div>
					{form}
						<p className={Classes.SubHead}>We will send you a verification code to your phone.</p>
					<UserButton clicked={formik.handleSubmit}>
					CONTINUE
					</UserButton>
					<div className={Classes.LoginSubhead}><p>Already have an account? <span className={Classes.LoginLink}><Link to='/signin'>Log In!</Link> </span></p></div>
            	</UserLayout>
        </div>
	)
}

const style ={
	Input:{
		paddingLeft: '10px',
		fontWeight: '500',
		backgroundColor: 'rgb(244, 244, 244)',
		borderColor: 'rgb(240, 240, 240)',
		height: '40px'
		},
	formMarg:{
		marginTop: '45px'
	}
}
const mapStateToProps = state =>{
    return{
		error:state.user.signupErr,
		loading: state.user.loading,
		
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onUserSignup:(values,history)=>dispatch(actions.userSignup(values,history))
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(UserSignup)

