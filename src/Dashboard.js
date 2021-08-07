import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {MdAddCircle,MdPhotoFilter,MdArrowBack} from 'react-icons/md';
import './App.css';

import { auth,db } from './firebase';
import LoginEditor from './LoginEditor'



export default function Dashboard() {
    const [component, setComponent] = useState(null);
    const [titleName, setTitleValue] = useState('');
    const [templateBtn, setTemplateBtn] = useState(null);
    
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
                    {templateBtn ? <Templates /> :
                        <div className="centerDiv">
                            <section className="card">
                                <h1 className="classicHeader">ダッシュボード</h1>
                                <p>{fullName}さん、DEIZUへようこそ！<br />こちらが{firstName}さんのDEIZUダッシュボードとなります。下のボタンで新しい時間割表を作成することができます。また、これまで作成した時間割表も閲覧し更新することができます！</p>
                                <br />
                                    <span className="alignItems">
                                        <button className="standardBtn greenBtn" onClick={() => { setComponent('change'); }}><MdAddCircle className="iconBtn" />新しい表を作成</button>
                                        <button className="standardBtn blueBtn" onClick={() => { setTemplateBtn('change'); }}><MdPhotoFilter className="iconBtn" />テンプレートで表を作成</button>
                                    </span>
                                <OtherSheet/>
                            </section>
                        </div>
                    }
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

function Templates() {
    const [time1S, setTime1S] = useState(null);
    const [time1E, setTime1E] = useState(null);
    const [time2S, setTime2S] = useState(null);
    const [time2E, setTime2E] = useState(null);
    const [time3S, setTime3S] = useState(null);
    const [time3E, setTime3E] = useState(null);
    const [time4S, setTime4S] = useState(null);
    const [time4E, setTime4E] = useState(null);
    const [time5S, setTime5S] = useState(null);
    const [time5E, setTime5E] = useState(null);
    const [time6S, setTime6S] = useState(null);
    const [time6E, setTime6E] = useState(null);
    const [time7S, setTime7S] = useState(null);
    const [time7E, setTime7E] = useState(null);
    const [selectTime, setSelectTime] = useState({ display: 'block' });
    const [selectClass, setSelectClass] = useState({display: 'none'});

    return (
        <div>
            <section className="card">
                <h1 className="classicHeader">テンプレートを選択</h1>
                <div className="templateSelector" style={selectTime}>
                    <h2>時間</h2>
                    <section className="duoGrid">
                        <div
                            className="selectorDiv"
                            onClick={() => {
                                setTime1S("08:40");
                                setTime1E("08:40");
                                setTime2S("08:40");
                                setTime2E("08:40");
                                setTime3S("08:40");
                                setTime3E("08:40");
                                setTime4S("08:40");
                                setTime4E("08:40");
                                setTime5S("08:40");
                                setTime5E("08:40");
                                setTime6S("08:40");
                                setTime6E("08:40");
                                setTime7S("08:40");
                                setTime7E("08:40");
                                setSelectTime({ display: 'none' });
                                setSelectClass({ display: 'block' });
                            }}
                        >
                            <h3>8:40~</h3>
                            <p>
                                このテンプレートは、1限が8:40分開始であり50分授業と10分休憩の区間（＋50分の昼休み）をとった時間割表を作成。
                            </p>
                        </div>
                        <div
                            className="selectorDiv"
                            onClick={() => {
                                setTime1S("09:00");
                                setTime1E("09:50");
                                setTime2S("10:00");
                                setTime2E("10:50");
                                setTime3S("11:00");
                                setTime3E("11:50");
                                setTime4S("12:00");
                                setTime4E("12:50");
                                setTime5S("13:40");
                                setTime5E("14:30");
                                setTime6S("14:40");
                                setTime6E("15:30");
                                setTime7S("15:40");
                                setTime7E("16:30");
                                setSelectTime({ display: 'none' });
                                setSelectClass({ display: 'block' });
                            }}
                        >
                            <h3>9:00~</h3>
                            <p>
                                このテンプレートは、1限が8:10分開始であり50分授業と10分休憩の区間をとった時間割表を作成。
                            </p>
                        </div>
                    </section>
                </div>

                <div className="templateSelector" style={selectClass}>
                    <button
                        className="standardBtn blueBtn iconBtn"
                        onClick={() => {
                            setTime1S(null);
                            setTime1E(null);
                            setTime2S(null);
                            setTime2E(null);
                            setTime3S(null);
                            setTime3E(null);
                            setTime4S(null);
                            setTime4E(null);
                            setTime5S(null);
                            setTime5E(null);
                            setTime6S(null);
                            setTime6E(null);
                            setTime7S(null);
                            setTime7E(null);
                            setSelectTime({ display: 'block' });
                            setSelectClass({ display: 'none' });
                        }}
                    >
                        <MdArrowBack />
                        戻る
                    </button>
                    <h2>科目パック</h2>
                    <h3>中学校</h3>
                    <section className="duoGrid">
                        <div className="selectorDiv">
                            <h3>普通科</h3>
                            <p>
                                英語、英会話、国語、理科①、理科②、数学①、数学②、社会、歴史、公民、体育、保険、等を含む。
                            </p>
                        </div>
                        <div className="selectorDiv">
                            <h3>IB：MYP</h3>
                            <p>
                                英語、英会話、国語、理科①、理科②、数学①、数学②、社会、歴史、公民、哲学対話、等を含む。
                            </p>
                        </div>
                    </section>
                    <h3>高校</h3>
                    <section className="duoGrid">
                        <div className="selectorDiv">
                            <h3>普通科</h3>
                            <p>
                                このテンプレートは、1限が8:40分開始であり50分授業と10分休憩の区間をとった時間割表を作成。
                            </p>
                        </div>
                        <div className="selectorDiv">
                            <h3>IB：DP</h3>
                            <p>
                                このテンプレートは、1限が8:10分開始であり50分授業と10分休憩の区間をとった時間割表を作成。
                            </p>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

