import React from "react";

const Battle = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row border-2 border-black rounded-lg justify-end gap-3">
        <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-end bg-slate-200 gap-2">
          <p>name</p>
          <p>
            HP : 100
            <progress id="opponentHealth" value="100" max="100"></progress>
          </p>
        </div>
        <div className="flex flex-wrap flex-col border-2 border-black rounded-lg justify-end">
          dwadawdwa
          <img></img>
        </div>
      </div>
      {/* <div class="flex flex-wrap flex-row border-2 border-black rounded-lg gap-3">
        dawdawdwa
      </div> */}
    </>
  );
};

export default Battle;
