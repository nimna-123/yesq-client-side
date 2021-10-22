import React from 'react'
import InstituteLayout from '../../../components/InstituteLayout/InstituteLayout'
import UserButton from '../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InstituteAuthHeader from '../../../components/InstituteAuthHeader/InstituteAuthHeader'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'


const AdminSignIn = (props) =>{
  
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
				
					.required("Enter your username"),
					
			password: Yup.string()
					.min(6, "Password should be at least 6 characters ")
					.required("Enter your password"),
				
		}),
		onSubmit: (values,onSubmitprops) => {
			
			let mobileTrim = values.user_name
			let passwordTrim = values.password.trim()
			const inputs = {username: mobileTrim, password: passwordTrim}
            props.onAdminSignIn(inputs,props.history)
			onSubmitprops.resetForm()
		}
	});
	
    let form = (
		<form  autoComplete="off">
			<div style={style.InputPad} >
						<input type="text"
								name="user_name"
								value={formik.values.user_name}
                                onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
                               className="form-control textbox"
								style={style.Input}
                                placeholder='username' />
                                 {formik.touched.user_name && formik.errors.user_name && (<div style={style.ErrorMsg}>{formik.errors.user_name}</div>)}
            </div>
            <div style={style.InputPad} >
						<input type="password"
								name="password"
								value={formik.values.password}
                             onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
                             className="form-control textbox"
								style={style.Input}
                             placeholder='password' />
                                 {formik.touched.password && formik.errors.password && (<div style={style.ErrorMsg}>{formik.errors.password}</div>)}
            </div>
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}
    return(
		<InstituteAuthHeader  caption='Business with us'>
			<InstituteLayout head='Sign In YesQ Pvt. Ltd.' subHead='Dashboard'>
			<div style={style.ServerErrorMsg}>{props.error}</div>
				{form}
				<UserButton clicked={formik.handleSubmit}>sign in</UserButton>
				
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
		},
    InputPad:{
        marginBottom: '30px'
    },
    ErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'left',
        fontSize: '14px'
    },
    ServerErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'center',
        fontSize: '14px',
        marginBottom:'15px'

    }
    
}
const mapStateToProps = state =>{
    return{
		error:state.admin.error,
		loading: state.admin.loading,
        
		
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onAdminSignIn:(values,history)=>dispatch(actions.adminSignIn(values,history))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AdminSignIn)