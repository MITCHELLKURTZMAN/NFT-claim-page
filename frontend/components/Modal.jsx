import React from 'react'

export default function Modal(props) {
    return (props.trigger) ? (
        <div className="popup z-50">
            <div className="popup-inner m-5 bg-slate-50 z-50">
                <button onClick={() => props.setTrigger(false)} className="close-btn">&times;</button>
                { props.children }
            </div>
        </div>
    ) : "";
}