import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/react-redux-firebase-app/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/react-redux-firebase-app/signin">Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
