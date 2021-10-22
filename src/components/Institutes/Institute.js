import React from 'react'
import Classes from './Institute.module.css'
import {Card} from 'react-bootstrap'
import UserHomeButton from '../UI/Button/UserButton/UserHomeButton/UserHomeButton'
import CallButton from '../UI/Button/UserButton/CallButton/CallButton'
import Location from '../../assets/images/location.png'
import PhnIcon from '../../assets/images/phone.png'
import Email from '../../assets/images/email.png'

const institute = (props) =>{
    return(
        <div className={props.InstLayout}>
            <div className={Classes.Box} >
                <Card style={{ width: '100%' }} className={Classes.HospitalCard}>
                    <Card.Img variant="top" src={props.instImage === 'NA' ? `/uploads/company_dp/defaulthos.jpg` : `/uploads/company_dp/${ props.instImage }`} className={Classes.InstImage} />
                       <Card.Title className={Classes.HosTitle}>{props.instName}</Card.Title>
                            <div className={props.HosCardBody} >
                                <Card className={Classes.HosSubTitle}>
                                   <div className={Classes.ProdPad}>
                                            <div className='row'>
                                                <div className='col-md-2 col-sm-2 col-2 nopadmar'>
                                                    <img src={Location} alt='location' className={Classes.IconImg}/>
                                                </div>
                                                <div className='col-md-10 col-sm-10 col-10 nopadmar'>
                                                    <h5 className={Classes.CardHead}>{props.location}</h5>
                                                </div>
                                            </div>
                                    </div>
                                    <div className={Classes.ProdPad}>
                                            <div className='row'>
                                                <div className='col-md-2 col-sm-2 col-2 nopadmar'>
                                                    <img src={PhnIcon} alt='phone' className={Classes.IconImg}/>
                                                </div>
                                                <div className='col-md-10 col-sm-10 col-10 nopadmar'>
                                                    <h6 className={Classes.CardHead}>{props.phnno}</h6>
                                                </div>
                                            </div>
                                     </div>
                                    <div className={Classes.ProdPad}>
                                            <div className='row'>
                                                <div className='col-md-2 col-sm-2 col-2 nopadmar'>
                                                    <img src={Email} alt='phone' className={Classes.IconImg}/>
                                                </div>
                                                <div className='col-md-10 col-sm-10 col-10 nopadmar'>
                                                    <h6 className={Classes.CardHead}>{props.email}</h6>
                                                </div>
                                            </div>
                                    </div> 
                                </Card>
                                <div className='d-flex justify-content-center align-items-center' style={style.ButtobPad}>
                                    <CallButton dialnum={props.callnum} btncall={Classes.UserHomeCall}>Call</CallButton>
                                    <UserHomeButton btnstyle={Classes.UserHomeBook} clicked={props.clickIns} >Book</UserHomeButton>
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
export default institute