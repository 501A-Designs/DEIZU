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
          <h1>
            📅 Schedule Creator
          </h1>
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
              onClick="http://y-com.jp/"
            >
              サイトについて
            </button>
          </div>    
        </section>
      </div>
    )
}
