import React from 'react'

export default function DeizuButton(props) {
    return (
        <button
            className={`standardBtn ${props.btnColor}`}
            onClick={props.btnClick}
            href={props.btnHref}
            type={props.btnType}
            datatitle={props.btnTitle}
            disabled={props.btnDisabled}
        >
            {props.btnIcon}
            {props.btnName}
        </button>
    )
}
