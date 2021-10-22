import React,{useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import Modals from '../../../../components/UI/Modal/Modal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const InstituteCreateCounter = (props) =>{
    const [show, setShow] = useState(false);
    const formik = useFormik
	({
		initialValues: 
		{
			counter_name: "",
			display_name: "",
			service_name: "",
			remarks: "NA", 
            status: 'ACTIVE'
            
		},
		validationSchema: Yup.object
		({
                counter_name: Yup.string()
					.required("This field is required."),
                display_name: Yup.string()
					.required("This field is required."),
                service_name: Yup.string()
					.required("This field is required."),
        }),

		onSubmit: (values,onSubmitprops) => {
			let counterNameTrim = values.counter_name.trim()
			let displayNameTrim = values.display_name.trim()
			let serviceNmaeTrim = values.service_name.trim()
            let remarksTrim = values.remarks.trim()
            let statusTrim = values.status
            const inputs = { istId:props.istId ,countername:counterNameTrim,displayname:displayNameTrim,servicename:serviceNmaeTrim,remarks: remarksTrim,counterstatus:statusTrim }
		
            axios.post("/institute/createnew/counter",inputs)
            .then(response=>{
                setShow(true);
            })
            .catch((err) =>{
                console.log(err.response)
            })
            onSubmitprops.resetForm()
		}
	});
    const handleUpdated = () =>{
       setShow(false)
    }
    const handleClose = () => {
        setShow(false)
    }
   
    return(
        <InstituteHomeLayout>
           < Modals shows={show} hide={handleClose} closeBtn={handleUpdated} heading='SUCCESS!' body='Counters created successfully'/>
            <div style={style.createcounterpad}>
                <h4 style={style.head} className='text-primary'>Create Counter</h4>
                <form  autoComplete="off">
                    <div className='row' style={style.FormPad}>
                        <div className='col-md-6 nopadmar'>
                             <div  style={style.FormGroup}>
                                <label htmlFor="counterName" style={style.InputLabel}>Counter name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="counter_name"
                                    value={formik.values.counter_name}
                                    onChange={formik.handleChange}
                                     onBlur={formik.handleBlur}
                                    style={style.Input}/>
                                    {formik.touched.counter_name&& formik.errors.counter_name && (<div style={style.ErrorMsg}>{formik.errors.counter_name}</div>)}
                            </div>
                            <div style={style.FormGroup}  >
                                <label htmlFor="displayName" style={style.InputLabel}>Display name</label>
                                    <input 
                                    type='text'
                                    name="display_name"
                                    value={formik.values.display_name}
                                    onChange={formik.handleChange}
                                     onBlur={formik.handleBlur}
                                        className="form-control"
                                        style={style.Input} />
                                        {formik.touched.display_name&& formik.errors.display_name&& (<div style={style.ErrorMsg}>{formik.errors.display_name}</div>)}
                            </div>
                            <div style={style.FormGroup} >
                                <label htmlFor="status" style={style.InputLabel}>Status</label>
                                    <div className='row rowmar'>
                                        <div className='col-md-4 '>
                              <label >
								<input 
                                    type="radio" 
                                    name="status"
                                    value='ACTIVE'
                                    checked={true}
                                    onChange={formik.handleChange}
                                   />&nbsp;&nbsp;&nbsp;Active</label>
                                    </div>
                                    <div className='col-md-4 nopadmar'>
									<label >
                                        <input 
                                        type="radio"
                                         name="status" 
                                         value='INACTIVE'
                                         onChange={formik.handleChange}
                                    />&nbsp;&nbsp;&nbsp;Inactive</label>
                                         </div>
                                         </div>
                            </div>
                        
                        </div>
                        <div className='col-md-6'>
                            <div className="clearfix add_bottom_15"></div>
                             <div style={style.FormGroup} >
                                <label htmlFor="serviceName" style={style.InputLabel}>Service name</label>
                                <input type="text"
                                        name="service_name"
                                        value={formik.values.service_name}
                                        onChange={formik.handleChange}
                                         onBlur={formik.handleBlur}
                                        className="form-control textbox"
                                        style={style.Input} />
                                        {formik.touched.service_name&& formik.errors.service_name&& (<div style={style.ErrorMsg}>{formik.errors.service_name}</div>)}
                             </div>
                            <div style={style.FormGroup}>
                                    <label htmlFor="remarks" style={style.InputLabel}>Remarks</label>
                                        <input type="text"
                                                name="remarks"
                                                className="form-control textbox"
                                                value={formik.values.remarks}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input}
                                                    />
                                                  
                                                    </div>
                            </div>
                            <div className='col-md-2 nopadmar'>
                                <UserButton clicked={formik.handleSubmit}>Create</UserButton>
                            </div>
                        </div>
		        </form>
            </div>

        </InstituteHomeLayout>

    )
}
const style={
    createcounterpad:{
        padding: '30px 150px 80px 40px'
    },
    FormGroup:{
        marginBottom: '20px'
    },
    InputLabel:{
       fontWeight: '590',
        marginBottom: '3px',
        color:'#555'
    },
    ErrorMsg:{
        color: 'rgba(255,0,0)',
        textAlign: 'left',
        fontSize: '14px'
    },
    Input:{
        fontSize: '13px',
        fontWeight: '600',
        borderColor: 'rgb(221, 217, 217)',
        height: '40px'
    },
    FormPad:{
        padding:'20px'
    }
}
const mapStateToProps = state =>{
    return{
	istId:state.institute.istId
    }
}
export default withRouter(connect(mapStateToProps)(InstituteCreateCounter))