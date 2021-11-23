import React from 'react'

export default function DeizuButton(props) {
    return (
        <button
            className={`standardBtn`}
            onClick={props.btnClick}
            href={props.btnHref}
            type={props.btnType}
            datatitle={props.btnTitle}
        >
            {props.btnIcon}
            {props.btnName}
        </button>
    )
}
