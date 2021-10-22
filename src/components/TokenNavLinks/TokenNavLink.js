import React from 'react'
import './TokenNavLinks.css'
import {NavLink} from 'react-router-dom'
const TokenNavLink = () =>{
    return(
        <ul className='TokenList'>
            <li><NavLink to='/user/mytokens' className='NavLinks' activeStyle={{ borderBottom: '2px solid #000',color:'#454343'}} >Active</NavLink></li>
            <li><span className='TokenNav'><NavLink to='/user/cancelled/tokens' className='NavLinks'  activeStyle={{ borderBottom: ' 2px solid #000',color:'#454343' }}>Cancelled</NavLink></span></li>
            <li><span className='TokenNav'><NavLink to='/user/expired/tokens'  className='NavLinks' activeStyle={{ borderBottom: ' 2px solid #000',color:'#454343' }}>Expired</NavLink></span></li>
        </ul>

    )

}
export default TokenNavLink