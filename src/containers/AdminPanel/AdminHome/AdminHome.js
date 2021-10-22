import React, { Component } from 'react';
import AdminLayout from '../../../components/AdminLayout/AdminLayout'
import Results from '../../../components/Results/Results'

class AdminHome extends Component{
   
   
    render(){
  
    return( 
       
       <AdminLayout>
           <div style={style.LayoutPad}>
           <div className='row'>
                <Results bgClr={style.BackClr} resltname='Users' resCount='200'/>
                <Results bgClr={style.BgClrInst} resltname='Institute' resCount='200'/>
                <Results bgClr={style.BgClrProf} resltname='Professional' resCount='200'/>
                <Results bgClr={style.BgClToken} resltname='Token' resCount='200'/>
            </div>
           </div>
          

       </AdminLayout>

    )
}
}
const style={
    BackClr:{
        backgroundColor:'#428B20'
    },
    BgClrInst:{
        backgroundColor:'#C14C19'
    },
    BgClrProf:{
        backgroundColor:'#19C1B4'
    },
    BgClToken:{
        backgroundColor:'#752E5D'
    },
    LayoutPad:{
        padding:'50px'
    }

}

export default  AdminHome