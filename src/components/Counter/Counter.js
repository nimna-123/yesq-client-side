import React from 'react'
import Classes from './Counter.module.css'
import UserHomeButton from '../UI/Button/UserButton/UserHomeButton/UserHomeButton'
 const Counter = (props) =>{
     return(
        <div className='col-lg-4 col-md-6 col-sm-6 col-6'>
            <div className={Classes.Counter}>
                <h2 className={Classes.CounterName}>{props.countername}</h2>
                <div className='d-flex justify-content-center align-items-center' style={{paddingTop:'10px'}}>
                    <UserHomeButton btnstyle={Classes.UserHomeButton} btnstyleName={Classes.UserHomeBtnName} clicked={props.click}>
                        Book Now
                    </UserHomeButton>
                </div>
            </div>
        </div>
       
        
     )
 }
 export default Counter