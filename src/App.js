import React, { useState } from 'react';
import { MdReportProblem,MdPerson, MdDescription } from 'react-icons/md';

import './App.css';
import logo from './deizu.png';
import favicon from './deizuFavicon.png';

import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase, { auth } from './firebase';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginEditor from './LoginEditor'

function App() {
  const [user] = useAuthState(auth);
  const [state, setState] = useState('home');

  function Home() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
      setState('loginEditor');
    }

    return (
      <div className="startMenu">

        <section className="duoGrid">
          <div>
            <img className="logo" src={logo} alt="Logo" />
            <h2 className="versionBadge">Beta v2</h2>
          </div>
          <div>
            <section className="card">
              <div className="cautionBanner">
                <strong className="alignItems" style={{marginBottom: '10px'}}><MdReportProblem className="largeIcon" />注意</strong>
                <ul style={{ marginLeft: '-20px' }}>
                  <li>Schedule CreatorからDEIZUへと改名しました。</li>
                  <li>ベータ版ですので、機能の追加・切り替えによってデータの損失があるかも知れません。</li>
                  <li>スマートフォンまた小さいディスプレイご利用の場合は、時間割表作成に置いて画角における不具合がございます。ご了承下さい。</li>
                </ul>
              </div>
              <h1 className="classicHeader">時間割表をすばやく作成</h1>
              <p>
                DEIZUへようこそ！
                <br /><br />
                無登録の場合はログイン！
                <br />
                アカウント無しで使用したい場合はウェブエディターの使用をおすすめします。
                <br />
                <br />
              </p>
              <div className="centerBtn">
                <button
                  className="standardBtn greenBtn"
                  onClick={signInWithGoogle}
                >
                  <MdPerson className="btnIcon" />
                  Googleでログイン
                </button>
                <button
                  className="standardBtn blueBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
                  }}
                >
                  <MdDescription className="btnIcon" />
                  サイトについて
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="App">
      {user ? <LoginEditor /> : <Home />}
      <footer>
        <img src={logo} style={{ width: '80px', height: '58px' }}></img>
        <h4>Designed & Developed By 501A</h4>
      </footer>
    </div>
  );
}

export default App;
