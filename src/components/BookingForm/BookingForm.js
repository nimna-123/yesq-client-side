import React from 'react'
import Classes from './BookingForm.module.css'
import UserHomeButton from '../UI/Button/UserButton/UserHomeButton/UserHomeButton'
const BookingForm = (props) =>{
    return(
        <div className={Classes.BookForm}>
        <form autoComplete='off'>
            <label htmlFor='name' className={Classes.FormLabel}>Patient Name:</label>
            <input type='text' name='name' value={props.name} onChange={props.changeHandler} className='form-control' style={style.Input}/>
            <div className={Classes.ErrorMsg}>{props.nameErr}</div>
            <label htmlFor='mobile' className={Classes.FormLabel}>Mobile Number:</label>
            <input type='number' name='mobile' value={props.mob} onChange={props.changeHandler} className='form-control' style={style.Input}/>
            <div className={Classes.ErrorMsg}>{props.mobError}</div>
            <label htmlFor='age' className={Classes.FormLabel}>Age:</label>
            <input type='number' name='age' value={props.age} onChange={props.changeHandler} className='form-control' style={style.Input}/>
            <div className={Classes.ErrorMsg}>{props.ageErr}</div>
           <label htmlFor="service_status" className={Classes.InputLabel}>Gender :</label>
                <div className='row rowmarprof'>
                    <div className='col-md-2 col-sm-3 col-4'>
                        <label >
                            <input 
                                type="radio" 
                                name="gender"
                                value='MALE'
                                onChange={props.changeHandler}
                                defaultChecked
                                />&nbsp;&nbsp;&nbsp;Male
                        </label>
                    </div>
                    <div className='col-md-2 col-sm-3 col-4 nopadmar'>
                        <label >
                        <input 
                            type="radio"
                            name="gender" 
                            value='FEMALE'
                            onChange={props.changeHandler}
                        />&nbsp;&nbsp;&nbsp;Female</label>
                    </div>
                </div>
                              
            <UserHomeButton btnstyle={Classes.UserHomeButton} btnstyleName={Classes.UserHomeBtnName} 
            clicked={props.click} disable={props.btnDisable}>Book</UserHomeButton>
            
        </form>
       
    </div>

    )
}
const style={
    Input:{
        border: '1px solid rgb(96, 164, 241)',
        marginBottom:'10px'
    }
}
export default BookingForm