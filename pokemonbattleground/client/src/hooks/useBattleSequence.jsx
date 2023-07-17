import React, { useEffect, useState } from "react";

export const useBattleSequence = (sequence) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [userHealth, setUserHealth] = useState(maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(maxHealth);

  const [announcerMessage, setAnnouncerMessage] = useState("");

  //   const [playerAnimation, setPlayerAnimation] = useState('static')used for anmations if we got time
  //   const [opponentAnimation, setOpponetAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence;
    if (mode) {
      const attackingPokemon = turn === 0 ? userPokemonStats : opponentStats;
      const defendingPokemon =
        turn === 0 ? opponentPokemonStats : userPokemonStats;

      switch (mode) {
        case moveOne:
          const action = move1({ attackingPokemon, defendingPokemon });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `attackingPokemon.name used attackingPokemon.move`
            );
            await wait(1000);

            // turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation("attack") for animations
            // await wait(100);
            // turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation("static") for animations
            // await wait(500);
            // turn === 0 ?  setOpponentAnimation("dmg") : setPlayerAnimation('dmg') for animations
            // await wait(750);
            // turn === 0 ?  setOpponentAnimation("static") : setPlayerAnimation('static') for animations
            //setAnnouncerMessage here based on super affective or not very affective if neutural move on
            turn === 0
              ? setOpponentHealth((health) => (health - dmg > 0 ? h - dmg : 0))
              : setUserHealth((health) => (health - dmg > 0 ? h - dmg : 0));
            await wait(2000);

            setAnnouncerMessage(`Now its pokemonOpponent.name turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        case moveTwo:
          const action2 = move2({ attackingPokemon, defendingPokemon });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `attackingPokemon.name used attackingPokemon.move`
            );
            await wait(1000);

            // turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation("attack") for animations
            // await wait(100);
            // turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation("static") for animations
            // await wait(500);
            // turn === 0 ?  setOpponentAnimation("dmg") : setPlayerAnimation('dmg') for animations
            // await wait(750);
            // turn === 0 ?  setOpponentAnimation("static") : setPlayerAnimation('static') for animations
            //setAnnouncerMessage here based on super affective or not very affective if neutural move on
            turn === 0
              ? setOpponentHealth((health) => (health - dmg > 0 ? h - dmg : 0))
              : setUserHealth((health) => (health - dmg > 0 ? h - dmg : 0));
            await wait(2000);

            setAnnouncerMessage(`Now its pokemonOpponent.name turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        case moveThree:
          const action3 = move3({ attackingPokemon, defendingPokemon });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `attackingPokemon.name used attackingPokemon.move`
            );
            await wait(1000);

            // turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation("attack") for animations
            // await wait(100);
            // turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation("static") for animations
            // await wait(500);
            // turn === 0 ?  setOpponentAnimation("dmg") : setPlayerAnimation('dmg') for animations
            // await wait(750);
            // turn === 0 ?  setOpponentAnimation("static") : setPlayerAnimation('static') for animations
            //setAnnouncerMessage here based on super affective or not very affective if neutural move on
            turn === 0
              ? setOpponentHealth((health) => (health - dmg > 0 ? h - dmg : 0))
              : setUserHealth((health) => (health - dmg > 0 ? h - dmg : 0));
            await wait(2000);

            setAnnouncerMessage(`Now its pokemonOpponent.name turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        case movefour:
          const action4 = move4({ attackingPokemon, defendingPokemon });
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `attackingPokemon.name used attackingPokemon.move`
            );
            await wait(1000);

            // turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation("attack") for animations
            // await wait(100);
            // turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation("static") for animations
            // await wait(500);
            // turn === 0 ?  setOpponentAnimation("dmg") : setPlayerAnimation('dmg') for animations
            // await wait(750);
            // turn === 0 ?  setOpponentAnimation("static") : setPlayerAnimation('static') for animations
            //setAnnouncerMessage here based on super affective or not very affective if neutural move on
            turn === 0
              ? setOpponentHealth((health) => (health - dmg > 0 ? h - dmg : 0))
              : setUserHealth((health) => (health - dmg > 0 ? h - dmg : 0));
            await wait(2000);

            setAnnouncerMessage(`Now its pokemonOpponent.name turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    userHealth,
    opponentHealth,
    announcerMessage,
    //playerAnimation,
    //opponentAnimation,
  };
};
