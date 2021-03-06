import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import {MdAddCircle} from 'react-icons/md';
import './App.css';

import { auth,db,root } from './firebase';
import LoginEditor from './LoginEditor'
import DeizuButton from './buttons/DeizuButton'



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
            '#ececec',
            '#dbdbdb',
            'black',
            'black',
            'white',
        ]);

    useEffect(() => {
        root?.style.setProperty("--r5", dashSystemCornerStyle[0]);
        root?.style.setProperty("--r10", dashSystemCornerStyle[1]);
        root?.style.setProperty("--system0", dashSystemColorStyle[0]);
        root?.style.setProperty("--system1", dashSystemColorStyle[1]);
        root?.style.setProperty("--system2", dashSystemColorStyle[2]);
        root?.style.setProperty("--system3", dashSystemColorStyle[3]);
        root?.style.setProperty("--txtColor0", dashSystemColorStyle[4]);
        root?.style.setProperty("--txtColor1", dashSystemColorStyle[5]);
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
                themeColorData[4],
                themeColorData[5],
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
                itemsToRender = "??????????????????????????????????????????";
            }
            return <section className="dashboardOthersheets">{itemsToRender}</section>;
        }

        const date = new Date();
        const hinichi = date.getDate();
        const months = ["1???","2???","3???","4???","5???","6???","7???","8???","9???","10???","11???","12???"];
        const currentDay = months[date.getMonth()]+hinichi+"???";

        return (
            <>
            <div className="dashMenu">
                <img alt="no" className="profileBackgroundImg" src={auth.currentUser.photoURL}/>
                <section className="duoGrid" style={{gap: '3em'}}>
                    <div className="centerDiv">
                        <h1 style={{ fontSize: '5.5em', margin: '0', color: 'var(--txtColor0' }}>{firstName}</h1>
                        <h2 style={{color: 'var(--txtColor0' }}>?????????{ currentDay}</h2>
                    </div>
                    <div className="centerDiv">
                        <section className="card">
                            <h1>?????????????????????</h1>
                            <p>{fullName}?????????DEIZU??????????????????<br />????????????{firstName}?????????DEIZU??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
                            <br />
                                <span className="alignItems">
                                    <DeizuButton
                                        btnClick={() => {setComponent('change')}}
                                        btnIcon={<MdAddCircle className="iconBtn" />}
                                        btnName="?????????????????????"
                                    />
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
