import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import Select from 'react-select';


import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';



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
            backdropFilter: `blur(16px)`
        }
    };
    const sheetTitle = props.sTitle;

    const [modalIsOpen, setIsOpen] = useState(false);
    // const [subjectName, setSubjectValue] = useState('');
    const [subjectLinkValue, setSubjectLinkValue] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const [selectedOption, setSelectedOption] = useState('');
    // const arraySelectedOption = Object.keys(selectedOption);
    // console.log(arraySelectedOption);

    const [cellColor, setCellColor] = useState('');

    const cellName = props.cellId;
    const cellClr = props.cellId + "Color";
    const cellLink = props.cellId + "Link";
    const cellDscrp = props.cellId + "Dscrp";

    const selectorStyle = {
        option: (provided, state) => ({
            ...provided,
            borderRadius: '0px 5px 5px 0px',
            padding: 8,
            paddingLeft: 15,
            width: '95%',
            marginRight: 5,
            boxShadow: state.isFocused ? '0px 1px 3px lightgray' : 0,
            fontWeight: state.isFocused ? 'bold' : 0,
            cursor: 'pointer',
        }),
        control: (base, state) => ({
            ...base,
            cursor: 'text',
            fontSize:14,
            padding: 1,
            outline: 'none',
            borderRadius: 5,
            border: '0px solid transparent',
            boxShadow: state.isFocused ? '0px 5px 10px lightgray' : 0,
            backgroundColor: state.isFocused ? 'white':'#ebebeb',
            transition: '0.5s',
        }),
        menuPortal: base => ({ ...base, zIndex: 100 })
    };
    const selectorTheme = [
        theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'lightgray',
            },
        })
    ]
    const options = [
        // IBDP　Subjects
        { value: 'TOK', label: 'TOK' },
        { value: 'CAS', label: 'CAS' },
        { value: 'EE', label: 'EE' },
        { value: '数学SL', label: '数学SL' },
        { value: '数学HL', label: '数学HL' },
        { value: '現文SL', label: '現文SL' },
        { value: '現文HL', label: '現文HL' },
        { value: '英語SL', label: '英語SL' },
        { value: '英語HL', label: '英語HL' },
        { value: '生物SL', label: '生物SL' },
        { value: '生物HL', label: '生物HL' },
        { value: '物理SL', label: '物理SL' },
        { value: '物理HL', label: '物理HL' },
        { value: '地理SL', label: '地理SL' },
        { value: '地理HL', label: '地理HL' },
        { value: 'アートSL', label: 'アートSL' },
        { value: 'アートHL', label: 'アートHL' },
        { value: 'LHR', label: 'LHR' },
        { value: '自習', label: '自習' },
        { value: '体育', label: '体育' },
        { value: '芸術', label: '芸術' },
        { value: '音楽', label: '音楽' },

        // Standard Subjects
        { value: '英会話', label: '英会話' },
        { value: '古典', label: '古典' },
        { value: '世界史', label: '世界史' },
        { value: '日本史', label: '日本史' },
        { value: '数学', label: '数学' },
        { value: '現代文', label: '現代文' },
        { value: '英語', label: '英語' },
    ]

    const handleLinkChanges = (e) => {
        setSubjectLinkValue(e.target.value);
    }
    const handleDescriptionChanges = (e) => {
        setSubjectDescription(e.target.value);
    }

    const handleColorValuesChanges = (e) => {
        setCellColor(e.target.value);
    }
    const bruh = JSON.stringify(selectedOption);
    console.log(bruh);

    const saveSubject = async (e) => {
        e.preventDefault();
        dataRef.doc(user.uid).set({
            sheets:{
                [sheetTitle]: {
                    date: createdAt,
                    cells: {
                        [cellName]: {
                            [cellName]: bruh,
                            [cellLink]: subjectLinkValue,
                            [cellDscrp]: subjectDescription,
                            [cellClr]: cellColor
                        }
                    }
                }
            }
        }, { merge: true })
        // setSubjectValue('');
        setIsOpen(false);
    }

    
    useEffect(() => {
        dataRef.doc(user.uid).get().then((doc) => {
            setSelectedOption('');
            setSubjectLinkValue('');
            setSubjectDescription('');
            setCellColor('');
            const dataObject = doc.data().sheets[sheetTitle];
            // const date = dataObject.date;
            const cellData = dataObject.cells[cellName];
            // Within Cell Data
            const cellNameData = cellData[cellName];
            const cellLinkData = cellData[cellLink];
            const cellDscrpData = cellData[cellDscrp];
            const cellColorData = cellData[cellClr];
            console.log(cellNameData);
            
            setSelectedOption(cellNameData);
            setSubjectLinkValue(cellLinkData);
            setSubjectDescription(cellDscrpData);
            setCellColor(cellColorData);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [sheetTitle])
    

    // SELECT INPUT
    function MyComponent(){
        const handleSelectChange = (inputValue) => {
            console.log("input change" + inputValue);
        };
        return (
            <CreatableSelect
                isClearable
                menuPortalTarget={document.body}
                styles={selectorStyle}
                theme={selectorTheme}
                placeholder="科目を選択"

                defaultValue={selectedOption}
                onChange={handleSelectChange}
                options={options}
            />
        );
    }
    // const MyComponent = () => (
    //     <Select

    //     />
    // )

    return (
        <div style={{ margin: '0px', padding: '0px' }}>
            <section
                className={selectedOption ? 'cell': 'cellHover'}
                style={{ background: cellColor, border: `1px solid ${cellColor ? cellColor: 'transparent'}`}}
                onClick={selectedOption ? null: () => setIsOpen(true) }
            >
                <div>
                    <h2
                        onClick={selectedOption ? () => setIsOpen(true) : null}
                        className={selectedOption ? 'cellNameHover' : null}
                        datatitle={selectedOption ? 'セルを編集' : null}
                    >
                        {selectedOption}
                    </h2>
                    {subjectLinkValue ? <a href={subjectLinkValue} target="_blank"><span className="eraseOnMobile">リンク</span>↗</a> : null}
                    {subjectDescription ? <h6 className="displayDescription">{subjectDescription}</h6> : null}
                </div>
            </section>
            <Modal
                style={modalStyle}
                isOpen={modalIsOpen} className="popup"
            >
                <div className="closeBtn">
                    <button type="submit" onClick={() => { setIsOpen(false)}}></button>
                </div>

                {/* SUBJECT SELECTION */}
                <div className="centerAll">
                    {/* CELL PREVIEW */}
                    <div
                        className="displayTitle"
                        style={{ background: cellColor, border: `1px solid ${cellColor ? cellColor: 'transparent'}`}}>
                        {selectedOption ? <h2 style={{ margin: '0px' }}>{selectedOption}</h2> : <h2 style={{ margin: '0px' }}>科目名</h2>}
                        <h6 className="displayLink">{subjectLinkValue ? subjectLinkValue : "<リンクURL>"}</h6>
                        <h5 className="displayDescription">{subjectDescription ? subjectDescription : "概要・教師・教室"}</h5>
                    </div>
                    {/* CELL COLOR SELECTOR */}
                    <div className="colors">
                        <button onClick={() => { setCellColor('#f3f3f3') }}>無</button>
                        <button id="red" onClick={() => { setCellColor('rgb(255, 153, 153)') }}>赤</button>
                        <button id="blue" onClick={() => { setCellColor('lightblue') }}>青</button>
                        <button id="yellow" onClick={() => { setCellColor('yellow') }}>黄</button>
                        <button id="green" onClick={() => { setCellColor('lightgreen') }}>緑</button>
                        <button id="peach" onClick={() => { setCellColor('pink') }}>桃</button>
                        <button id="purple" onClick={() => { setCellColor('rgb(228, 151, 228)') }}>紫</button>
                        <button id="mugi" onClick={() => { setCellColor('rgb(228, 201, 151)') }}>麦</button>
                        <button id="teal" onClick={() => { setCellColor('rgb(151, 228, 192)') }}>淡</button>
                        <button id="navy" onClick={() => { setCellColor('rgb(128, 160, 228)') }}>流</button>
                        <button id="orange" onClick={() => { setCellColor('rgb(255, 199, 78)') }}>柑</button>
                        <button id="limeYellow" onClick={() => { setCellColor('#e0ff6f') }}>臭</button>
                        <div>
                            <input type="color" value={cellColor} onChange={handleColorValuesChanges}></input>
                            <label>自分で指定</label>
                        </div>
                    </div>

                    {/* CELL SUBJECT & LINK INPUT */} 
                    <form className="modalForm" onSubmit={saveSubject}>
                        <MyComponent/>
                        <input
                            className="deizuInput"
                            type="url"
                            placeholder="リンク"
                            value={subjectLinkValue}
                            onChange={handleLinkChanges}
                        />
                        <input
                            className="deizuInput"
                            type="text"
                            placeholder="概要"
                            value={subjectDescription}
                            onChange={handleDescriptionChanges}
                        />
                        <button
                            type="submit"
                            className="saveBtn"
                        />
                    </form>

                </div>
            </Modal>
        </div>
    );
}
  