import React from 'react'
import firebase, {auth} from './firebase';
import WebEditor from './WebEditor';


export default function Home() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    
    return (
      <div className="startMenu">
          <header>
            <div className="emoji">📅</div>
            <h1>Schedule Creator</h1>
          </header>
          <section
            className="card"
            style={{ textAlign: 'center', border: '1px solid lightgrey' }}
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
            <button
                className="standardBtn greenBtn"
                onClick={signInWithGoogle}
            >
              Googleでログイン
            </button>
              <button
                className="standardBtn yellowBtn"
                onClick={function () { <WebEditor /> }}
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
