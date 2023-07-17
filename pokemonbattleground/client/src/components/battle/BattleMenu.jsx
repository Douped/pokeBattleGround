import React from "react";

const BattleMenu = ({ onMove1, onMove2, onMove3, onMove4 }) => {
  return (
    <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
      <button onClick={onMove1} className="btn basis-1/3">
        move 1
      </button>
      <button onClick={onMove2} className="btn basis-1/3">
        move 2
      </button>
      <button onClick={onMove3} className="btn basis-1/3">
        move 3
      </button>
      <button onClick={onMove4} className="btn basis-1/3">
        move 4
      </button>
    </div>
  );
};

export default BattleMenu;
