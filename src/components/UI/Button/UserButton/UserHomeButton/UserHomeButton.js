import React from 'react'
const UserHomeButton = (props) =>{
    return(
        <button
            type='submit'
            className={props.btnstyle}
            onClick={props.clicked} disabled={props.disable}>
                
                {props.children}
                
        </button>

    )
}
export default UserHomeButton