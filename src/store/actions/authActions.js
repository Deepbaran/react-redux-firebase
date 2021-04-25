export const signIn = Credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase(); // Initiate firebase

    firebase
      .auth()
      .signInWithEmailAndPassword(Credentials.email, Credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: 'SIGNOUT_SUCCESS' }));
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
      })
      .then(() => dispatch({ type: 'SIGNUP_SUCCESS' }))
      .catch(err => dispatch({ type: 'SIGNUP_ERROR', payload: err }));
  };
};

// getFirebase -> interact with firebase auth and generate new user
// getFirestore -> communicate with the firestore database

// if the collection is not present in the firebase, then firebase will automatically create it.
// res is the response returned
// add() automatically adds a id to the document. So, we are using doc() to assign a custom id to the document.
// after doc() we are using set() to set the data in the document.
