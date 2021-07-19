import React, { useState, useEffect } from 'react'
import firebase,{ auth, db } from './firebase';
import {MdAddCircle,MdBackspace, MdList, MdCropFree, MdDescription, MdDirectionsRun, MdModeEdit } from 'react-icons/md';

import ScheduleGrid from './ScheduleGrid'
import { useAuthState } from 'react-firebase-hooks/auth';


export default function LoginEditor() {
  const [user] = useAuthState(auth);
  // const [state, setState] = useState('home');
  const [sheetsSideBar, setSheetsSideBar] = useState({ display: 'none' });
  const [settingsSideBar, setSettingsSideBar] = useState({ display: 'none' });

  const [otherSheets, setOtherSheets] = useState();
  
  const [titleName, setTitleValue] = useState('');
  
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  
  const dataRef = db.collection('users');

  const fullName = auth.currentUser.displayName;
  const firstName = fullName.split(" ")[0];

  const [screenshotFrame, setScreenshotFrame] = useState('');
  const [style, setStyle] = useState({ display: 'none' });

  // const saveTitle = async (e) => {
  //   e.preventDefault();
  //   dataRef.doc().set({
  //     title: titleName
  //   })
  //   setTitleValue('');
  // }
  const saveWallpaper = (w) => {
    w.preventDefault();
    dataRef.doc(user.uid).set({
        url: wallpaperUrl
    }, { merge: true });
    // setWallpaperUrl('');
  }



  const getSheetTitles = () => {
    dataRef.doc(user.uid).get().then((doc) => {
      const titleForOtherSheets = doc.data().sheets;
      const arrayTitle = Object.keys(titleForOtherSheets);
      setOtherSheets(arrayTitle);
    }).catch((error) => {
      console.log("Error getting document:", error);
    })
  }
  useEffect(()=>{
    dataRef.doc(user.uid).get().then((doc) => {
      const wallUrl = doc.data().url;
      setWallpaperUrl(wallUrl);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },[])

  function OtherSheet() {
    let itemsToRender;
    if (otherSheets) {
      itemsToRender = otherSheets.map(item => {
        return <section onClick={() => { setSheetsSideBar({ display: 'none' }); }}>
          <span onClick={() => setTitleValue(`${(item)}`)}>{item}</span><MdBackspace className="iconBtn" style={{ float: 'right' }} onClick={() => {
            alert('bruh');
            dataRef.doc(user.uid).update({
              [item]: firebase.firestore.FieldValue.delete()
            });
        }}/></section>;
      });
    } else {
      itemsToRender = "Loading...";
    }
    return <div>{itemsToRender}</div>;
  }

  return (
    <>
    {wallpaperUrl ? <img className="backgroundImg" src={wallpaperUrl} alt="壁紙は指定されていません" /> : null}
    <div className="loginEditor">
      {/* <Menu /> */}
      <section className="alignItems spaceBetween">
        <div className="alignItems">
          <input
              id="titleInput"
              type="text"
              placeholder="⚡スーパーインプット"
              value={titleName}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <button className="standardBtn greyBtn" onClick={() => { setSheetsSideBar({ display: 'block' }); getSheetTitles();}} dataTitle="他の表を閲覧">
            <MdList className="btnIcon" />
          </button>
            
          {/* CARD MODALS */}
          <div className="othersCard leftOthersCard" style={sheetsSideBar}>
            <div className="closeBtn">
              <button type="submit" onClick={() => setSheetsSideBar({ display: 'none' })}></button>
            </div>
              <button className="standardBtn greenBtn" dataTitle="新しい表を作成しても現在ある時間割は保存されるのでご安心下さい" onClick={() => { setTitleValue(''); setSheetsSideBar({ display: 'none' });}}><MdAddCircle className="iconBtn"/>新しい表</button>
              <OtherSheet/>
          </div>
        </div>
        <div className="loginStatus" onClick={() => setSettingsSideBar({ display: 'block' })}>
          <img alt="no" src={auth.currentUser.photoURL}></img>
          <h5>{firstName}さん</h5>
        </div>
        <div className="othersCard rightOthersCard" style={settingsSideBar}>
          <div className="closeBtn">
            <button type="submit" onClick={() => setSettingsSideBar({ display: 'none' })}></button>
          </div>
          <h3>アカウント情報</h3>
            <p>名前：{fullName}さん</p>
            <p>Eメール：{user.email}</p>  
            
          <div className="alignItems">    
            <img alt="no" src={auth.currentUser.photoURL}></img>
            <SignOut />
          </div>
          
          <h3>壁紙の変更</h3>
          <form onSubmit={saveWallpaper} className="">
            <input
              placeholder="URLリンク"
              value={wallpaperUrl}
              onChange={(w) => setWallpaperUrl(w.target.value)}
            ></input>
            <button type="submit" className="standardBtn greenBtn">保存</button>
          </form>
          {/* <h3>テーマの変更</h3>
          <div className="alignItems">
            <button className="standardBtn greyBtn">朝モード</button>
            <button className="standardBtn greyBtn">夜モード</button>
            <button className="standardBtn greyBtn">昼モード</button>
          </div> */}
          <h3>DEIZU</h3>
          <div className="alignItems">
            <button
              className="standardBtn blueBtn"
              formTarget="_blank"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
              }}
              >
              <MdDescription className="btnIcon" /> サイトについて
            </button>
            <button
                className="standardBtn greenBtn"
                formTarget="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
                }}
              >
              <MdModeEdit className="btnIcon" /> 最新情報
            </button>
          </div>
        </div>
      </section>
        
        <section className="alignItems spaceBetween">
          <h1>{titleName ? titleName : "タイトル追加・表を検索"}</h1>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              className="standardBtn greyBtn"
              onClick={() => {
                setStyle({ display: 'block' });
                setScreenshotFrame('screenshotMode');
                setSheetsSideBar({ display: 'none' });
                setSettingsSideBar({ display: 'none' });
              }}
            >
              <MdCropFree className="btnIcon" /><span className="eraseOnMobile"> スクショモード</span>
            </button>
          </div>
        </section>
        <div
          className="backdrop"
          style={style}
          onClick={() => {
            setStyle({ display: 'none' });
            setScreenshotFrame('');
          }
          }>
        </div>
        <section className={screenshotFrame} style={{overflowX: 'scroll'}}>
          <h1 className="screenshotTitle">{titleName}</h1>
          <ScheduleGrid sheetTitle={titleName} />
        </section>
      </div>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="standardBtn redBtn"
      onClick={() => {
        auth.signOut();
      }}>
      <MdDirectionsRun className="btnIcon" />
      ログアウト</button>
  )
}