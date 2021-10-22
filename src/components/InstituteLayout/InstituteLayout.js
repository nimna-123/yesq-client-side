import React from 'react'
import Classes from './InstituteLayout.module.css'
const InstituteLayout=(props)=> {
    return (
        <div className={props.InstituteBg}>
            <div className="container d-flex  justify-content-center">
                <div className='col-md-6 col-lg-6'>
                    <div className={Classes.OuterBox}  style={st}>
                        <div className={Classes.LayoutHead}>
                            <h3 className={Classes.InstHead}>{props.head}</h3>
                            <p className={Classes.subHead}>{props.subHead}</p>
                        </div> 
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
const st={
    padding: '2rem 2.5rem'
}
export default InstituteLayout