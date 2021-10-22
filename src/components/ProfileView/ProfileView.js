import React from 'react'
import Classes from './ProfileView.module.css'
const ViewProfile = (props) =>{
    return(
                 <div className='col-md-8' style={style.DetPad}>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            ID:
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                                {props.id}
                            </div>
                        </div>
                    </div>
                    <hr/>
                <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Organization Name :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                                {props.orgName}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Mobile:
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.mobile}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Email:
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.email}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Address:
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.address}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Group:
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.grp}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Category :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.cat}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                                Subcategory :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.subcat}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Location :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.loc}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            State :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.sate}
                            </div>
                        </div>
                    </div>
                    <hr/>
                   
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            District :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.distr}
                            </div>
                        </div>
                    </div>
                   
                    <hr/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetList}>
                            Pincode :
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={Classes.ProfDetListDet}>
                            {props.pincode}
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div> 
    )
}
const style={
  
    DetPad:{
        paddingTop:'40px'
    }
}
export default ViewProfile