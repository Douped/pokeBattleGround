import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Link to="/login">
        <div className="btn btn-primary">Login</div>
      </Link>
      <Link to="/sign-up">
        <div className="btn btn-primary">Sign-Up</div>
      </Link>
    </>
  );
};

export default Nav;
