import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {MdSave,MdOutlineModeEditOutline} from 'react-icons/md';
import DeizuButton from '../buttons/DeizuButton'
import firebase, { auth, dataRef, optionsDataRef } from '../firebase';

import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function QuickSubjectInsertModal(props) {
    const [user] = useAuthState(auth);
    const modalIsClosed = () => props.closeModal;
    const selectorColorProp = props.selectorColor;

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

    const [textAreaValue, setTextAreaValue] = useState('');
    const [textAreaDataForDB, setTextAreaDataForDB] = useState();
    let inputValueArray = [];
    const splitUserInput = (e) => {
        setTextAreaValue(e.target.value);
        inputValueArray.push(textAreaValue.toString().split("、"));
        setTextAreaDataForDB(inputValueArray)
    }
    const saveInputData = () => {
        for (let i = 0; i < textAreaDataForDB.length; i++) {
            dataRef.doc(user.uid).update({
                customSubjectOptions:
                    firebase.firestore.FieldValue.arrayUnion(
                        {
                            label: textAreaDataForDB[i],
                            value: textAreaDataForDB[i]
                        }
                    )[i]
            }, { merge: true })
        }
    }

    // for (let i = 0; i < inputValueArray.length; i++) {
    // }

    return (
        <>
            <Modal
                style={modalStyle}
                isOpen={props.modalState}
                className="popup"
            >
                <div className="closeBtn">
                    <button
                        type="submit"
                        onClick={modalIsClosed()}
                    />
                </div>
                <div>
                    <h3 style={{marginLeft:'5px'}}>科目をまとめてデータベースに追加</h3>
                    <p style={{margin:'5px'}}>
                        科目を「、」で並べて入力し、保存のボタンを押すと入力したものが全てユーザー様のプライベートDEIZUデータベースに保存されます。
                    </p>
                    <div className="modalForm">
                        <textarea
                            className="deizuTextArea"
                            placeholder="例）数学、物理、英語、〇〇、〇〇、..."
                            rows="4"
                            cols="50"
                            value={textAreaValue}
                            onChange={splitUserInput}
                        />
                        <DeizuButton
                            btnIcon={<MdSave className="iconBtn" />}
                            btnName="入力した科目を全て保存"
                            btnClick={saveInputData}
                        />
                    </div>
                </div>
            </Modal>    
        </>
    )
}
