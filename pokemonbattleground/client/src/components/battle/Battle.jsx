import React from "react";

const Battle = () => {
  return (
    <>
      <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-end gap-3 h-screen">
        <div className="flex flex-wrap flex-row border-2 border-black rounded-lg justify-end gap-3">
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-end bg-slate-200 gap-2">
            <p>name</p>
            <p>
              HP
              <progress
                id="opponentHealth"
                value="100"
                max="100"
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
          <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-end">
            dwadawdwa
            <img></img>
          </div>
        </div>
        <div class="flex flex-wrap flex-row border-2 border-black rounded-lg gap-3">
          <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-end">
            dwadawdwa
            <img></img>
          </div>
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-end bg-slate-200 gap-2">
            <p>name</p>
            <p>
              HP
              <progress
                className="w-90%"
                id="opponentHealth"
                value="100"
                max="100"
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
        </div>
        <div class="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
          <h1>Random text</h1>
        </div>
        <div class="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
          <button className="btn basis-1/3">move 1</button>
          <button className="btn basis-1/3">move 1</button>
          <button className="btn basis-1/3">move 1</button>
          <button className="btn basis-1/3">move 1</button>
        </div>
      </div>
    </>
  );
};

export default Battle;
