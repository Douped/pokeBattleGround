import React from "react";

import "./home.css";

const Home = () => {
  return (
    <>
      <div class="font-sans flex flex-row justify-center text-center rounded-lg border-2 bg-indigo-300/[0.3] ">
        First things first in order to play this fantastic game you must login
        to your previously made account, or make a new one by clicking either
        button at the top of your screen. You must first choose a pokemon to
        battle with for example Pikachu, afterwards you will be taken to a new
        page where you will be able to choose which 4 moves that the pokemon can
        learn. Once you choose you moves and click ont he button below you will
        be taken to another new page where you will battle vs and ai, the ai's
        pokemon and moves will be randomly choosen and so will its move
        selection in battle. You will choose between the 4 moves you want to use
        against the opponents pokemon until either pokemon faint/die, when you
        lose or win you will be taken to the end game page where you can choose
        to play again with the same pokemon, choose a new one, or quit where you
        will be sent to the hompage and logged out.
      </div>
      <div class="text-2xl font-bold font-sans flex flex-col justify-center text-center gap-2">
        Choose Your Pokemon
        <div class="flex flex-wrap flex-row gap-3 justify-center adjust">
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdwad</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dwadawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdwad</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dawdawd</div>
          <div class="basis-1/4 border-2 border-black rounded-lg">dwadawd</div>
        </div>
      </div>
    </>
  );
};

export default Home;
