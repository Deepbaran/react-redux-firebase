/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    compose(
      compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(fbConfig, {
          userProfile: 'users', // This specifies, which collection in the firestore will be synced with the profile property.
          useFirestoreForProfile: true, // This will let the specified firestore collction sync with the profile property of the state object.
          attachAuthIsReady: true // This will make sure that firebase checks for authentication first
        }), // redux binding for firebase
        reduxFirestore(fbConfig) // redux bindings for firestore
      )
    )
  )
);

/*
// applyMiddleware is a store enhancer. We can have multiple store enhancer.
// thunk is a middleware that lies between dispatch and action.
// We pass thunk to applyMiddleware to add extra functionality.
// That functionality is now being that we can return a function inside our action creators which can then interact with the database.
// thunk middleware is now enhancing our store with extra functionality
// thunk holds the dispatch while the data is stored to the database, then it goes to action.
// So, thunk makes the redux asynchronous.
// withExtraArgument() allows us to add extra arguments as objects to thunk.

// reduxFirestore() is the store enhancers that we use to link getFirestore and getFirebase with the config file where the Firebase configuration is situated. In this way, we link redux with our firebase project and  getFirestore and getFirebase know, which firebase project to link to.
*/

// Render this to the DOM, after firebase authenticates if we are logged in or not.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      {/* The value passed to the store attribute will be passed to all the child elements and also to all the descendent elements */}
      <App />
    </Provider>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
