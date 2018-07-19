
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducers/wrapper";
import React, { Component } from 'react';

export default class ReduxWrapper extends Component {  
    render() {
      return (
       <Provider store= {store}>
       <App/> 
      </Provider>                
      );
    }
  }
