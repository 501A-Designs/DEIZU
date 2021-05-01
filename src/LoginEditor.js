import React from 'react'
import firebase, {auth} from './firebase';

import ScheduleGrid from './ScheduleGrid'

export default function LoginEditor() {

    return (
      <>
        <button className="standardBtn yellowBtn">＝ 他の表</button>
        {/* <Menu /> */}
  
        <section className="headerGrid">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <h1>時間割を作成！</h1>
              <div className="headerBtn">
                <button className="standardBtn blueBtn">
                  サイトについて
                </button>
                <SignOut/>
              </div>
            </div>
          </div>
          <div id="profileInfo">
            <section>
              <div>
                <h3>{auth.currentUser.displayName}</h3>
                <time>こんばんわ</time>
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