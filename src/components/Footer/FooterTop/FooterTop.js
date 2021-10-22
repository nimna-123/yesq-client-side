import React from 'react'
import Classes from './FooterTop.module.css'
import Landing from '../../../assets/images/landing.svg'



const FooterTop = () =>{
    return(
        <React.Fragment>
              <div className={Classes.FooterTop}>
                            <div className={Classes.DiscrptnPad}>
                                     <div className='row nopadmar'>
                                        <div className='col-lg-6 nopadmar'>
                                            <img src={Landing} alt='footerimg' className={Classes.FooterImgPad}/>
                                        </div>
                                        <div className='col-lg-6 nopadmar'>
                                            <div className={Classes.FooterContnt}>
                                                <h5>Let customers wait anywhere with YesQ</h5>
                                                <p>
                                                Enabling your customers to access the services without having to physically wait 
                                                in line. YesQ is a virtual queuing system that drives customers to wait 
                                                anywhere, monitoring their progress in real time, and receiving notifications when 
                                                it’s their turn to be served. It is easy, convenient and saves valuable 
                                                customer waiting time and customers can wait remotely, you can implement safe 
                                                queuing.</p><p className={Classes.textIndent}>
                                                YesQ is the next-generation queuing system that helps customers get a queuing 
                                                ticket through online for 
                                                the nearest branch and remotely queue for their turn while continuing their 
                                                activities. Customers can view real-time queuing information to keep track of 
                                                their turn</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
            </div>
            <div className={Classes.FooterMiddle}>
                <div className='d-flex justify-content-center align-items-center'>
                    <ul className={Classes.FooterMiddleList}>
                        <li>TIME MANAGEMENT</li>
                        <li>HOME DELIVERY</li>
                        <li>ONLINE TAXI</li>
                        <li>COURIER SERVICES</li>
                    </ul>
                </div>
            </div>
           

        </React.Fragment>

           
    
    )
}
export default FooterTop