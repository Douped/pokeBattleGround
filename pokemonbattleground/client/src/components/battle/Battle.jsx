import React from "react";
import BattleMenu from "./BattleMenu";
import BattleAnnouncer from "./BattleAnnouncer";
import { useState } from "react";

const Battle = () => {
  const maxHealth = "100";

  const [userHealth, setUserHealth] = useState(maxHealth);

  const [opponentHealth, setOpponentHealth] = useState(maxHealth);

  const [announcerMessage, setAnnouncerMessage] = useState("");

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
                value={opponentHealth}
                max={maxHealth}
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
                value={userHealth}
                max={maxHealth}
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
        </div>

        <BattleAnnouncer
          message={
            announcerMessage ||
            "what will" +
              {
                /*enter pokemon name here*/
              } +
              "do?"
          }
        />

        <BattleMenu
          onMove1={() => console.log("move1")}
          onMove2={() => console.log("move2")}
          onMove3={() => console.log("move3")}
          onMove4={() => console.log("move4")}
        />
      </div>
    </>
  );
};

export default Battle;
