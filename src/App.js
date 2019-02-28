/* global gapi */
import React, { Component } from "react";

import "./App.css";
import { initApi } from "./api";

let _gapiInstance;

class App extends Component {

  sheetsScope   = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  discoveryDocs =  ['https://sheets.googleapis.com/$discovery/rest'];

  gapiInstance;

  state = {
    api: {},
    gapi: null,
    //
    googleClientId: '502850835553-j3o5ibcl36afeolu53biros5lsiqb7n5.apps.googleusercontent.com',
    googleAPIKey: 'AIzaSyBwZGu2suQnOkQWcYNlG0RiJffnhwJDtmg',
    //
    isSignedIn: false,

    //
    value: ""
  }

  // componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceeded}) {
  //   console.log(`Hallo`, isScriptLoaded, isScriptLoadSucceeded);
  //   if (isScriptLoaded && !this.props.isScriptLoaded) {
  //     if (isScriptLoadSucceeded) {
  //       this.loadGoogleApiAndAuth();
  //     }
  //   }
  // }

  componentWillMount() {
    console.log(`componentWillMount init api`);
    // initApi(api => {
    //   console.log(`did init api - some field stuff: `, api.field.getValue(), api.field);
    //   api.window.startAutoResizer();
    //   this.setState({
    //     value: api.field.getValue(),
    //     api: api
    //   });
    // });
  }

  componentDidMount() {
    // this.loadGoogleApi();
  //   const {isScriptLoaded, isScriptLoadSucceed} = this.props;
  //   if (isScriptLoaded && isScriptLoadSucceed) {
  //     this.loadGoogleApiAndAuth();
  //   }
  }

  loadGoogleApi = () => {
    console.log(`loadGoogleApi`);

    // const script = document.createElement('script');
    // script.src = 'https://apis.google.com/js/api.js';
    //
    // script.onload = () => {
    //   gapi.load('client:auth2', () => {
    //     console.log(`loaded the js now init api...`, gapi, this);
    //     this.initGoogleClient();
    //   });
    // }

    // document.body.appendChild(script);
    // gapi.load('client:auth2', () => {
    //   console.log(`GAPI LOAD`, gapi);
    //   this.initGoogleClient();
    // });
  }

  initGoogleClient = () => {
    setTimeout(() => {
      console.log(`initgabpi`, gapi);
      gapi.client.init({
        apiKey: this.state.googleAPIKey,
        clientId: this.state.googleClientId,
        discoveryDocs: this.discoveryDocs,
        scope: this.sheetsScope
      }).then(() => {
        console.log(`Hej Gabby`, gapi);

        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch(error => console.warn('gapi error', error));
    }, 100);
  }

  updateSigninStatus = isSignedIn => {
    console.log(`updateSigninStatus`, isSignedIn);
    this.getSheet();
    this.setState({isSignedIn});
  }

  signIn = () => gapi.auth2.getAuthInstance().signIn();

  signOut = () => gapi.auth2.getAuthInstance.signOut();

  getSheet = () => {
    gapi.client.sheets.spreadsheets.values.get(
      {
        spreadsheetId: '1W_djS-2yCbeRAW4ccuo1kCRD_mLc55f2hjM-hFtAmdI',
        range: 'apparel!A2:Y',
      }
    ).then(response => {
      console.log('GOT SHEET', response);
    })
  }

  handleClickUpdate = e => {
    const { api, value } = this.state;
    console.log('settings value to ', value);
    api.field.setValue(value)
      .then(result => console.log('setValue OK ', result))
      .catch(error => console.log('setValue Error ', error));
  };

  handleChangeValue = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="App">

        {
          this.state.isSignedIn
            ? <button onClick={this.signOut}>Sign Out</button>
            : <button onClick={this.signIn}>Authorize</button>
        }

        {/*<p>Hello this is our first ever Contentful UI Extension</p>*/}
        {/*<input*/}
          {/*className="cf-form-input"*/}
          {/*type="text"*/}
          {/*value={value}*/}
          {/*onChange={this.handleChangeValue}*/}
        {/*/>*/}
        {/*<button*/}
          {/*className="update-button cf-btn-primary"*/}
          {/*onClick={this.handleClickUpdate}*/}
        {/*>*/}
          {/*Update*/}
        {/*</button>*/}
      </div>
    );
  }
}

export default App;
