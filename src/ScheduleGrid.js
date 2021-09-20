import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';

import { auth } from './firebase';
import TimeLabel from './TimeLabel';
import ScheduleCell from './ScheduleCell';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function ScheduleGrid(props) {
    const [user] = useAuthState(auth);
    const sheetTitle = props.sheetTitle;

    return (
        <div>
            <section className="scheduleGrid">
                <br />
                <div className="dayLabel">月</div>
                <div className="dayLabel">火</div>
                <div className="dayLabel">水</div>
                <div className="dayLabel">木</div>
                <div className="dayLabel">金</div>
                <div className="dayLabel">土</div>

                {/* 1st Row */}
                <TimeLabel num="1" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a1" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b1" sTitle={sheetTitle} />
                <ScheduleCell cellId="c1" sTitle={sheetTitle} />
                <ScheduleCell cellId="d1" sTitle={sheetTitle} />
                <ScheduleCell cellId="e1" sTitle={sheetTitle} />
                <ScheduleCell cellId="f1" sTitle={sheetTitle} />

                {/* 2nd Row */}
                <TimeLabel num="2" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a2" sTitle={sheetTitle} />
                <ScheduleCell cellId="b2" sTitle={sheetTitle} />
                <ScheduleCell cellId="c2" sTitle={sheetTitle} />
                <ScheduleCell cellId="d2" sTitle={sheetTitle} />
                <ScheduleCell cellId="e2" sTitle={sheetTitle} />
                <ScheduleCell cellId="f2" sTitle={sheetTitle} />

                {/* 3rd Row */}
                <TimeLabel num="3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="c3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="d3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="e3" sTitle={sheetTitle}/>
                <ScheduleCell cellId="f3" sTitle={sheetTitle}/>

                {/* 4th Row */}
                <TimeLabel num="4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="c4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="d4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="e4" sTitle={sheetTitle}/>
                <ScheduleCell cellId="f4" sTitle={sheetTitle}/>

                {/* 5th Row */}
                <TimeLabel num="5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="c5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="d5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="e5" sTitle={sheetTitle}/>
                <ScheduleCell cellId="f5" sTitle={sheetTitle}/>

                {/* 6th Row */}
                <TimeLabel num="6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="c6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="d6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="e6" sTitle={sheetTitle}/>
                <ScheduleCell cellId="f6" sTitle={sheetTitle}/>

                {/* 7th Row */}
                <TimeLabel num="7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="a7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="b7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="c7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="d7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="e7" sTitle={sheetTitle}/>
                <ScheduleCell cellId="f7" sTitle={sheetTitle}/>
            </section>
            <h5 className="waterMark">
                Made by {user.displayName.split(" ")[0]} with DEIZU
            </h5>
        </div>
    )
};