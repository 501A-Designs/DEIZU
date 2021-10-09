import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.scss';

import { auth } from './firebase';
import TimeLabel from './TimeLabel';
import ScheduleCell from './ScheduleCell';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function ScheduleGrid(props) {
    const [user] = useAuthState(auth);
    const sheetTitle = props.sheetTitle;
    const cornerProps = props.corner;
    const selectorColorProps = props.selectorColor;

    const date = new Date();
    const day = date.getDay();
    const hinichi = date.getDate();

    const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
    const currentDay = months[date.getMonth()]+hinichi+"日";
    
    return (
        <div>
            <section className="scheduleGrid">
                <br />
                {day === 1 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>月</div>:<div className="dayLabel">月</div>}
                {day === 2 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>火</div>:<div className="dayLabel">火</div>}
                {day === 3 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>水</div>:<div className="dayLabel">水</div>}
                {day === 4 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>木</div>:<div className="dayLabel">木</div>}
                {day === 5 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>金</div>:<div className="dayLabel">金</div>}
                {day === 6 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>土</div>:<div className="dayLabel">土</div>}

                {/* 1st Row */}
                <TimeLabel num="1" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a1" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b1" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c1" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d1" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e1" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f1" sTitle={sheetTitle} />

                {/* 2nd Row */}
                <TimeLabel num="2" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a2" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b2" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c2" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d2" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e2" sTitle={sheetTitle} />
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f2" sTitle={sheetTitle} />

                {/* 3rd Row */}
                <TimeLabel num="3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e3" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f3" sTitle={sheetTitle}/>

                {/* 4th Row */}
                <TimeLabel num="4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e4" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f4" sTitle={sheetTitle}/>

                {/* 5th Row */}
                <TimeLabel num="5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e5" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f5" sTitle={sheetTitle}/>

                {/* 6th Row */}
                <TimeLabel num="6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e6" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f6" sTitle={sheetTitle}/>

                {/* 7th Row */}
                <TimeLabel num="7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="a7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="b7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="c7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="d7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="e7" sTitle={sheetTitle}/>
                <ScheduleCell corner={cornerProps} selectorColor={selectorColorProps} cellId="f7" sTitle={sheetTitle}/>
            </section>
            <h5 className="waterMark">
                Made by {user.displayName.split(" ")[0]} with DEIZU
            </h5>
        </div>
    )
};