import React from "react";

import "./end.css";

const End = () => {
  return (
    <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-center items-center gap-3 h-screen">
      <div className="flex flew-wrap flex-col gap-3 items-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
        <a className="btn btn-primary">Play Again</a>
        <a className="btn btn-primary">Choose New Pokemon</a>
        <a className="btn btn-primary">Quit</a>
      </div>
    </div>
    // <div className="flex flex-wrap flex-row justify-center text-center h-screen">
    //   <div className="flex flex-wrap flex-col gap-3 items-center h-screen">
    //     <a className="btn btn-primary">Play Again</a>
    //     <a className="btn btn-primary">Choose New Pokemon</a>
    //     <a className="btn btn-primary">Quit</a>
    //   </div>
    // </div>
  );
};

export default End;
