import React from 'react'
import { connect } from 'react-redux';
import UserLayout from '../../../../components/UserLayout/UserLayout'
import Classes from './UserForgotPswd.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'

const UserForgotPswd = (props) => {
    const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
    const formik = useFormik
	({
		initialValues:
		{
			user_id: "",
			
		},
        validationSchema: Yup.object
			({
				user_id: Yup.string()
					.matches(phoneRegex, "Invalid Mobile Number")
					//  .min(10, "Mobile number must be 10 digits")
					//  .max(10, "Mobile number must be 10 digits")
					.required("Enter your mobile number"),
			}),

		onSubmit: (values,onSubmitprops) => {
			let mobileTrim = values.user_id
			const inputs = { mobile: mobileTrim}
            props.onUserForgot(inputs,props.history)
			onSubmitprops.resetForm()

        }
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<label htmlFor="mobnum" className={Classes.InputLabel}>Mobile Number</label>
					<input type='text'
						   name="user_id"
						   value={formik.values.user_id}
                           onChange={formik.handleChange}
						    onBlur={formik.handleBlur}
						    className="form-control"
							style={style.Input} />
                            {formik.touched.user_id && formik.errors.user_id && (<div className={Classes.ErrorMsg}>{formik.errors.user_id}</div>)}
            </div>
		</form>
    );
	if(props.loading){
		form = <Spinner/>
	}
    return (
        
        <div>
            <UserLayout head="FORGOT PASSWORD?" st={Classes.MainPad}>
			
                {props.error?<div className={Classes.ServerErrorMsg}>{props.error}</div>:<p className={Classes.ForgotPwdHead}>Enter the mobile phone number associated with your YESQ account.</p>}
                {form}
                <div className={Classes.ButtonPad}>
                <UserButton clicked={formik.handleSubmit}>CONTINUE</UserButton>
                </div>
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
		height: '45px'
		}
}
const mapStateToProps = state =>{
    return{
		error:state.user.forgotErr,
		loading: state.user.loading
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserForgot:(values,history)=>dispatch(actions.userForgot(values,history))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(UserForgotPswd)
