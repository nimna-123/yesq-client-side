import React from 'react'
import Classes from './UserLayout.module.css'
import Landing from '../../assets/images/landing.svg'

const Userlayout = (props) =>{
    return (
        <div className={Classes.WhiteBg}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-6 col-md-1" >
                            <img src={Landing} alt='landing' className={Classes.LandingVh}/>
                        </div>
                        <div className="col-lg-1" ></div>
                            <div className="col-lg-5 col-md-11 no-pa nopadmar">
                                <div className={props.st}>
                                    <div className={Classes.FormBox}>
                                        <div className={Classes.MainHead}>
                                            <h3>{props.head}</h3>
                                        </div>
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>
    )
}

export default Userlayout
