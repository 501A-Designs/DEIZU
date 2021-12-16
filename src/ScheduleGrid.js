import React,{useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.scss';

import { auth } from './firebase';
import TimeLabel from './TimeLabel';
import ScheduleCell from './ScheduleCell';
import SubjectModal from './components/SubjectModal'

export default function ScheduleGrid(props) {
    const [user] = useAuthState(auth);
    const sheetTitle = props.sheetTitle;
    const cornerProps = props.corner;
    const selectorColorProps = props.selectorColor;

    const date = new Date();
    const day = date.getDay();
    const hinichi = date.getDate();

    const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
    const currentDay = months[date.getMonth()] + hinichi + "日";
    
    const [selectedCellId, setSelectedCellId] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const closeSubjectModal　= () => setIsOpen(false);

    const setA1 = () => setSelectedCellId("a1");
    const setB1 = () => setSelectedCellId("b1");
    const setC1 = () => setSelectedCellId("c1");
    const setD1 = () => setSelectedCellId("d1");
    const setE1 = () => setSelectedCellId("e1");
    const setF1 = () => setSelectedCellId("f1");
    const setA2 = () => setSelectedCellId("a2");
    const setB2 = () => setSelectedCellId("b2");
    const setC2 = () => setSelectedCellId("c2");
    const setD2 = () => setSelectedCellId("d2");
    const setE2 = () => setSelectedCellId("e2");
    const setF2 = () => setSelectedCellId("f2");
    const setA3 = () => setSelectedCellId("a3");
    const setB3 = () => setSelectedCellId("b3");
    const setC3 = () => setSelectedCellId("c3");
    const setD3 = () => setSelectedCellId("d3");
    const setE3 = () => setSelectedCellId("e3");
    const setF3 = () => setSelectedCellId("f3");
    const setA4 = () => setSelectedCellId("a4");
    const setB4 = () => setSelectedCellId("b4");
    const setC4 = () => setSelectedCellId("c4");
    const setD4 = () => setSelectedCellId("d4");
    const setE4 = () => setSelectedCellId("e4");
    const setF4 = () => setSelectedCellId("f4");
    const setA5 = () => setSelectedCellId("a5");
    const setB5 = () => setSelectedCellId("b5");
    const setC5 = () => setSelectedCellId("c5");
    const setD5 = () => setSelectedCellId("d5");
    const setE5 = () => setSelectedCellId("e5");
    const setF5 = () => setSelectedCellId("f5");
    const setA6 = () => setSelectedCellId("a6");
    const setB6 = () => setSelectedCellId("b6");
    const setC6 = () => setSelectedCellId("c6");
    const setD6 = () => setSelectedCellId("d6");
    const setE6 = () => setSelectedCellId("e6");
    const setF6 = () => setSelectedCellId("f6");
    const setA7 = () => setSelectedCellId("a7");
    const setB7 = () => setSelectedCellId("b7");
    const setC7 = () => setSelectedCellId("c7");
    const setD7 = () => setSelectedCellId("d7");
    const setE7 = () => setSelectedCellId("e7");
    const setF7 = () => setSelectedCellId("f7");

    useEffect(() => {
        setIsOpen(true);
    }, [selectedCellId])

    return (
        <div>
            <SubjectModal
                sTitle={sheetTitle}
                corner={cornerProps}
                selectorColor={selectorColorProps}
                modalState={modalIsOpen}
                closeSubjectModal={closeSubjectModal}
                cellId={selectedCellId}
            />
            <section className="scheduleGrid">
                <br />
                {day === 1 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>月</div>:<div className="dayLabel">月</div>}
                {day === 2 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>火</div>:<div className="dayLabel">火</div>}
                {day === 3 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>水</div>:<div className="dayLabel">水</div>}
                {day === 4 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>木</div>:<div className="dayLabel">木</div>}
                {day === 5 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>金</div>:<div className="dayLabel">金</div>}
                {day === 6 ? <div className="dayLabel" id="dayLabelToday" datatitle={currentDay}>土</div>:<div className="dayLabel">土</div>}

                {/* 1st Row */}
                <TimeLabel num="1" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA1} cellId={"a1"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB1} cellId={"b1"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setC1} cellId={"c1"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setD1} cellId={"d1"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setE1} cellId={"e1"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setF1} cellId={"f1"} sTitle={sheetTitle} />

                {/* 2nd Row */}
                <TimeLabel num="2" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA2} cellId={"a2"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setB2} cellId={"b2"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setC2} cellId={"c2"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setD2} cellId={"d2"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setE2} cellId={"e2"} sTitle={sheetTitle} />
                <ScheduleCell thisCellId={setF2} cellId={"f2"} sTitle={sheetTitle} />

                {/* 3rd Row */}
                <TimeLabel num="3" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA3} cellId={"a3"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB3} cellId={"b3"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setC3} cellId={"c3"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setD3} cellId={"d3"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setE3} cellId={"e3"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setF3} cellId={"f3"} sTitle={sheetTitle}/>

                {/* 4th Row */}
                <TimeLabel num="4" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA4} cellId={"a4"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB4} cellId={"b4"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setC4} cellId={"c4"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setD4} cellId={"d4"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setE4} cellId={"e4"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setF4} cellId={"f4"} sTitle={sheetTitle}/>

                {/* 5th Row */}
                <TimeLabel num="5" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA5} cellId={"a5"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB5} cellId={"b5"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setC5} cellId={"c5"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setD5} cellId={"d5"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setE5} cellId={"e5"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setF5} cellId={"f5"} sTitle={sheetTitle}/>

                {/* 6th Row */}
                <TimeLabel num="6" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA6} cellId={"a6"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB6} cellId={"b6"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setC6} cellId={"c6"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setD6} cellId={"d6"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setE6} cellId={"e6"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setF6} cellId={"f6"} sTitle={sheetTitle}/>

                {/* 7th Row */}
                <TimeLabel num="7" sTitle={sheetTitle} selectorColor={selectorColorProps}/>
                <ScheduleCell thisCellId={setA7} cellId={"a7"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setB7} cellId={"b7"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setC7} cellId={"c7"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setD7} cellId={"d7"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setE7} cellId={"e7"} sTitle={sheetTitle}/>
                <ScheduleCell thisCellId={setF7} cellId={"f7"} sTitle={sheetTitle}/>
            </section>
            <h5 className="waterMark">
                Made by {user.displayName.split(" ")[0]} with DEIZU
            </h5>
        </div>
    )
};