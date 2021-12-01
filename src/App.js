import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { MdOutlineFlashOn,MdPerson, MdDescription } from 'react-icons/md';
import './App.css';
import logo from './img/deizuAppIconUpdated.png';

import firebase, { auth } from './firebase';
import Dashboard from './Dashboard'
import DeizuButton from './buttons/DeizuButton'

function App() {
  const [user] = useAuthState(auth);

  function Home() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return (
      <div className="startMenu">

        <section className="duoGrid">
          <div className="centerDiv">
            <img className="logo" src={logo} alt="Logo" />
          </div>
          <div>
            <section className="card">
              <div className="banner announceBanner">
                <strong className="alignItems" style={{marginBottom: '10px'}}><MdOutlineFlashOn className="largeIcon" />新規</strong>
                <ul style={{ marginLeft: '-20px' }}>
                  <li>2021年12月1日よりDEIZUのv1.0.0が一般公開されました（過去のバージョン情報はGitHubから見れます）</li>
                  <li>Zennにて開発に関する記事が投稿されました。</li>
                </ul>
              </div>
              {/* <div className="banner cautionBanner">
                <strong className="alignItems" style={{marginBottom: '10px'}}><MdReportProblem className="largeIcon" />注意</strong>
                <ul style={{ marginLeft: '-20px' }}>
                  <li>ベータ版ですので、機能の追加・切り替えによってデータの損失があるかも知れません。</li>
                  <li>スマートフォンまた小さいディスプレイご利用の場合は、時間割表作成に置いて画角における不具合がございます。ご了承下さい。</li>
                </ul>
              </div> */}
              <h1 >時間割表をすばやく作成</h1>
              <p>
                DEIZUへようこそ！
                <br />
                <br />
                時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインと共に紙で作成するマニュアルなプロセスやスプレッドシートやExcelを使用する際にテンプレートを作成する作業を全て排除します！
              </p>
              <div className="centerBtn">
                <DeizuButton
                  btnClick={signInWithGoogle}
                  btnIcon={<MdPerson className="btnIcon" />}
                  btnName="Googleでログイン" />
                <DeizuButton
                  btnClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'https://deizu.vercel.app/';
                  }}
                  btnIcon={<MdDescription className="btnIcon" />}
                  btnName="サイトについて" />
              </div>
              <hr/>
              <div className="versionSegment">
                <h3 className="versionBadge">v{require('../package.json').version}</h3>
                <a href="https://501a.netlify.app/" target="_blank" rel="noreferrer"><img src="https://501a.netlify.app/images/profileLogo.png" style={{ width: '40px', height: '40px' }} alt="no img found"/></a>
              </div>
            </section>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="App">
      {user ? <Dashboard /> : <Home />}
    </div>
  );
}

export default App;
