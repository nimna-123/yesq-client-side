import React from 'react'
import Classes from './ModalFail.module.css'
import Modal from 'react-bootstrap/Modal'
const ModalFail = (props) =>{
    return(
        <Modal show={props.shows} onHide={props.hide} animation={false}>
            <Modal.Header closeButton className={Classes.ModalHeader}>
              <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
         <Modal.Footer>
            <button className={Classes.CloseBtn} onClick={props.closeBtn}>
                Close
              </button>
        </Modal.Footer>
      </Modal>

    )
}
export default ModalFail