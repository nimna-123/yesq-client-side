import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Classes from './ModalConfirm.module.css'

const ModalConform = (props) =>{
    return(
        <Modal  show={props.shows} onHide={props.hide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title className={Classes.ModalTitle}>{props.heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>       
                <Modal.Footer>
                    <button className={Classes.CloseBtn} onClick={props.closeBtn}>Cancel</button>
                    <button className={Classes.ConfirmBtn} onClick={props.confirmBtn}>Confirm</button>
                </Modal.Footer>
         </Modal>

    )
}
export default ModalConform