
import React, { Component, Fragment } from 'react';

import firebase from 'firebase';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
export default class Connexion extends Component {
  constructor() {
    super();
    this.state = {
      auth: null,
      email: '',
      password: '',
      error: null
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);


    this.signOut = this.signOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    firebase.auth().onAuthStateChanged(function (user) {
      console.log('onAuthStateChanged', user)
      if (user) {
        console.log('set User', user)
      } else {
        // No user is signed in.
        console.log('stop User')
      }
    });

  }

  componentDidMount() {

  }


  signOut() {
    firebase.auth().signOut();
    this.setState({ auth: null });
  }

  handleChangeEmail(event) {
    const { value } = event.target
    this.setState({ email: value });

  }

  handleChangePassword(event) {
    const { value } = event.target
    this.setState({ password: value });

  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state

    const here = this;

    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
            (data) => {
              resolve();
              here.setState({ auth: data.user });
              console.log('connected', data)
            },
            (error) => {
              reject(error);
              here.setState({ error: error, auth: null })
              console.log('connect error')
            }
          );
      }
    )
  }

  renderToat(error) {


    return (<div className="p-3 my-2 rounded"><Toast>
      <ToastHeader>
        {`erreur de connexion ${error.code}`}
      </ToastHeader>
      <ToastBody>
        {error.message}
      </ToastBody>
    </Toast></div>)
  }

  render() {

    const { auth, email, password, error } = this.state

    console.log('test', auth);
    if (auth)
      return (<div >

        <h1>connecté !</h1>
        <button type="button" className="btn btn-primary" onClick={this.signOut}>se deconnecter</button>
      </div>)


    return (<div className='row'>
      <div className='col-xl-12'>
        <h1>Connectez vous</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <input type='hidden' ref='uid' />
            <div className="form-group col-md-6">
              <label>Email</label>
              <input type="text" ref='email' className="form-control" placeholder="Email"
                value={email} onChange={this.handleChangeEmail} />
            </div>
            <div className="form-group col-md-6">
              <label>password</label>
              <input type="text" ref='password' className="form-control" placeholder="password"
                value={password} onChange={this.handleChangePassword} />
            </div>
          </div>
          {error && this.renderToat(error)}
          <button type="submit" className="btn btn-primary">se connecter</button>
        </form>
      </div>
    </div>)
  }

}