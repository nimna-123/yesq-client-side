import React from 'react';
const CallButton = (props) => (
    <a href={'tel:'+props.dialnum} style={{color:'#fff',textDecoration:'none',textAlign:'center'}} className={props.btncall}>
        <div>{props.children}</div>
    </a>
);

export default CallButton;