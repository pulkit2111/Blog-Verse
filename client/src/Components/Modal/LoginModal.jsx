import React from "react";
import './modal.css';

const LoginModal=({show, handleClose, handleLogin})=>{
    if (!show) return null;
    return(
        <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Login / Signup</h2>
            <button className="modal-close" onClick={handleClose}>&times;</button>
          </div>
          <div className="modal-body">
            <p>Would you like to login/signup?</p>
          </div>
          <div className="modal-footer">
            <button className="modal-button modal-button-secondary" onClick={handleClose}>No</button>
            <button className="modal-button modal-button-primary" onClick={handleLogin}>Yes</button>
          </div>
        </div>
      </div>
    )
}

export default LoginModal;