import React,{useEffect} from 'react'
import UserLayout from '../../../../components/UserLayout/UserLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import Classes from './UserResetPswd.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'


const UserResetPswd = (props) => {
	useEffect(() => {
        if(props.userVerify === null){
            console.log('hai');
           props.history.push('/forgot_password')
           
        }
        else{
            console.log('haiii');
          
        }

    }, [props.history,props.userVerify]);
    const formik = useFormik
	({
		initialValues:
		{
			new_pswd: "",
            confirm_pswd:""
			
		},
        validationSchema: Yup.object
			({
				new_pswd: Yup.string()
					.required("Enter your new password")
                    .min(6, "Password should be at least 6 characters "),
                    
                confirm_pswd: Yup.string()
					.required("Re-enter your password")
                    .min(6, "Password should be at least 6 characters ")
                    .oneOf([Yup.ref("new_pswd")], "Password do not match")
			}),

		onSubmit: (values,onSubmitprops) => {
			let newPswdTrim = values.new_pswd
			const inputs = {confirmPassword:newPswdTrim}
            props.onUserReset(inputs,props.history)
			onSubmitprops.resetForm()
        }
	});
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<label htmlFor="newPswd" className={Classes.InputLabel}>New Password</label>
					<input type='password'
						   name="new_pswd"
						   value={formik.values.new_pswd}
                           onChange={formik.handleChange}
						    onBlur={formik.handleBlur}
						    className="form-control"
							style={style.Input} />
                            {formik.touched.new_pswd && formik.errors.new_pswd && (<div className={Classes.ErrorMsg}>{formik.errors.new_pswd}</div>)}
            </div>
            <div className={Classes.FormGroup}  >
				<label htmlFor="confrimPswd" className={Classes.InputLabel}>Confirm Password</label>
					<input type='password'
						   name="confirm_pswd"
						   value={formik.values.confirm_pswd}
                           onChange={formik.handleChange}
						    onBlur={formik.handleBlur}
						    className="form-control"
							style={style.Input} />
                            {formik.touched.confirm_pswd && formik.errors.confirm_pswd && (<div className={Classes.ErrorMsg}>{formik.errors.confirm_pswd}</div>)}
            </div>
		</form>
    );
	if(props.loading){
		form = <Spinner/>
	}
    return (
        <div>
            <UserLayout  head="RESET PASSWORD" st={Classes.MainPad}>
			<div className={Classes.ErrorMsg}>{props.error}</div>
                {form}
                <UserButton clicked={formik.handleSubmit}>Submit</UserButton>

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
		}
}
const mapStateToProps = state =>{
    return{
		error:state.user.error,
		loading: state.user.loading,
		userVerify:state.user.userVerify
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		onUserReset:(values,history)=>dispatch(actions.userResetPswd(values,history))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(UserResetPswd)
