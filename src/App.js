import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              path="/react-redux-firebase-app"
              component={Dashboard}
              exact
            />
            {/* We need to put exact because /project/:id also have / in its url. So, unless and until we put exact, the router will
            keep routing to Dashboard. Router routes to the shortest matching url if exact is not given (IMO) */}
            <Route
              path="/react-redux-firebase-app/project/:id"
              component={ProjectDetails}
              exact
            />
            {/*\:id is the route parameter*/}
            {/*When we attach a component to React Router, the react router attaches some default props to the component.*/}
            <Route path="/react-redux-firebase-app/signin" component={SignIn} />
            <Route path="/react-redux-firebase-app/signup" component={SignUp} />
            <Route
              path="/react-redux-firebase-app/create"
              component={CreateProject}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
