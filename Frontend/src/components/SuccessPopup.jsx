import React, { useState } from "react";
import '../style/successPopup.css'

function SuccessPopup({ message, handlePopup, closePopMsg }) {


    return (
        <div className="success-popup">

            <div className="popup-content">
                <h2>Success!</h2>
                <p>{message}</p>
                <button onClick={handlePopup}>{closePopMsg}</button>
            </div>

        </div>
    );
}


export default SuccessPopup