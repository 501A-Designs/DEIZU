import React from 'react'

export default function SubmenuBox(props) {
    return (
        <div className="submenuBox">
            <h3>{props.header}</h3>
            {props.text && <p>{props.text}</p>}
            {props.children}
      </div>
    )
}
