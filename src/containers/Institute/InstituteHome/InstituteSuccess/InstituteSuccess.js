import React from 'react'
import {withRouter} from 'react-router-dom'
import InstituteHeader from '../../../../components/InstituteHeader/InstituteHeader'
import success from '../../../../assets/images/ok.png'
import UserButton from '../../../../components/UI/Button/UserButton/UserButton'
const InstituteSuccess = (props) =>{
    const goBackHandler = () =>{
        props.history.push('/institute/login')
       
    }
    return(
        <InstituteHeader st={style.disply} caption='Business with us'>
           <div className='container '>
               <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-5' style={style.PadTop}>
                    <img src={success} alt='success' className='img-fluid' height='50px' />
                     <p style={style.mainPara}>You are Successfully Registered to</p>
                    <p style={style.mainPara}>YesQ Experts Pvt. Ltd.!</p>
                    <p style={style.subPara}>Thank you very much for creating your account. We sent your information to the email address that you registered. Please check the spam folder if you have not received it yet.</p> 
                    </div>
                    </div> 
                    <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-2'>
                    <UserButton clicked={goBackHandler}>Go back</UserButton>
                    </div>
                </div>
            </div>

        </InstituteHeader>

    )
}
const style={
    disply:{
        display: 'none'
    },
    PadTop:{
        paddingTop: '20px'
    },
    mainPara:{
        fontSize: '1.25rem',
        textAlign: 'center',
        marginBottom: '0px'
      
    },
    subPara:{
        textAlign: 'center',
        fontSize: '12px',
        marginTop: '15px',
        marginBottom: '20px'
    }
}
export default withRouter(InstituteSuccess)