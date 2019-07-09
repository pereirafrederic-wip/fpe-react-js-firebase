import React, { Component } from 'react';
import { render } from 'react-dom';
import User from './User';
import Connexion from './Connexion'
import './style.css';
import "bootstrap/dist/css/bootstrap.css";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCzqX9SWPMLqy1_s49XfBD3h3XUMEUByPM",
  authDomain: "fpe-react-ts-firebase.firebaseapp.com",
  databaseURL: "https://fpe-react-ts-firebase.firebaseio.com",
  projectId: "fpe-react-ts-firebase",
  storageBucket: "",
  messagingSenderId: "850471451621",
  appId: "1:850471451621:web:48a5cc17ca80d389"
};

// Initialize Firebase

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig);
  }





  render() {
    const { developers } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className='col-xl-12'>
            <h1>Equipe : </h1>
          </div>
        </div>
        <User />
        <hr />
        <hr />
        <Connexion />


      </div>

    );
  }
}

render(<App />, document.getElementById('root'));
