import './Modal.css';
import iconClose from './icon-close.svg';

import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div>
                { this.props.isOpen ? 
                <div>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            {this.props.children}
                        </div>
                        <div className='modal-header'>
                            <div className="close-btn" onClick={this.props.toggle}>
                                <img src={iconClose} style={{cursor: 'pointer'}} alt="close-icon" />
                            </div>
                        </div>
                    </div>
                    <div className='modal-overlay' onClick={this.props.toggle}></div>
                </div> 
                : null
                }
            </div>
        );
    }
}

export default Modal;
