import React from 'react'

export default function DeizuButton(props) {
    return (
        <button
            className={`standardBtn ${props.btnClass}`}
            onClick={props.btnClick}
            href={props.btnHref}
            type={props.btnType}
        >
            {props.btnIcon}
            {props.btnName}
        </button>
    )
}
