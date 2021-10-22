import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose,combineReducers} from 'redux'
import instituteReducer from './store/reducers/institute'
import userReducer from './store/reducers/user'
import adminReducer from './store/reducers/admin'
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootreducer = combineReducers({
  user:userReducer,
  institute:instituteReducer,
  admin:adminReducer
  
})
const store = createStore(rootreducer,composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
