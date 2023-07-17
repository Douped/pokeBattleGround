import React, { useEffect } from "react";
import BattleMenu from "./BattleMenu";
import BattleAnnouncer from "./BattleAnnouncer";
import { useState } from "react";
import { useBattleSequence } from "../../hooks/useBattleSequence";

const Battle = () => {
  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    userHealth,
    opponentHealth,
    announcerMessage,
    //playerAnimation,
    //opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

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
          onMove1={() => setSequence({ turn, mode: moveOne })}
          onMove2={() => setSequence({ turn, mode: moveTwo })}
          onMove3={() => setSequence({ turn, mode: moveThree })}
          onMove4={() => setSequence({ turn, mode: moveFour })}
        />
      </div>
    </>
  );
};

export default Battle;
