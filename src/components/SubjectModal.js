import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {MdSave,MdModeEdit,MdCheckCircle,MdBlock,MdKeyboardArrowRight} from 'react-icons/md';
import DeizuButton from '../buttons/DeizuButton'
import CreatableSelect from 'react-select/creatable';
import firebase, { auth,dataRef,optionsDataRef } from '../firebase';

import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function SubjectModal(props) {
    const [user] = useAuthState(auth);
    const sheetTitle = props.sTitle;
    const cornerProp = props.corner;
    const modalIsOpen = props.modalState;

    const cellName = props.cellId;
    const cellClr = props.cellId + "Color";
    const cellLink = props.cellId + "Link";
    const cellDscrp = props.cellId + "Dscrp";
    const selectorColorProp = props.selectorColor;
    const modalIsClosed = () => props.closeSubjectModal;
    
    let cellIdString = String(props.cellId);
    let cellDay = cellIdString.split('')[0];
    let cellPeriod = cellIdString.split('')[1];

    const goToNextCell = () => {
        let cellNumber = parseInt(cellName.split('')[1]);
        if (cellNumber === 7) {
            console.log(1);
        } else {
            console.log(cellNumber + 1);
        }
    }


    const [subjectName, setSubjectName] = useState('');
    const [subjectLinkValue, setSubjectLinkValue] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const [subjectOptions, setSubjectOptions] = useState()
    
    const [subjectSuggestionType, setSubjectSuggestionType] = useState()

    const [cellColor, setCellColor] = useState('var(--system1)');
    const [editingIcon, setEditingIcon] = useState('editing');

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
    const selectorStyle = {
        option: (provided, state) => ({
            ...provided,
            borderRadius: '0px 5px 5px 0px',
            padding: 8,
            paddingLeft: 15,
            width: '95%',
            marginRight: 5,
            backgroundColor: state.isFocused ? `${selectorColorProp[3]}` : 0,
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

    const resetAll = () => {
        setSubjectName('');
        setSubjectLinkValue('');
        setSubjectDescription('');
        setCellColor('var(--system1)');
        setEditingIcon('editing');
    }

    useEffect(() => {
        setSubjectSuggestionType(props.subjectSuggestionTypeData);
        dataRef.doc(user.uid).get().then((doc) => {
            resetAll();
            const dataObject = doc.data().sheets[sheetTitle];
            const cellData = dataObject.cells[cellName];
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
    }, [modalIsOpen])
    useEffect(() => {
        if (subjectSuggestionType === 'custom') {
            dataRef.doc(user.uid).get().then((doc) => {
                setSubjectOptions(doc.data().customSubjectOptions)
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            optionsDataRef.doc(subjectSuggestionType).get().then((doc) => {
                setSubjectOptions(doc.data().options)
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [subjectSuggestionType])
    
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
                options={subjectOptions}
            />
        );
    }

    function ColorButton(props) {
        return (
            <button
                style={
                    {
                        backgroundColor: `${props.btnColor}`,
                        border: `1px solid ${props.btnColor}`
                    }
                }
                onClick={() => {
                    setCellColor(`${props.btnColor}`);
                    setEditingIcon('editing');
                }}
            />
        )
    }

    const handleSelectChange = (inputValue) => {
        setEditingIcon('editing');
        const sValue = Object.values(inputValue)[0];
        setSubjectName(sValue);
    };
    const handleLinkChanges = (e) => {
        setEditingIcon('editing');
        setSubjectLinkValue(e.target.value);
    }
    const handleDescriptionChanges = (e) => {
        setEditingIcon('editing');
        setSubjectDescription(e.target.value);
    }
    const handleColorValuesChanges = (e) => {
        setEditingIcon('editing');
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
        setEditingIcon('saved')
        console.log(editingIcon)
    }

    return (
        <>
            <Modal
                style={modalStyle}
                isOpen={modalIsOpen}
                className="popup"
            >
                <div className="closeBtn">
                    <button
                        type="submit"
                        onClick={modalIsClosed()}
                    />
                </div>
                <div className="cellNameData">
                    <div>
                        {editingIcon === 'editing' ? <MdModeEdit className="iconBtn"/>:<MdCheckCircle className="iconBtn" />}
                        {cellDay === 'a' && '月曜'}
                        {cellDay === 'b' && '火曜'}
                        {cellDay === 'c' && '水曜'}
                        {cellDay === 'd' && '木曜'}
                        {cellDay === 'e' && '金曜'}
                        {cellDay === 'f' && '土曜'}
                        の{cellPeriod}時間目
                        {editingIcon === 'editing' ? 'を編集中・・・':'を保存しました'}  
                    </div>
                    {editingIcon === 'saved' && 
                        <div onClick={resetAll} className="resetAllBtn">
                            <MdBlock className="iconBtn" />
                            セルをリセット
                        </div>
                    }
                </div>
                <div>
                    <section style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'2px'}}>
                        <div
                            className="displayTitle"
                            style={{ background: cellColor, border: `1px solid ${cellColor ? cellColor: 'transparent'}`}}>
                            {subjectName ? <h2 style={{ margin: '0px' }}>{subjectName}</h2> : <h2 style={{ margin: '0px' }}>科目名</h2>}
                            <h6 className="displayLink">{subjectLinkValue ? subjectLinkValue : "<リンクURL>"}</h6>
                            <h5 className="displayDescription">{subjectDescription ? subjectDescription : "概要・教師・教室"}</h5>
                        </div>
                        <div className="colors">
                            <section>
                                <ColorButton btnColor="var(--system1)"/>
                                <ColorButton btnColor="rgb(255, 153, 153)"/>
                                <ColorButton btnColor="lightblue"/>
                                <ColorButton btnColor="#ffde88"/>
                                <ColorButton btnColor="lightgreen"/>
                                <ColorButton btnColor="pink"/>
                                <ColorButton btnColor="rgb(228, 151, 228)"/>
                                <ColorButton btnColor="rgb(228, 201, 151)"/>
                                <ColorButton btnColor="rgb(151, 228, 192)"/>
                                <ColorButton btnColor="rgb(128, 160, 228)"/>
                                <ColorButton btnColor="rgb(255, 199, 78)"/>
                                <ColorButton btnColor="#e0ff6f"/>
                            </section>
                            <div>
                                <input type="color" value={cellColor} onChange={handleColorValuesChanges}></input>
                                <label>自分で指定</label>
                            </div>
                        </div>
                    </section>
                    <form className="modalForm" onSubmit={saveSubject}>
                        <SubjectSelector />
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
                        <DeizuButton
                            btnIcon={<MdSave className="iconBtn" />}
                            btnName="保存"
                            btnType={"submit"}
                        />
                    </form>
                </div>
            </Modal>
        </>
    )
}
