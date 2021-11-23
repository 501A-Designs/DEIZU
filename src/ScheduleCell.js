import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {options} from './options';

import CreatableSelect from 'react-select/creatable';

import firebase, { auth, dataRef } from './firebase';
import Modal from 'react-modal';
// Modal.setAppElement('#root');

export default function ScheduleCell(props) {
    const cornerProp = props.corner;
    const selectorColorProp = props.selectorColor;

    const [user] = useAuthState(auth);
    const modalStyle = {
        overlay: {
            background: `radial-gradient(
                86.36% 107.55% at 6.49% 12.32%,
                ${selectorColorProp[0]} 0%,
                rgba(255, 255, 255, 0.5) 100%
            )`,
            backdropFilter: `blur(5px)`
        }
    };
    const sheetTitle = props.sTitle;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [subjectName, setSubjectName] = useState('');
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
            backgroundColor: state.isFocused ? `${selectorColorProp[2]}` : 0,
            color: state.isFocused ? `${selectorColorProp[5]}` : 0,
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
            borderRadius: `${cornerProp[0]}`,
            // border: '0px solid transparent',
            border: 0,
            boxShadow: 0,
            backgroundColor: state.isFocused ? selectorColorProp[0] : selectorColorProp[1],
            transition: '0.5s',
        }),
        menuPortal: base => ({ ...base, zIndex: 100 })
    };
    const selectorTheme = [
        theme => ({
            ...theme,
            colors: {
                ...theme.colors,
              primary: `${selectorColorProp[3]}`,
            },
        })
    ]


    const handleSelectChange = (inputValue) => {
        const sValue = Object.values(inputValue)[0];
        // console.log("input change" + inputValue);
        setSubjectName(sValue);
    };
    const handleLinkChanges = (e) => {
        setSubjectLinkValue(e.target.value);
    }
    const handleDescriptionChanges = (e) => {
        setSubjectDescription(e.target.value);
    }
    const handleColorValuesChanges = (e) => {
        setCellColor(e.target.value);
    }

    const saveSubject = async (e) => {
        e.preventDefault();
        dataRef.doc(user.uid).set({
            sheets:{
                [sheetTitle]: {
                    date: createdAt,
                    cells: {
                        [cellName]: {
                            [cellName]: subjectName,
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
            setSubjectName('');
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
            
            setSubjectName(cellNameData);
            setSubjectLinkValue(cellLinkData);
            setSubjectDescription(cellDscrpData);
            setCellColor(cellColorData);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [sheetTitle])
    
    // SELECT INPUT
    function SubjectSelector(){
        return (
            <CreatableSelect
                isClearable
                menuPortalTarget={document.body}
                styles={selectorStyle}
                theme={selectorTheme}
                placeholder="科目を選択"
                defaultValue={subjectName}
                onChange={handleSelectChange}
                options={options}
            />
        );
    }
    // const MyComponent = () => (
    //     <Select

    //     />
    // )

    function ColorButton(props) {
        return (
            <button
                style={{backgroundColor: `${props.btnColor}`, border: `1px solid ${props.btnColor}`}}
                onClick={() => { setCellColor(`${props.btnColor}`) }}
            >
                {props.btnName}
            </button>
        )
    }

    return (
        <div style={{ margin: '0px', padding: '0px' }}>
            <section
                className={subjectName ? 'cell': 'cellHover'}
                style={{ background: cellColor, border: `1px solid ${cellColor ? cellColor: 'transparent'}`}}
                onClick={subjectName ? null: () => setIsOpen(true) }
            >
                <div>
                    <h2
                        onClick={subjectName ? () => setIsOpen(true) : null}
                        className={subjectName ? 'cellNameHover' : null}
                        datatitle={subjectName ? 'セルを編集' : null}
                    >
                        {subjectName}
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
                        {subjectName ? <h2 style={{ margin: '0px' }}>{subjectName}</h2> : <h2 style={{ margin: '0px' }}>科目名</h2>}
                        <h6 className="displayLink">{subjectLinkValue ? subjectLinkValue : "<リンクURL>"}</h6>
                        <h5 className="displayDescription">{subjectDescription ? subjectDescription : "概要・教師・教室"}</h5>
                    </div>
                    {/* CELL COLOR SELECTOR */}
                    <div className="colors">
                        <ColorButton btnColor="#f3f3f3" btnName="無" />
                        <ColorButton btnColor="rgb(255, 153, 153)" btnName="赤"/>
                        <ColorButton btnColor="lightblue" btnName="青"/>
                        <ColorButton btnColor="#ffde88" btnName="黄"/>
                        <ColorButton btnColor="lightgreen" btnName="緑" />
                        <ColorButton btnColor="pink" btnName="桃" />
                        <ColorButton btnColor="rgb(228, 151, 228)" btnName="紫"/>
                        <ColorButton btnColor="rgb(228, 201, 151)" btnName="麦"/>
                        <ColorButton btnColor="rgb(151, 228, 192)" btnName="淡"/>
                        <ColorButton btnColor="rgb(128, 160, 228)" btnName="流"/>
                        <ColorButton btnColor="rgb(255, 199, 78)" btnName="柑"/>
                        <ColorButton btnColor="#e0ff6f" btnName="香"/>
                        <div>
                            <input type="color" value={cellColor} onChange={handleColorValuesChanges}></input>
                            <label>自分で指定</label>
                        </div>
                    </div>

                    {/* CELL SUBJECT & LINK INPUT */} 
                    <form className="modalForm" onSubmit={saveSubject}>
                        <SubjectSelector/>
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