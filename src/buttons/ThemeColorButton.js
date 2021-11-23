import React from 'react'

export default function ThemeColorButton(props) {
    return (
        <section datatitle="[保存]ボタンで保存" className="themeColorBtn" onClick={props.btnClick}>
            <div style={{ backgroundColor: `${props.btnTabColor0}` }}/>
            <div style={{ backgroundColor: `${props.btnTabColor1}` }}/>
            <div style={{backgroundColor:`${props.btnTabColor2}`}}/>
            <div style={{backgroundColor:`${props.btnTabColor3}`}}/>
        </section>
    )
}
