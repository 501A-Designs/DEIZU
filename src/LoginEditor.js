import React,{useState} from 'react'
import firebase, {auth, db} from './firebase';

import ScheduleGrid from './ScheduleGrid'
// import OtherSheets from './OtherSheets'

export default function LoginEditor() {
  // const [state, setState] = useState('home');
  const [titleName, setTitleValue] = useState('');
  const dataRef = db.collection('users');
  
  const fullName = auth.currentUser.displayName;
  const firstName = fullName.split(" ")[0];
  
  const [screenshotFrame, setScreenshotFrame] = useState('');
  const [style, setStyle] = useState({ display: 'none' });

  
  const saveTitle = async (e) => {
    e.preventDefault();
    dataRef.doc().set({
      title: titleName
    })
    setTitleValue('');
  }
  
    return (
      <>
        {/* <Menu /> */}
        <section className="alignItems spaceBetween">
          <h1>時間割を作成！</h1>
          <div className="loginStatus">
            <img alt="no" src={auth.currentUser.photoURL}></img>
            <h5>{firstName}さん</h5>
          </div>
        </section>
        <section className="alignItems spaceBetween">
          <input
            id="titleInput"
            type="text"
            placeholder="タイトル"
            value={titleName}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <div style={{display:'flex', gap: '5px'}}>
            <button
              className="standardBtn greenBtn"
              onClick={()=>{
                  setStyle({ display: 'block' });
                  setScreenshotFrame('screenshotMode');
                }
              }
            >
              📱 スクショモード
            </button>
            <button
              className="standardBtn blueBtn"
              formTarget="_blank"
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
              }}
            >
              📆 サイトについて
            </button>
            <SignOut />
          </div>
        </section>
        <div
          className="backdrop"
          style={style}
          onClick={() => {
              setStyle({ display: 'none' });
              setScreenshotFrame('');
            }
          }></div>
        <section className={screenshotFrame}>
          <h1 className="screenshotTitle">{titleName}</h1>
          <ScheduleGrid />
        </section>
      </>
    )  
}

function SignOut() {
    return auth.currentUser && (
      <button className="standardBtn redBtn"
        onClick={() => {
          auth.signOut();
        }}>
      ログアウト</button>
    )
}