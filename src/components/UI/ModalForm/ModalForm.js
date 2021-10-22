import React, { Component } from 'react'
import Classes from './ModalForm.module.css'
import Modal from 'react-bootstrap/Modal'
import PlacesAutocomplete from 'react-places-autocomplete';
  import {TiLocationOutline} from "react-icons/ti"
class ModalForm extends Component{

    render(){
    return(
        <Modal show={this.props.shows} onHide={this.props.hide} animation={false}>
             <Modal.Header closeButton className={Classes.ModalHeader}>
                <Modal.Title className={Classes.Title}>{this.props.heading}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <label className={Classes.FormLabel}>{this.props.label}</label>
                 <PlacesAutocomplete
                                             value={this.props.location}
                                             onChange={this.props.locationChange}
                                             onSelect={this.props.select}
                                             
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                            <input
                                                {...getInputProps({
                                                placeholder: 'Search location ...',
                                                className: 'form-control',
                                                style:{fontSize: '14px',
                                                fontWeight: '400',
                                                backgroundColor: 'rgb(244, 244, 244)',
                                                borderColor: 'rgb(240, 240, 240)',
                                                height: '45px'}
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
                                         <div className={Classes.ErrorMsg}>{this.props.errorMsg}</div>
                 
                 <button className={Classes.SaveBtn} onClick={this.props.btnClick}>submit</button> 
             </Modal.Body>
             <Modal.Footer>
                 <button className={Classes.CloseBtn} onClick={this.props.closeBtn}>Close</button>
            </Modal.Footer>
        </Modal>

    )
}
}
export default ModalForm