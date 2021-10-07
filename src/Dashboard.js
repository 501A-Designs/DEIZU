import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {MdAddCircle,MdPhotoFilter,MdArrowBack} from 'react-icons/md';
import './App.css';

import { auth,db } from './firebase';
import LoginEditor from './LoginEditor'
import DeizuButton from './DeizuButton'



export default function Dashboard() {
    const [component, setComponent] = useState(null);
    const [titleName, setTitleValue] = useState('');
    
    function DashboardMenu() {
        const [user] = useAuthState(auth);
        const fullName = auth.currentUser.displayName;
        const firstName = fullName.split(" ")[0];
        const [otherSheets, setOtherSheets] = useState();

        const dataRef = db.collection('users');

        useEffect(() => {
            dataRef.doc(user.uid).get().then((doc) => {
                const titleForOtherSheets = doc.data().sheets;
                const arrayTitle = Object.keys(titleForOtherSheets);
                setOtherSheets(arrayTitle);
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        }, [])

        function OtherSheet() {
            let itemsToRender;
            if (otherSheets) {
                itemsToRender = otherSheets.map(item => {
                    return (
                        <section
                            key={item}
                            onClick={() => {
                                    setTitleValue(`${(item)}`);
                                    setComponent('change');
                                }
                            }
                        >
                            {item}
                        </section>
                    );
                });
            }else {
                itemsToRender = "作成した時間割表はありません";
            }
            return <section className="dashboardOthersheets">{itemsToRender}</section>;
        }

        return (
            <>
            <div className="dashMenu">
                <img alt="no" className="profileBackgroundImg" src={auth.currentUser.photoURL}/>
                <section className="duoGrid" style={{gap: '3em'}}>
                    <div className="centerDiv">
                        <img alt="no profile img found" className="profileImg" src={auth.currentUser.photoURL}/>
                        <h1 style={{ fontSize: '3.5em', marginBottom:'15px' }}>{firstName}さん</h1>
                            <h1>👋 こんにちわ</h1>
                    </div>
                    <div className="centerDiv">
                        <section className="card">
                            <h1 className="classicHeader">ダッシュボード</h1>
                            <p>{fullName}さん、DEIZUへようこそ！<br />こちらが{firstName}さんのDEIZUダッシュボードとなります。下のボタンで新しい時間割表を作成することができます。また、これまで作成した時間割表も閲覧し更新することができます！</p>
                            <br />
                                <span className="alignItems">
                                    <DeizuButton
                                        btnClass="greenBtn"
                                        btnClick={() => {setComponent('change')}}
                                        btnIcon={<MdAddCircle className="iconBtn" />}
                                        btnName="新しい表を作成"
                                    />
                                    {/* <button className="standardBtn blueBtn" onClick={() => { setTemplateBtn('change'); }}><MdPhotoFilter className="iconBtn" />テンプレートで表を作成</button> */}
                                </span>
                            <OtherSheet/>
                        </section>
                    </div>
                </section>
            </div>
            </>
        )
    }

    return (
        <>
            {component ? <LoginEditor dashSheetTitle={titleName} />: <DashboardMenu />}
        </>
    )
}
