import React from 'react'
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Classes from './InstituteForgotPswd.module.css'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import InstituteAuthHeader from '../../../../components/InstituteAuthHeader/InstituteAuthHeader'
import Spinner from '../../../../components/UI/Spinner/Spinner'
const InstituteForgotPswd = (props) =>{
    const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
    const formik = useFormik
	({
		initialValues:
		{
			mobile: ""
		},
		validationSchema: Yup.object
		({
				mobile: Yup.string()
				.required("Enter your mobile number")
                .matches(phoneRegex, "Invalid Mobile Number"),
	    }),
		onSubmit: (values,onSubmitprops) => {
			let mobileTrim = values.mobile
		    const inputs = { mobile: mobileTrim}
			props.onInstituteForgot(inputs,props.history)
			onSubmitprops.resetForm()
            
		}
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.InputPad} >
						<input type="text"
								name="mobile"
								value={formik.values.mobile}
                                onChange={formik.handleChange}
						        onBlur={formik.handleBlur}
                               className="form-control textbox"
								style={style.Input}
                                placeholder='mobile number' />
                                 {formik.touched.mobile && formik.errors.mobile && (<div className={Classes.ErrorMsg}>{formik.errors.mobile}</div>)}
            </div>
           
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}
    return(	
	<InstituteAuthHeader  caption='Business with us'>
		 <InstituteLayout head='Sign In YesQ Pvt. Ltd.' subHead='Enter your mobile number associated with your YesQ Pvt. Ltd. account' >
		 <div className={Classes.ServerErrorMsg}>{props.error}</div>
                {form}
                <UserButton clicked={formik.handleSubmit}>send otp</UserButton>
            </InstituteLayout>
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
		error:state.institute.forgotErr,
		loading: state.institute.loading,
    }
}
const mapDispatchToProps = dispatch =>{
	return{
		onInstituteForgot:(values,history)=>dispatch(actions.instituteForgot(values,history))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(InstituteForgotPswd)