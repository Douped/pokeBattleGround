import React from "react";

const End = () => {
  return (
    <div className="flex flex-wrap flex-row justify-center text-center">
      <div className="flex flex-wrap flex-col gap-3 items-center">
        <a className="btn btn-primary">Play Again</a>
        <a className="btn btn-primary">Choose New Pokemon</a>
        <a className="btn btn-primary">Quit</a>
      </div>
    </div>
  );
};

export default End;
