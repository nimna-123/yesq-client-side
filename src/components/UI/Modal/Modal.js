import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Classes from './Modal.module.css'

const Modals = (props) =>{
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
export default Modals