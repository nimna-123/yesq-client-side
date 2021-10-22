import React from 'react'
import Classes from './Service.module.css'

const Service = (props) =>{
    return(
            <div className='col-lg-2 col-sm-4 col-4 nopadleft' onClick={props.clicked}>
                <div className={Classes.ServiceMarg}>
                    <div className={Classes.Service}>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img src={props.serviceimge}  className={Classes.ServiceImg} alt='hospital'/>
                        </div>
                        <div className={Classes.ServiceBgc}>
                            <h3>{props.servicename}</h3>
                        </div>       
                    </div>
                </div>
            </div>
    )
}

export default Service