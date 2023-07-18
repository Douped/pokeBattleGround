import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';


const Nav = () => {
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <>
      {Auth.loggedIn() ? (
        // Show the "Sign-Out" button when the user is logged in
        <Link onClick={handleLogout}>
          <div className="btn btn-primary">Sign out</div>
        </Link>
      ) : (
        // Show the "Sign-In" and "Register" buttons when the user is not logged in
        <>
          <Link to="/login">
            <div className="btn btn-primary">Login</div>
          </Link>
          <Link to="/sign-up">
            <div className="btn btn-primary">Sign-Up</div>
          </Link>
        </>
      )}
    </>
  );
};
export default Nav;
