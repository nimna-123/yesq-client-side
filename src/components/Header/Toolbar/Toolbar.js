import React from 'react'
import Classes from './Toolbar.module.css'
import {Link} from 'react-router-dom'
import yesqLogo from '../../../assets/images/yesqLogowhite.png'
import SearchIcon from '../../../assets/images/searchIcon.png'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import UserMobIcon from '../../../assets/images/userMobIcon.png'
import NearbyIcon from '../../../assets/images/nearbyIcon.png'
import {AiFillCaretDown} from "react-icons/ai"
import PlacesAutocomplete from 'react-places-autocomplete';
import {TiLocationOutline} from "react-icons/ti"


const Toolbar = (props) =>{
    return(
    <div>
        <header className={Classes.Toolbar}>
            <DrawerToggle clicked={props.toggleClicked}/>
            <Link to='/'><img src={yesqLogo} alt='adminlogo' className={Classes.Logo} /></Link>
          <div className={Classes.FormBox}>
                 <div className='row'>
                    <PlacesAutocomplete
                        value={props.location}
                        onChange={props.locationChange}
                        onSelect={props.select}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search location ...',
                                        className: 'SearchFieldLoctn'
                                    })}
                                />
                                <div className={Classes.AutocompleteDropdownContainer}>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#1a7ff2', cursor: 'pointer',fontSize:'12px',color:'#fff' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' ,fontSize:'12px',color:'#000'};
                                        return (
                                            <div className={Classes.InputSuggestion} key={suggestion.description}
                                                {...getSuggestionItemProps(suggestion, {
                                                        style,
                                                })}
                                            >
                                                <i className="material-icons"><TiLocationOutline style={style} size='25px' /></i> <span className={Classes.ListPad} >{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <input className={Classes.SearchFieldSector} name='serachWrd' type='text' placeholder='Search Sectors' onChange={props.keyChange} value={props.keyVal} />
                   <button className={Classes.SearchBtn} type='button' onClick={props.searchClick}><img src={SearchIcon}  width='25px' alt='searchIcon'/></button>
                    <button className={Classes.NearbyButton} type='button' onClick={props.nearByClicked}>{props.nearLocname}&nbsp;&nbsp;&nbsp;<img src={NearbyIcon}  width='20px' alt='nearbyIcon'/></button>
                </div>
            </div>
            {props.isAuthnticated?
            <div className={Classes.DropDown}>
                 <button className={Classes.MyaccntBtn} >&nbsp;&nbsp;&nbsp;&nbsp;{props.user}&nbsp;&nbsp;<AiFillCaretDown color='black' size='15px'/></button>
                 <div className={Classes.DropDownContnt}>
                     {/* <Link to='/user/profile' className={Classes.DropDownLink}>My Account</Link> */}
                     <Link to='/user/mytokens' className={Classes.DropDownLink}>My Tokens</Link>
                     {/* <Link to='/user/settings' className={Classes.DropDownLink}>Settings</Link> */}
                     <Link to ='' onClick={props.click} className={Classes.DropDownLink}>Logout</Link>
                 </div>
            </div>:
            <div className={Classes.UserAuth}>
                <Link to='/signup' className={Classes.SignUpCap}>Sign up</Link>
                <button className={Classes.SignInBtn} onClick={props.clicked}>signIn</button>
                </div>}
                <div className={Classes.MobIcon} >
                    <img src={UserMobIcon} alt='userMobIcon' className={Classes.MobUser} />
                </div>
        </header>
        {/*  mobile only */}
        <div className={Classes.MobToolbar}>
            <form className={Classes.MobSearch}>
                <input  name='search' type='text' placeholder='Location '  className={Classes.MobSearchFieldLoctn}/>
                <input name='search' type='text' placeholder='Sectors'  className={Classes.MobSearchFieldSector}/>
                <button className={Classes.MobSearchBtn} type='button'><img src={SearchIcon}  width='17px' alt='searchIcon'/></button>
            </form>
            <div className={Classes.MobNearBy}>
                <button className={Classes.MobNearbyButton} type='button'>Near By&nbsp;<img src={NearbyIcon}  width='15px' alt='nearbyIcon'/></button> 
            </div>
        </div>
            {props.children}
    </div>
    )
}

export default Toolbar