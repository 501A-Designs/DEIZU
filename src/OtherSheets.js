import React from 'react'

export default function OtherSheets(props) {
    return (props.trigger) ? (
        <div id = "sideBar" >
            <button
                className="closeBtn"
                onClick={() => props.setTrigger(false)}
            >✕</button>
            <h2>他の表</h2>
            <nav className="otherSheets">
                {/* Insert Other Sheets */}
            </nav>
        </div>
    ) : "";
}