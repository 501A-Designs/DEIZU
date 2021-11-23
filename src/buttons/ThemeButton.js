import React from 'react'
import DeizuPlaceholderImg from '../img/deizuFavicon.png'

export default function ThemeButton(props) {
    return (
        <section datatitle="[保存]ボタンで保存" className="themeBtn" onClick={props.btnClick}>
            <img alt="no img found" src={props.btnImg ? props.btnImg :DeizuPlaceholderImg} />
            <p>{props.btnName}</p>
        </section>
    )
}
