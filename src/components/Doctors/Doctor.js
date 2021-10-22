import React from 'react'
import Classes from './Doctor.module.css'
import {Card} from 'react-bootstrap'
import UserHomeButton from '../UI/Button/UserButton/UserHomeButton/UserHomeButton'


const  Doctor = (props) =>{
    return(
        <div className='col-lg-2 col-md-4 col-sm-4 col-6 HosNopadleft'>
            <div className={Classes.Box}>
                <Card style={{ width: '100%' }} className={Classes.HospitalCard}>
                    <Card.Img variant="top" src={props.doctImage} className={Classes.DoctImage} />
                       <Card.Title className={Classes.DocTitle}>{props.doctorname}</Card.Title>
                            <div className={props.DoctCardBody} >
                                <Card className={Classes.DocSubTitle}>
                                    <div className={Classes.ProdPad}>
                                            <div className='row'>
                                                <div className='col-md-12 col-sm-12 col-12 '>
                                                    <h6 className={Classes.CardHead}>{props.education}</h6>
                                                </div>
                                            </div>
                                     </div>  
                                    <div className={Classes.ProdPad}>
                                            <div className='row'>
                                               <div className='col-md-12 col-sm-12 col-12 '>
                                                    <h6 className={Classes.CardHead}>{props.speciality}</h6>
                                                </div>
                                            </div>
                                    </div> 
                                </Card>
                                <div className='d-flex justify-content-center align-items-center' style={style.ButtobPad}>
                                    <UserHomeButton btnstyle={Classes.UserHomeCall} >Call</UserHomeButton>
                                    <UserHomeButton btnstyle={Classes.UserHomeBook} clicked={props.clickDoct} >Book</UserHomeButton>
                                </div>
                            </div>
                </Card>
            </div>
        </div>
)
}  
const style={
    ButtobPad:{
        paddingTop:'5px',
        paddingBottom:'20px'
    }
}
export default  Doctor