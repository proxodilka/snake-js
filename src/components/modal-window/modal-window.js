import React from 'react';
import './modal-window.css';

const Modal = (props)=>{
    const {overlayStyle, modalContainerStyle, isOpen=true} = props;

    if (!isOpen) return null;

    return(
        <div style={overlayStyle} className="overlay">
            <div className="modalRoot">
                <div style={modalContainerStyle} className="modalContent">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const Overlay = ()=>{

}

export default Modal;