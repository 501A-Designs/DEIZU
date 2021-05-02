import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {auth} from './firebase';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home'
import LoginEditor from './LoginEditor'

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {/* <Home/> */}
      {user ? <LoginEditor/>: <Home/>}
      
      <footer>
        <h4>Developed By 501A</h4>
        <p><a>利用規約</a> / <a href="https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3#6901e89aec474ca8843048a8b122387f">プライバシー</a></p>
      </footer>
    </div>
  );
}

export default App;
