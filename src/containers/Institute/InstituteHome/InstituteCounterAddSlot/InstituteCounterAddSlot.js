import React,{useState} from 'react'
import { useEffect } from "react";
import { connect } from 'react-redux';
import Classes from './InstituteCounterAddSlot.module.css'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Modals from '../../../../components/UI/Modal/Modal'
const InstituteCounterAddSlot = (props) =>{
    const[counterList,setCounterList] = useState([])
    const[ProfList,setProfList] = useState([])
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios.post("/institute/list/counter",{istId:props.istId})
        .then(response=>{
          
            setCounterList(response.data)
        }).catch((err) =>
          {
             
        })
        axios.post("/institute/view/professionals")
        .then(response=>{
            setProfList(response.data)
          
        }).catch((err) =>
          {
              console.log(err.response)
        })
    }, [props.istId]);
    const formik = useFormik
	({
		initialValues:
		{
			counter: "",
            professional: "NA",
            slot_name: "",
			day: "",
            slot_start: '',
            slot_end: "",
			slot_intervel: "",
			slot_status: "OPEN",
			remarks: "NA"
           },
		validationSchema: Yup.object
		({
                counter: Yup.string()
					.required("This field is required."),
                day: Yup.string()
					.required("This field is required."),
                slot_intervel: Yup.string()
					.required("This field is required."),
               slot_start: Yup.string()
					.required("This field is required"),
                slot_status: Yup.string()
					.required("This field is required"),
                slot_name: Yup.string()
					.required("This field is required"),
                slot_end: Yup.string()
					.required("This field is required"),
               
                
			}),

		onSubmit: (values,onSubmitprops) => {
			const counterTrim = values.counter.trim()
            const dayTrim = values.day.trim()
            const slotIntervelTrim = values.slot_intervel
            const professionalTrim = values.professional.trim()
            const slot_startTrim = values.slot_start.trim()
            const slot_statusTrim = values.slot_status.trim()
            const slot_nameTrim = values.slot_name.trim()
            const slot_endTrim = values.slot_end.trim()
            const remarksTrim = values.remarks.trim()
            const inputs = {istId:props.istId,counter:counterTrim,prof_id:professionalTrim,slotname:slot_nameTrim,day:dayTrim,startTime:slot_startTrim,
                endTime:slot_endTrim,slotInterval:slotIntervelTrim,status:slot_statusTrim,remarks:remarksTrim}
            axios.post("/api/institute/counter/add/slot",inputs)
            
                .then(resp=>{
                   
                   setShow(true);

                }).catch((err) =>{
                    console.log(err.response);
                                 
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
        < Modals shows={show} hide={handleClose} closeBtn={handleUpdated} heading='SUCCESS!' body='Slot added to the Counter successfully'/>
        <div className={Classes.CounterSlotPad}>
            <h4  className='text-primary'>Add Slot</h4>
            <form autoComplete='off' className={Classes.FormPad}>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className={Classes.FormGroup}  >
                                        <label htmlFor="counter" className={Classes.InputLabel}>Select counter</label>
                                            <select 
                                                type='text'
                                                name="counter"
                                                className="form-control"
                                                value={formik.values.counter}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input}>
                                                    <option>Select counter</option>
                                                {counterList.map(optn =>{
                                                    return<option  key={optn.COUNTER_ID} value={optn.COUNTER_ID} >{optn.DISPLAY_NAME}</option>
                                                })}
                                                  
                                            </select>
                                            {formik.touched.counter&& formik.errors.counter&& (<div className={Classes.ErrorMsg}>{formik.errors.counter}</div>)}
                            </div>
                            <div className={Classes.FormGroup}  >
                                        <label htmlFor="day" style={style.InputLabel}>Day</label>
                                            <select
                                                type='text'
                                                name="day"
                                                className="form-control"
                                                value={formik.values.day}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input}>
                                                    <option>Select group</option>
                                                    <option value="SUNDAY">Sunday</option>
                                                    <option value="MONDAY">Monday</option>
                                                    <option value="TUESDAY">Tuesday</option>
                                                    <option value="WEDNESDAY">Wednesday</option>
                                                    <option value="THURSDAY">Thursday</option>
                                                    <option value="FRIDAY">Friday</option>
                                                    <option value="SATURDAY">Saturday</option>
                                                </select>
                                                {formik.touched.day&& formik.errors.day&& (<div className={Classes.ErrorMsg}>{formik.errors.day}</div>)}
                            </div>
                            <div className={Classes.FormGroup}  >
                                        <label htmlFor="slotInt" style={style.InputLabel}>Slot Interval <span className={Classes.SlotTime}> in minutes</span></label>
                                            <input 
                                                type='number'
                                                name="slot_intervel"
                                                className="form-control"
                                                value={formik.values.slot_intervel}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input} />
                                                {formik.touched.slot_intervel&& formik.errors.slot_intervel&& (<div className={Classes.ErrorMsg}>{formik.errors.slot_intervel}</div>)}
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className={Classes.FormGroup}  >
                                        <label htmlFor="selectProfessional" style={style.InputLabel}>Select Professional</label>
                                            <select 
                                                type='text'
                                                name="professional"
                                                className="form-control"
                                                value={formik.values.professional}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input}>
                                                    <option value="NA">Select Professional</option>
                                                    {ProfList.map(optn =>{
                                                    return<option  key={optn.PROF_ID} value={optn.PROF_ID}>{optn.FULLNAME}</option>
                                                })}
                                            </select>
                                           
                                </div>
                                <div className={Classes.FormGroup}  >
                                        <label htmlFor="slotStart" style={style.InputLabel}>Slot Start</label>
                                            <input 
                                                type='time'
                                                name="slot_start"
                                                className="form-control"
                                                value={formik.values.slot_start}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={style.Input} />
                                                {formik.touched.slot_start&& formik.errors.slot_start&& (<div className={Classes.ErrorMsg}>{formik.errors.slot_start}</div>)}
                                </div>
                                <div className={Classes.FormGroup}  >
                                        <label htmlFor="slotStatus" className={Classes.InputLabel}>Slot Status :</label>
                                        <div className='row rowmar'>
                                            <div className='col-md-4 '>
                                        <label >
                                        <input 
                                            type="radio" 
                                            name="slot_status"
                                            value='OPEN'
                                            defaultChecked
                                            onChange={formik.handleChange}
                                        />&nbsp;&nbsp;&nbsp;Open</label>
                                            </div>
                                            <div className='col-md-4 nopadmar'>
                                            <label >
                                                <input 
                                                type="radio"
                                                name="slot_status" 
                                                value='CLOSE'
                                                onChange={formik.handleChange}
                                                    />&nbsp;&nbsp;&nbsp;Close</label>
                                                    </div>
                                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className={Classes.FormGroup}  >
                                            <label htmlFor="slotname" className={Classes.InputLabel}>Slot Name</label>
                                                <input
                                                    type='text'
                                                    name="slot_name"
                                                    className="form-control"
                                                    value={formik.values.slot_name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    style={style.Input}/>
                                                    {formik.touched.slot_name&& formik.errors.slot_name&& (<div className={Classes.ErrorMsg}>{formik.errors.slot_name}</div>)}
                                                    
                                </div>
                                <div className={Classes.FormGroup}  >
                                            <label htmlFor="slotEnd" className={Classes.InputLabel}>Slot End</label>
                                                <input 
                                                    type='time'
                                                    name="slot_end"
                                                    className="form-control"
                                                    value={formik.values.slot_end}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    style={style.Input} />
                                                        {formik.touched.slot_end&& formik.errors.slot_end&& (<div className={Classes.ErrorMsg}>{formik.errors.slot_end}</div>)}
                                </div>
                                <div className={Classes.FormGroup}  >
                                            <label htmlFor="remarks" className={Classes.InputLabel}>Remarks</label>
                                                <input 
                                                    type='text'
                                                    name="remarks"
                                                    className="form-control"
                                                    value={formik.values.remarks}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    style={style.Input} />
                                                    {formik.touched.remarks&& formik.errors.remarks&& (<div className={Classes.ErrorMsg}>{formik.errors.remarks}</div>)}
                                </div>
                    </div>
                </div>
                <div className='col-md-2 nopadmar'>
                    <UserButton clicked={formik.handleSubmit}>Add slot</UserButton>
                </div>
            </form>
          
            </div>
    </InstituteHomeLayout>

    )
}
const style={
 Input:{
        fontSize: '13px',
		fontWeight: '400',
	    borderColor: 'rgb(221, 217, 217)',
        height: '45px'
    }
  
}
const mapStateToProps = state =>{
    return{
	
        istId:state.institute.istId
    }
}

export default connect(mapStateToProps)(InstituteCounterAddSlot)