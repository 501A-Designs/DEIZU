import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import firebase, { auth, dataRef } from './firebase';
import Modal from 'react-modal';
// Modal.setAppElement('#root');

export default function ScheduleCell(props) {
    const [user] = useAuthState(auth);
    const modalStyle = {
        overlay: {
            background: `radial-gradient(
                86.36% 107.55% at 6.49% 12.32%,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(255, 255, 255, 0.5) 100%
            )`,
            backdropFilter:`blur(16px)`
        }
    };
    const sheetTitle = props.sTitle;

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
                    date: createdAt,
                    cells: {
                        [cellName]: {
                            [cellName]: subjectName,
                            [cellLink]: subjectLinkValue,
                            [cellClr]: cellColor
                        }
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
            setSubjectValue(null);
            setSubjectLinkValue(null);
            setCellColor(null);
            const dataObject = doc.data().sheets[sheetTitle];
            // const date = dataObject.date;
            const cellData = dataObject.cells[cellName];
            // Within Cell Data
            const cellNameData = cellData[cellName];
            const cellLinkData = cellData[cellLink];
            const cellColorData = cellData[cellClr];

            setSubjectValue(cellNameData);
            setSubjectLinkValue(cellLinkData);
            setCellColor(cellColorData);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [sheetTitle])


    function ShowSuggested() {
        const items = [
            {
                id: 0,
                name: 'Cobol'
            },
            {
                id: 1,
                name: 'JavaScript'
            },
            {
                id: 2,
                name: 'Basic'
            },
            {
                id: 3,
                name: 'PHP'
            },
            {
                id: 4,
                name: 'Java'
            }
        ]
    
        const formatResult = (item) => {
        return item;
        // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
        }
    
        return (
            <div style={{ width: 400 }}>
                <ReactSearchAutocomplete
                    styling={{
                        searchIconMargin: "10px 12px 0 11px",
                        clearIconMargin: "10px 0 8px 0"
                    }}
                    items={items}
                    showIcon={false}
                    formatResult={formatResult}
                />
            </div>
        )
    }
    

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
                style={modalStyle}
                isOpen={modalIsOpen} className="popup"
            >
                <div className="closeBtn">
                    <button type="submit" onClick={() => setIsOpen(false)}></button>
                </div>

                {/* SUBJECT SELECTION */}
                <div className="centerAll">
                    {/* CELL PREVIEW */}
                    <div className="displayTitle"
                        id={cellColor}>
                        {subjectName ? <h2 style={{ margin: '0px' }}>{subjectName}</h2> : <h2 style={{ margin: '0px' }}>科目名</h2>}
                        <h6 className="displayLink">{subjectLinkValue ? subjectLinkValue : "<リンクURL>"}</h6>
                    </div>
                    {/* CELL COLOR SELECTOR */}
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
                    {/* CELL SUBJECT & LINK INPUT */} 
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
                    <ShowSuggested/>
                </div>
            </Modal>
        </div>
    );
}
  