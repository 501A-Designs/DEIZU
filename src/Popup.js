import React,{useState} from 'react'

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from './firebase';

export default function Popup(props) {
    const [user] = useAuthState(auth);
    const [subjectName, setSubjectValue] = useState('');
    const dataRef = db.collection('users');

    const saveSubject = async (e) => {
        e.preventDefault();
        dataRef.doc().set({
          subject: subjectName
        })
        setSubjectValue('');
    }

    return (props.trigger) ? (

        <section className="popupBack">
            <div className="popup">
                <button
                    className="closeBtn"
                    onClick={() => props.setTrigger(false)}
                >Close</button>
                <section>
                    <div className="colors">
                        <h4>色を選択：</h4>
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
                        {user ?
                            <div>
                                <input
                                    type="text"
                                    className="popupInput"
                                    placeholder="リンク"
                                />
                            </div>: null}
                        <button type="submit">Save</button>
                    
                    </form>
                    {/* <section className="inputGrid">
                        <div>
                            <input
                                value={subjectName}
                                type="text"
                                className="popupInput"
                                placeholder="科目名"

                            />
                        </div>
                        {user ?
                            <div>
                                <input
                                    type="text"
                                    className="popupInput"
                                    placeholder="リンク"
                                />
                            </div>: null}
                    </section> */}
                </section>
                
                <h2 className="displayTitle"></h2>
            </div>
        </section>
    ) : "";
}

