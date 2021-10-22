import React from 'react'
import Classes from './InstituteChangePswd.module.css'
import{withRouter} from 'react-router-dom'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import InstituteLayout from '../../../../components/InstituteLayout/InstituteLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import Spinner from '../../../../components/UI/Spinner/Spinner'


const InstituteChangePswd = (props) =>{
    const formik = useFormik
	({
		initialValues:
		{
            current_pswd: "",
			new_pswd: "",
		},
		validationSchema: Yup.object
		({
                    current_pswd: Yup.string()
					.required("This field is required."),
                    new_pswd: Yup.string()
					.required("This field is required."),
        }),

		onSubmit: (value,onSubmitprops) => {
            const cuurentPswdTrim = value.current_pswd.trim()
            const newPswdTrim = value.new_pswd.trim()
			const istId=props.istId
            let inputs = {istId:istId,currentpassword:cuurentPswdTrim,newpassword:newPswdTrim}
            props.onInstituteChangePswd(inputs,props.history)
		    onSubmitprops.resetForm()
		}
	});       
    let form = (
		<form  autoComplete="off">
			<div className={Classes.FormGroup}  >
				<label htmlFor="current_password" className="input-label" style={style.LabelName}>Enter your current password</label>
					<input type='password'
						   name="current_pswd"
                         	className="form-control"
							style={style.Input} 
                            value={formik.values.current_pswd}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                             {formik.touched.current_pswd&& formik.errors.current_pswd&& (<div className={Classes.ErrorMsg}>{formik.errors.current_pswd}</div>)}
                           
			</div>
			<div className={Classes.FormGroup} >
						<label htmlFor="new_password" className="input-label">Enter new password</label>
							<input type="password"
								name="new_pswd"
                                className="form-control textbox"
								style={style.Input}
                                value={formik.values.new_pswd}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                                 {formik.touched.new_pswd&& formik.errors.new_pswd&& (<div className={Classes.ErrorMsg}>{formik.errors.new_pswd}</div>)}
                                
			</div>
		</form>
	);
	if(props.loading){
		form = <Spinner/>
	}
    return(
        <InstituteHomeLayout>
             <InstituteLayout head='Change Password'  InstituteBg={Classes.InstituteBg}>
			 <div className={Classes.ServerErrorMsg}>{props.error}</div>
                 {form}
                 <UserButton clicked={formik.handleSubmit}>change password</UserButton>

            </InstituteLayout>

        </InstituteHomeLayout>

    )
}
const style ={
	Input:{
		fontSize: '14px',
		fontWeight: '400',
		backgroundColor: 'rgb(243, 246, 249)',
		borderColor: 'rgb(221, 217, 217)',
        height: '45px'
		},
    LabelName:{
            fontSize: '15px'
        }
    }
	const mapStateToProps = state =>{
		return{
			error:state.institute.error,
			loading: state.institute.loading,
			istId:state.institute.istId
		}
	}
	const mapDispatchToProps = dispatch =>{
		return{
			onInstituteChangePswd:(values,history)=>dispatch(actions.instituteChangePswd(values,history))
		}
	}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InstituteChangePswd)) 