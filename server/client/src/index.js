//responsible for redux/data setup
import  "materialize-css/dist/css/materialize.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import App from './components/App';
import reduxThunk from 'redux-thunk';

//all reducers inside here
const store=createStore(reducers,{},applyMiddleware(reduxThunk));
ReactDOM.render(
  //provider is a react component knoing how to reach changes to our redux store
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'));
