import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    // console.log(this.props);
    const { projects, auth } = this.props;
    if (!auth.uid) {
      // Logged in users will have uid
      // If user is not logged in, then redirect them to the signin page
      // Hiding some pages from certain users is called Route Guarding
      return <Redirect to="/signin" />;
    }
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

/*
const mapStateToProps = state => {
  console.log(state);
  return {
    // projects: state.project.projects
    // state is the store that was passed from the index.js component.
    // state.project refers to the project property in the reducer object stored in store.
    // state.project.projects refers to the projects property where the project property of the reducer that was passed to store refers to.
  };
};
*/

const mapStateToProps = state => {
  console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    // state is the data returned from the firebase and ordered.projects gives an ordered list of projects collection.
    // Because that collection is connected to this component using the firestoreConnect HOC.
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'projects' }])
)(Dashboard);
// Connect is a HOC. react-redux is the glue library that glues react and redux.
// We will connect the Dashboard component with the redux store.

/* 
We are passing the store from the index.js component to all of it's descendants. But we cannot directly access the store.
We first need to use the mapStateToProps function, which will take a parameter state and return an object having the data that we need from the store. state parameter has all the data of the store.
Then we need to pass it to the HOC connect and pass the current component to connect. This will make sure that the object that mapStateToProps function returns, is passed to Dashboard as a props. And from there we can use the desired data from the store.
*/

/*
firestoreConnect is a HOC that specifies which collection to connect with this component.
From now on, whenever this component is active on the page, it will be synced up with the projects collection in firebase.
*/
