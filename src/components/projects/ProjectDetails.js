import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ProjectDetails = props => {
  // const id = props.match.params.id; // props.match is the props that React Router passed.
  // params.id is the route parameter that we are using to identify the specifi route.
  // If we put mario in place of :id in the url, then we will get the value mario in props.match.params.id
  // If we put 3 in place of :id in the url, then we will get the value 3 in props.match.params.id

  const { project, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }
  console.log(props);
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {project.authorFirstName} {project.authorLastName}
            </div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // ownProps is the default props of the component before we attach anything to it.
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  // This firestore corresponds to the firestore property of the state object whose value is firestoreReducer
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'projects' }])
)(ProjectDetails);

/*
Here we needed to define which collection to connect with this component, so we are using firestoreConnect HOC along with the connect HOC that connects the component with redux state.
*/
