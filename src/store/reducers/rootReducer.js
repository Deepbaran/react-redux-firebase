import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

/*
In the background, firestoreReducer will sync the state object(store) to our database in the firebase.
It will retrieve the data for us and that data will depend on which component is currently active and what data that component needs, that data will be synced in the state by this reducer. 
We need to tell firestoreReducer what data to be retrieved. The retrieved data will be placed in the firestore property on the state object.
Now we can access the sync data from the firestore property of the state object.
*/

/*
firebaseReducer will sync firebase information. including authentication.
Now, this firebaseReducer will sync the firebase auth with our redux and store it in the firebase property of the state object.
*/
