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
        <p><a>利用規約</a> / <a>プライバシー</a></p>
      </footer>
    </div>
  );
}

export default App;
