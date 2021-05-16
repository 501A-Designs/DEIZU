import React,{useState, useRef, useEffect} from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase,{auth} from './firebase';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginEditor from './LoginEditor'
import WebEditor from './WebEditor';

function App() {
  const [user] = useAuthState(auth);
  const [state, setState] = useState('home');
  const dummy = useRef();

  function Home() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
      setState('loginEditor');
    }
    
    useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    })
    const webView = () => {
      setState('webEditor')
    }
  
    return (
      <div className="startMenu">
        <header>
          <div className="emoji">📅</div>
          <h1>Schedule Creator</h1>
        </header>
        <div className="cautionBanner">
        注意！スマートフォンまた小さいディスプレイご利用の場合は、時間割表作成に置いて画角における不具合がございます。ご了承下さい。
        </div>
        <section
          className="card"
          style={{ textAlign: 'center'}}
        >
          <p>
              Schedule Creator へようこそ！
              <br/><br/>
              無登録の場合はログイン！
              <br/>
              また、アカウント無しで使用したい場合はウェブエディターの使用をおすすめします。
              <br/>
              <br/>
          </p>
          <div className="centerBtn">
            {/* <button
                className="standardBtn greenBtn"
                onClick={signInWithGoogle}
            >
              Googleでログイン
            </button> */}
              <button
                className="standardBtn yellowBtn"
                onClick={webView}
              >
              ウェブエディター
            </button>
            <button
              className="standardBtn blueBtn"
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
              }}
            >
              サイトについて
            </button>
          </div>
        </section>
      </div>
    )
  }

  function ReloadAlert() {
    return (
      <div className="card">
        <p>メインページに戻るには本ページをリロードする必要がございます。</p>
      </div>
    )
  }
  

  return (
    <div className="App">
      {/* <Home/> */}
      {/* {state === 'home' ? <Home /> : null} */}
      {/* {user ? <LoginEditor /> : state === 'home'} */}
      {user ? <LoginEditor /> : <Home />}
      <span ref={dummy}></span>
      {state === 'webEditor' ? <WebEditor /> : null}
      <footer>
        {null && <ReloadAlert/>}
        <h4>Developed By 501A</h4>
        <p><a>利用規約</a> / <a href="https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3#6901e89aec474ca8843048a8b122387f">プライバシー</a></p>
      </footer>
    </div>
  );
}

export default App;
