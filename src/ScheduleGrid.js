import React, { useState } from 'react'
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from './firebase';


export default function ScheduleGrid() {
    // const [state, setState] = useState('home');

    const [user] = useAuthState(auth);
    const dataRef = db.collection('users');

    return (
        <div>
            <section className="scheduleGrid">
                <br />
                <div>月</div>
                <div>火</div>
                <div>水</div>
                <div>木</div>
                <div>金</div>
                <div>土</div>
                
                {/* 1st Row */}
                <h3>１</h3>
                <ScheduleCell cellId="a1"/>
                <ScheduleCell cellId="b1"/>
                <ScheduleCell cellId="c1"/>
                <ScheduleCell cellId="d1"/>
                <ScheduleCell cellId="e1"/>
                <ScheduleCell cellId="f1"/>
        
                {/* 2nd Row */}
                <h3>２</h3>
                <ScheduleCell cellId="a2"/>
                <ScheduleCell cellId="b2"/>
                <ScheduleCell cellId="c2"/>
                <ScheduleCell cellId="d2"/>
                <ScheduleCell cellId="e2"/>
                <ScheduleCell cellId="f2"/>
                
                {/* 3rd Row */}
                <h3>３</h3>
                <ScheduleCell cellId="a3"/>
                <ScheduleCell cellId="b3"/>
                <ScheduleCell cellId="c3"/>
                <ScheduleCell cellId="d3"/>
                <ScheduleCell cellId="e3"/>
                <ScheduleCell cellId="f3"/>
                
                {/* 4th Row */}
                <h3>４</h3>
                <ScheduleCell cellId="a4"/>
                <ScheduleCell cellId="b4"/>
                <ScheduleCell cellId="c4"/>
                <ScheduleCell cellId="d4"/>
                <ScheduleCell cellId="e4"/>
                <ScheduleCell cellId="f4"/>
        
                {/* 5th Row */}
                <h3>５</h3>
                <ScheduleCell cellId="a5"/>
                <ScheduleCell cellId="b5"/>
                <ScheduleCell cellId="c5"/>
                <ScheduleCell cellId="d5"/>
                <ScheduleCell cellId="e5"/>
                <ScheduleCell cellId="f5"/>
        
                {/* 6th Row */}
                <h3>６</h3>
                <ScheduleCell cellId="a6"/>
                <ScheduleCell cellId="b6"/>
                <ScheduleCell cellId="c6"/>
                <ScheduleCell cellId="d6"/>
                <ScheduleCell cellId="e6"/>
                <ScheduleCell cellId="f6"/>
        
                {/* 7th Row */}
                <h3>７</h3>
                <ScheduleCell cellId="a7"/>
                <ScheduleCell cellId="b7"/>
                <ScheduleCell cellId="c7"/>
                <ScheduleCell cellId="d7"/>
                <ScheduleCell cellId="e7"/>
                <ScheduleCell cellId="f7" />
            </section>
        </div>
    )

    function ScheduleCell(props) {
        const cellName = props.cellId;
        const cellLink = props.cellId + "Link";
        
        function Popup() {
            const [subjectLink, setSubjectLinkValue] = useState('');
            
            const saveSubject = async (e) => {
                e.preventDefault();
                dataRef.doc(user.uid).set({
                    cells: {
                        [cellName]: {
                            [cellName]: subjectName,
                            [cellLink]: subjectLink
                        }
                    }
                }, { merge: true })
                setSubjectValue('');
            }

 
            return (
                <section style={style} className="popupBack">
                    <div className="popup">
                        <button
                            className="closeBtn"
                            onClick={() => {setStyle({display: 'none'})}}
                        ></button>
                        <section>
                            <div className="colors">
                                <button id="red">赤</button>
                                <button id="blue">青</button>
                                <button id="yellow">黄</button>
                                <button id="green">緑</button>
                                <button id="peach">桃</button>
                                <button id="purple">紫</button>
                            </div>
                            <form
                                className="inputGrid"
                                onSubmit={saveSubject}>
                                
                                <input
                                    type="text"
                                    className="popupInput"
                                    placeholder="科目名"
                                    value={subjectName}
                                    onChange={(e) => setSubjectValue(e.target.value)}
                                />
                                {user ? <input
                                            type="text"
                                            className="popupInput"
                                            placeholder="リンク"
                                            onChange={(e) => setSubjectLinkValue(e.target.value)}/> : null}
                                <div>
                                <h2 className="displayTitle">{subjectName ? subjectName: <h4 style={{color:'gray', margin:'0px'}}>プレビュー</h4>}</h2>
                                <button type="submit">保存</button>

                                </div>
                            </form>
                        </section>
                    </div>
                </section>
            )
        }

        const [subjectName, setSubjectValue] = useState('');

        const [style, setStyle] = useState({ display: 'none' });

        const getSubjects = (doc) => {
            const dataObject = doc.data().cells;
            console.log(dataObject.cellId)
        }
        dataRef.doc(user.uid).get().then((doc) => {
                getSubjects(doc)
                // console.log(doc.data().cells)
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        // const [cellValue] = useCollectionData
        // const { subjectValue, linkValue } = props.

        return (
            <div style={{margin:'0px', padding:'0px'}}>
                <section
                    className="cell"
                    onClick={() => { setStyle({ display: 'block' }); }}
                >
                    <h2>{cellName}</h2>
                    {/* subjectName ? subjectName:  */}
                </section>
                <Popup />
            </div>
        )
    }
}

