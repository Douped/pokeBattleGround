import React from "react";

import "./end.css";

import { Link } from "react-router-dom";

const Defeat = () => {
  return (
    <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-center items-center gap-3 h-screen">
      <h1>You Lost!</h1>
      <div className="flex flew-wrap flex-col gap-3 items-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
        <Link to="/">
          <a className="btn btn-primary">Play Again!</a>
        </Link>
      </div>
    </div>
  );
};

export default Defeat;
