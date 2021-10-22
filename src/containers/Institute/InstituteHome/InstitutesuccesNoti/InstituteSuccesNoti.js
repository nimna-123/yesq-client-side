import React from 'react'
import InstituteHomeLayout from '../../../../components/InstituteHomeLayout/InstituteHomeLayout'
import success from  '../../../../assets/images/ok.png'
const InstiSuccesNoti = (props) =>{
   const goBackHandler = () =>{
       props.history.push('/institute/home')

    }
    return(
        <InstituteHomeLayout>
            <div className='d-flex justify-content-center align-items-center'>
            <img src={success} alt='success' className='img-fluid' height='50px' width='400px' />
            </div>
            <h3 style={style.SuccesHead}>Success!</h3>
            <p style={style.SuucessSubHead}>Password changed successfully!</p>
            <div className='d-flex justify-content-center align-items-center'>
            <button style={style.SuccesBtn} onClick={goBackHandler}>Go to home</button>
            </div>
        </InstituteHomeLayout>

    )
}
const style={
    SuccesHead:{
        textAlign:'center',
        fontSize:'28px',
        fontWeight:'600',
        color:'#000'
    },
    SuucessSubHead:{
        textAlign:'center',
        fontSize:'20px',
       color:'600'
    },
    SuccesBtn:{
        backgroundColor: 'rgb(59, 170, 128)',
        width: '180px',
        height: '55px',
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
       
    }

}
export default InstiSuccesNoti