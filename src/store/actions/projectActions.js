export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore(); // Reference to the firestore database
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('projects')
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT', payload: project });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR', payload: err });
      });
  };
};

/*
Thunk allows actrions to return a function instead of an object.
the function takes two parameters, dispatch and getState.
The dispatch parameter is the one that dispatches the action to the reducer.
When we call a action using the dispatch, we are returning a function and we are retaining that dispatch.
We are not returning the action anymore, just the function.
we are getting the parameter { getFirebase, getFirestore } because we added extra arguments with thunk.

STEPS:
1. We call the dispatch with an action
2. We hold the dipatch and return a function having the dispatch.
3. We do something (In this case, async call to database)
4. Then carry on with the dispatch of the function that was returned
5. The action is dispatched to the reducer
6. store is updated
*/

/*
firestore.collection('projects').add({}) adds the passed object, to the collection specified, in the firebase.
It is asynchronous.
*/
