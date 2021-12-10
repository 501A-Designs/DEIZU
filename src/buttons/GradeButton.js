import React,{ useState} from 'react'

import {MdLanguage, MdLocationCity, MdSchool } from 'react-icons/md';

export default function GradeButton(props) {
    function IndivisualGradeButtons(props) {
        return (
            <div className="gradeButton"
                datatitle={props.btnTitle}
                onClick={props.btnClick}
            >
                <div style={{display: 'flex', justifyContent:'center'}}>
                    {props.btnIcon}
                </div>
                <span style={{textAlign: 'center'}}>{props.btnName}</span>
            </div>
        )
    }
    
    return (
        <div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'7px'}}>
            <IndivisualGradeButtons btnClick={props.setToIb} btnIcon={<MdLanguage className="iconBtn" />} btnName="IB" />
            <IndivisualGradeButtons btnClick={props.setToHighschool} btnIcon={<MdLocationCity className="iconBtn" />} btnName="中高" />
            <IndivisualGradeButtons btnClick={props.setToUniversity} btnIcon={<MdSchool className="iconBtn" />} btnName="大学" />
        </div>
    )




}
