import React from 'react'
import DeizuPlaceholderImg from './deizuAppIconUpdated.png'

export default function ThemeButton(props) {
    return (
        <section datatitle="[保存]ボタンで保存" className="themeBtn" onClick={props.btnClick}>
            <img alt="no img found" src={props.btnImg ? props.btnImg :DeizuPlaceholderImg} />
            <h4>{props.btnName}</h4>
        </section>
    )
}
