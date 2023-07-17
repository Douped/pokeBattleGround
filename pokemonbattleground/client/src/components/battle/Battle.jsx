import React, { useEffect } from "react";
import BattleMenu from "./BattleMenu";
import { useState } from "react";

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
                id="opponentmaxHealth"
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
        <div className="flex flex-wrap flex-row border-2 border-black rounded-lg gap-3">
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

        {
          /* <BattleAnnouncer
          // message={
          //   announcerMessage ||
          //   "what will" +
          //     {
          //       /*enter pokemon name here*/
          //     } +
          //     "do?"
          // }
          // /> */
        }

        <BattleMenu
          onMove1={() => console.log("hi")}
          onMove2={() => console.log("hi")}
          onMove3={() => console.log("hi")}
          onMove4={() => console.log("hi")}
        />
      </div>
    </>
  );
};

export default Battle;
