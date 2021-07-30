import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import Modal from 'react-modal';
import { auth, dataRef } from './firebase';
// Modal.setAppElement('#root');

export default function TimeLabel(props) {
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

    const displayPeriod = props.num;
    const sheetTitle = props.sTitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const saveTime = async (e) => {
        e.preventDefault();
        dataRef.doc(user.uid).set({
            sheets: {
                [sheetTitle]: {
                    time: {
                        [displayPeriod]: {
                            start: timeStart,
                            end: timeEnd
                        }
                    }
                }
            }
        }, { merge: true })
        // setSubjectValue('');
        setIsOpen(false);
    }
    const handleStartChanges = (e) => {
        setTimeStart(e.target.value);
    }
    const handleEndChanges = (e) => {
        setTimeEnd(e.target.value);
    }
    useEffect(() => {
        dataRef.doc(user.uid).get().then((doc) => {
            setTimeStart(null);
            setTimeEnd(null);

            const dataObject = doc.data().sheets[sheetTitle];
            const jigen = dataObject.time[displayPeriod];
            const periodStart = jigen.start;
            const periodEnd = jigen.end;
            setTimeStart(periodStart);
            setTimeEnd(periodEnd);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },[sheetTitle])

    return (
        <div className="periodLabel" onClick={() => { setIsOpen(true) }}>
            <div className="periodAlign">
                {timeStart? <time>{timeStart}</time>:<br/>}
                <h3>{displayPeriod}</h3>
                {timeEnd? <time>{timeEnd}</time>:<br/>}
            </div>
            <Modal
                style={modalStyle}
                isOpen={modalIsOpen}
                className="popup"
            >
                <div className="centerAll">
                    <h2>時間を設定</h2>
                    <form onSubmit={saveTime}>
                        <input
                            type="time"
                            placeholder="始め"
                            value={timeStart}
                            onChange={handleStartChanges}
                        />
                        <input
                            type="time"
                            placeholder="終わり"
                            value={timeEnd}
                            onChange={handleEndChanges}
                        />
                        <button
                            type="submit"
                            className="saveBtn"
                        ></button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}