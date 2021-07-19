import React, { useState, useEffect } from 'react'
import firebase, { auth, db } from './firebase';
import './App.css';
import Modal from 'react-modal';

import { useAuthState } from 'react-firebase-hooks/auth';

Modal.setAppElement('#root');

export default function ScheduleGrid(props) {
    // const [state, setState] = useState('home');
    const [user] = useAuthState(auth);
    const dataRef = db.collection('users');

    const sheetTitle = props.sheetTitle;

    function ScheduleCell(props) {
        const [modalIsOpen, setIsOpen] = useState(false);
        const [subjectName, setSubjectValue] = useState('');
        const [subjectLinkValue, setSubjectLinkValue] = useState('');
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        const [cellColor, setCellColor] = useState('');

        const cellName = props.cellId;
        const cellClr = props.cellId + "Color";
        const cellLink = props.cellId + "Link";

        const saveSubject = async (e) => {
            e.preventDefault();
            dataRef.doc(user.uid).set({
                sheets: {
                    [sheetTitle]: {
                        date:createdAt,
                        [cellName]: {
                            [cellName]: subjectName,
                            [cellLink]: subjectLinkValue,
                            [cellClr]: cellColor
                        }
                    }
                }
            }, { merge: true })
            // setSubjectValue('');
            setIsOpen(false);
        }
        const handleChanges = (e) => {
            setSubjectValue(e.target.value);
        }
        const handleLinkChanges = (e) => {
            setSubjectLinkValue(e.target.value);
        }
        useEffect(() => {
            dataRef.doc(user.uid).get().then((doc) => {
                const dataObject = doc.data().sheets[sheetTitle];
                // const date = dataObject.date;
                const cellData = dataObject[cellName];
                // Within Cell Data
                const cellNameData = cellData[cellName];
                const cellLinkData = cellData[cellLink];
                const cellColorData = cellData[cellClr];

                setSubjectValue(cellNameData);
                setSubjectLinkValue(cellLinkData);
                setCellColor(cellColorData);
            }).catch((error) => {
                // console.log("Error getting document:", error);
            });
        }, [])

        return (
            <div style={{ margin: '0px', padding: '0px' }}>
                <section
                    className="cell"
                    id={cellColor}
                    onClick={() => { setIsOpen(true) }}
                >
                    <div>
                        <h2>
                            {subjectName}
                        </h2>
                        {subjectLinkValue ? <a href={subjectLinkValue} target="_blank"><span className="eraseOnMobile">リンク</span>↗</a> : null}
                    </div>
                </section>
                <Modal
                    style={{
                        overlay: {
                            background: `radial-gradient(
                                86.36% 107.55% at 6.49% 12.32%,
                                rgba(255, 255, 255, 0.5) 0%,
                                rgba(255, 255, 255, 0.5) 100%
                            )`,
                            backdropFilter:`blur(16px)`
                        }
                    }}
                    isOpen={modalIsOpen} className="popup"
                >
                    <div className="closeBtn">
                        <button type="submit" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="centerAll">
                        <h2 className="displayTitle"
                            id={cellColor}>
                            {subjectName ? subjectName : <h4 style={{ margin: '0px' }}>科目名</h4>}
                            <h6 className="displayLink">{subjectLinkValue ? subjectLinkValue : "<リンクURL>"}</h6>
                        </h2>

                        <div className="colors">
                            <button id="red" onClick={() => { setCellColor('red') }}>赤</button>
                            <button id="blue" onClick={() => { setCellColor('blue') }}>青</button>
                            <button id="yellow" onClick={() => { setCellColor('yellow') }}>黄</button>
                            <button id="green" onClick={() => { setCellColor('green') }}>緑</button>
                            <button id="peach" onClick={() => { setCellColor('peach') }}>桃</button>
                            <button id="purple" onClick={() => { setCellColor('purple') }}>紫</button>
                            <button id="mugi" onClick={() => { setCellColor('mugi') }}>麦</button>
                            <button id="teal" onClick={() => { setCellColor('teal') }}>淡</button>
                            <button id="navy" onClick={() => { setCellColor('navy') }}>流</button>
                            <button id="orange" onClick={() => { setCellColor('orange') }}>柑</button>
                            <button id="" onClick={() => { setCellColor('') }}>無</button>
                        </div>
                        <form onSubmit={saveSubject}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="科目名"
                                    value={subjectName}
                                    onChange={handleChanges}
                                />
                                <input
                                    type="text"
                                    placeholder="リンク"
                                    value={subjectLinkValue}
                                    onChange={handleLinkChanges}
                                />
                            </div>
                            <button
                                type="submit"
                                className="saveBtn"
                            ></button>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }

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
                <h3>１</h3>
                <ScheduleCell cellId="a1" />
                <ScheduleCell cellId="b1" />
                <ScheduleCell cellId="c1" />
                <ScheduleCell cellId="d1" />
                <ScheduleCell cellId="e1" />
                <ScheduleCell cellId="f1" />

                {/* 2nd Row */}
                <h3>２</h3>
                <ScheduleCell cellId="a2" />
                <ScheduleCell cellId="b2" />
                <ScheduleCell cellId="c2" />
                <ScheduleCell cellId="d2" />
                <ScheduleCell cellId="e2" />
                <ScheduleCell cellId="f2" />

                {/* 3rd Row */}
                <h3>３</h3>
                <ScheduleCell cellId="a3" />
                <ScheduleCell cellId="b3" />
                <ScheduleCell cellId="c3" />
                <ScheduleCell cellId="d3" />
                <ScheduleCell cellId="e3" />
                <ScheduleCell cellId="f3" />

                {/* 4th Row */}
                <h3>４</h3>
                <ScheduleCell cellId="a4" />
                <ScheduleCell cellId="b4" />
                <ScheduleCell cellId="c4" />
                <ScheduleCell cellId="d4" />
                <ScheduleCell cellId="e4" />
                <ScheduleCell cellId="f4" />

                {/* 5th Row */}
                <h3>５</h3>
                <ScheduleCell cellId="a5" />
                <ScheduleCell cellId="b5" />
                <ScheduleCell cellId="c5" />
                <ScheduleCell cellId="d5" />
                <ScheduleCell cellId="e5" />
                <ScheduleCell cellId="f5" />

                {/* 6th Row */}
                <h3>６</h3>
                <ScheduleCell cellId="a6" />
                <ScheduleCell cellId="b6" />
                <ScheduleCell cellId="c6" />
                <ScheduleCell cellId="d6" />
                <ScheduleCell cellId="e6" />
                <ScheduleCell cellId="f6" />

                {/* 7th Row */}
                <h3>７</h3>
                <ScheduleCell cellId="a7" />
                <ScheduleCell cellId="b7" />
                <ScheduleCell cellId="c7" />
                <ScheduleCell cellId="d7" />
                <ScheduleCell cellId="e7" />
                <ScheduleCell cellId="f7" />
            </section>
            <h5 className="waterMark">
                Made by {user.displayName.split(" ")[0]} with ❤️ from DEIZU
            </h5>
        </div>
    )
};