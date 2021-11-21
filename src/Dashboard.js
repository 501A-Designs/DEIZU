import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {MdAddCircle,MdArrowBack} from 'react-icons/md';
import './App.css';

import { auth,db,root } from './firebase';
import LoginEditor from './LoginEditor'
import DeizuButton from './DeizuButton'



export default function Dashboard() {
    const [user] = useAuthState(auth);
    const dataRef = db.collection('users');
    const [component, setComponent] = useState(null);
    const [titleName, setTitleValue] = useState('');

    // Theme State
    const [dashSystemCornerStyle, setDashSystemCornerStyle] = useState(['5px','10px'])
    const [dashSystemColorStyle, setDashSystemColorStyle] = useState(
        [
            'white',
            '#ffecfc',
            '#f3f3f3',
            '#e2e2e2',
            'black'
        ]);

    useEffect(() => {
        root?.style.setProperty("--r5", dashSystemCornerStyle[0]);
        root?.style.setProperty("--r10", dashSystemCornerStyle[1]);
        root?.style.setProperty("--system0", dashSystemColorStyle[0]);
        root?.style.setProperty("--system1", dashSystemColorStyle[1]);
        root?.style.setProperty("--system2", dashSystemColorStyle[2]);
        root?.style.setProperty("--system3", dashSystemColorStyle[3]);
        root?.style.setProperty("--txtColor0", dashSystemColorStyle[4]);
    })
    useEffect(() => {
        dataRef.doc(user.uid).get().then((doc) => {
            const themeData = doc.data().theme;
            setDashSystemCornerStyle([themeData[0], themeData[1]]);
            const themeColorData = doc.data().themeColor;
            console.log(themeColorData[0]);
            setDashSystemColorStyle([
                themeColorData[0],
                themeColorData[1],
                themeColorData[2],
                themeColorData[3],
                themeColorData[4]
            ]);
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      },[])
    
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

        const date = new Date();
        // const day = date.getDay();
        const hinichi = date.getDate();
        const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        const currentDay = months[date.getMonth()]+hinichi+"日";

        return (
            <>
            <div className="dashMenu">
                <img alt="no" className="profileBackgroundImg" src={auth.currentUser.photoURL}/>
                <section className="duoGrid" style={{gap: '3em'}}>
                    <div className="centerDiv">
                        <h1 style={{ fontSize: '5.5em', margin: '0', color: 'var(--txtColor0' }}>{firstName}</h1>
                        <h2 style={{color: 'var(--txtColor0' }}>本日は{ currentDay}</h2>
                    </div>
                    <div className="centerDiv">
                        <section className="card">
                            <h1>ダッシュボード</h1>
                            <p>{fullName}さん、DEIZUへようこそ！<br />こちらが{firstName}さんのDEIZUダッシュボードとなります。下のボタンで新しい時間割表を作成することができます。また、これまで作成した時間割表も閲覧し更新することができます！</p>
                            <br />
                                <span className="alignItems">
                                    <DeizuButton
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
            {component ?
                <LoginEditor
                    systemCornerProp={dashSystemCornerStyle}
                    systemColorProp={dashSystemColorStyle}
                    dashSheetTitle={titleName}
                /> : <DashboardMenu />
            }
        </>
    )
}
