import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Link to="/login">
        <a className="btn btn-primary">Login</a>
      </Link>
      <Link to="/sign-up">
        <a className="btn btn-primary">Sign-Up</a>
      </Link>
    </>
  );
};

export default Nav;
