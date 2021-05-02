import React,{useState} from 'react'
import firebase, {auth} from './firebase';

import ScheduleGrid from './ScheduleGrid'
import OtherSheets from './OtherSheets'

export default function LoginEditor() {
  const [sheetsSideBar, setSheetsSideBar] = useState(false);
  
  const fullName = auth.currentUser.displayName;
  const firstName = fullName.split(" ")[0];


    return (
      <>
        <button
          className="standardBtn yellowBtn"
          onClick={() => setSheetsSideBar(true)}
        >＝ 他の表</button>
        <OtherSheets trigger={sheetsSideBar} setTrigger={setSheetsSideBar}></OtherSheets>
        
        {/* <Menu /> */}
  
        <section className="headerGrid">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <h1>時間割を作成！</h1>
              <div className="headerBtn">
                <button
                  className="standardBtn blueBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
                  }}
                >
                  サイトについて
                </button>
                <SignOut/>
              </div>
            </div>
          </div>
          <div id="profileInfo">
            <section>
              <div>
                <h3>👋 {firstName}さん、ようこそ</h3>
                <h4>{auth.currentUser.email}</h4>
              </div>
            </section>
            <img alt="no" src={auth.currentUser.photoURL}></img>
          </div>
        </section>
        <input id="titleInput" type="text" placeholder="タイトル" />
        <ScheduleGrid />
      </>
    )  
}

function SignOut() {
    return auth.currentUser && (
        <button className="standardBtn greenBtn" onClick={function () {auth.signOut();}}>ログアウト</button>
    )
}