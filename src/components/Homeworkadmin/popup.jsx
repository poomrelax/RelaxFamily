import React from 'react'
import "./popup.css"

function Popup(props) {
  return (props.trigger) ? (
    <>
        <div className="Popup">
            <div className="popupinser">
                <div className="close-btn">
                  <button onClick={() => props.settrigger(false)}>Close</button>
                </div>
                <div className="inser">
                {props.children}
                </div>
            </div>
        </div>
    </>
  ) : ""
}

export default Popup