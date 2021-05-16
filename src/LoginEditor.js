import React,{useState} from 'react'
import firebase, {auth, db} from './firebase';

import ScheduleGrid from './ScheduleGrid'
// import OtherSheets from './OtherSheets'

export default function LoginEditor() {
  // const [state, setState] = useState('home');

  const [sheetsSideBar, setSheetsSideBar] = useState(false);

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

  function UserInfo(props) {
    return (props.trigger) ? (
      <div id="sideBar" >
          <div className="closeBtn">
            <button onClick={() => props.setTrigger(false)}></button>
          </div>
            <h2>プロフィール</h2>
            <div id="profileInfo">
              <img alt="no" src={auth.currentUser.photoURL}></img>
              <section>
                <div>
                    <h3>👋 {firstName}さん、ようこそ</h3>
                    <h4>{auth.currentUser.email}</h4>
                </div>
              </section>
            </div>
            <SignOut />
            <button
              className="standardBtn blueBtn"
              formTarget="_blank"
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
              }}
            >
              サイトについて
            </button>
        </div>
    ) : "";
  }


    return (
      <>
        {/* <Menu /> */}
        <section className="headerGrid">
          <div style={{display:'flex', gap:'10px'}}>
            <h1>時間割を作成！</h1>
            {auth ? <h6 className="loginStatus" onClick={() => setSheetsSideBar(true)}></h6> : null}
          </div>
          <UserInfo trigger={sheetsSideBar} setTrigger={setSheetsSideBar}></UserInfo>

        </section>
        <div>
            <button
              className="standardBtn greenBtn"
              onClick={()=>{
                  setStyle({ display: 'block' });
                  setScreenshotFrame('screenshotMode');
                }
              }
            >
              スクショモード
            </button>
            <input
              id="titleInput"
              type="text"
              placeholder="タイトル"
              value={titleName}
              onChange={(e) => setTitleValue(e.target.value)}
            />
        </div>
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