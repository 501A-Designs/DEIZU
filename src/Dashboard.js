import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {MdAddCircle,MdPhotoFilter} from 'react-icons/md';
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
                    <div>
                        <img alt="no profile img found" className="profileImg" src={auth.currentUser.photoURL}/>
                        <h1 style={{ fontSize: '3.5em', marginBottom:'15px' }}>{firstName}さん</h1>
                        <h1>👋 こんにちわ</h1>
                    </div>
                    {templateBtn ? <Templates /> :
                        <div>
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
    return (
        <div>
            <section className="card">
                <h1 className="classicHeader">テンプレートを選択</h1>
                <h2>時間</h2>
                <section className="duoGrid">
                    <div className="selectorDiv">
                        <h3>8:40~</h3>
                        <p>
                            このテンプレートは、1限が8:40分開始であり50分授業と10分休憩の区間をとった時間割表を作成。
                        </p>
                    </div>
                    <div className="selectorDiv">
                        <h3>9:00~</h3>
                        <p>
                            このテンプレートは、1限が8:10分開始であり50分授業と10分休憩の区間をとった時間割表を作成。
                        </p>
                    </div>
                </section>

                <h2>科目パック</h2>
                <details>
                    <summary>
                        中学校
                    </summary>
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
                </details>
                <details>
                    <summary>
                        高校
                    </summary>
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
                </details>
                {/* </section> */}

                <br/>
                <button className="standardBtn blueBtn">時間割表を作成</button>
                {/* <OtherSheet/> */}
            </section>
        </div>
    )
}

