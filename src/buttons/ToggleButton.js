import React from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md';


export default function ToggleButton(props) {
    let btnTitle = props.btnTitle;
    let dropDownState = props.dropDownState;
    let btnClick = props.btnClick;
    let btnIcon = props.btnIcon;
    let dropDownComponent = props.dropDownComponent;

    return (
        <>
            <button
                datatitle={btnTitle}
                className="standardBtn iconBtn"
                style={{
                    backgroundColor: `${dropDownState ? 'var(--system0)':'var(--system3)'}`, color: `${dropDownState ? 'var(--txtColor0)':'var(--txtColor1)'}`, border:`1px solid ${dropDownState ? 'var(--system2)':'var(--system3)'}`,
                }}
                onClick={btnClick}
            >
                {dropDownState ? <MdKeyboardArrowUp/>:btnIcon}
            </button>
            {dropDownState && dropDownComponent}
        </>
    )
}
