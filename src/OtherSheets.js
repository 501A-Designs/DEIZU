import React from 'react'

export default function OtherSheets(props) {
    return (props.trigger) ? (
        <div id = "sideBar" >
            <button
                className="closeBtn"
                onClick={() => props.setTrigger(false)}
            >Close</button>
            <h1>他の表</h1>
            <nav className="otherSheets">
                {/* Insert Other Sheets */}
            </nav>
        </div>
    ) : "";
}