export const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const move1 = ({ attackingPokemon, defendingPokemon }) => {
  const recievedDamage = attackingPokemon.move1.dmg - defendingPokemon.health;

  const finalDamage = recievedDamage - defendingPokemon.defense / 2;

  return finalDamage;
};
export const move2 = ({ attackingPokemon, defendingPokemon }) => {
  const recievedDamage = attackingPokemon.move1.dmg - defendingPokemon.health;
    //logic will nee to be changed with switch of if statements depending on what the move does ex if the move does physical dmg it will target there defense stat if the move does special dmg it will target special defense stat if the move does not dmg but instead raises start or health only call to attacking pokemon
  const finalDamage = recievedDamage - defendingPokemon.defense / 2;

  return finalDamage;
};

export const move3 = ({ attackingPokemon, defendingPokemon }) => {
  const recievedDamage = attackingPokemon.move1.dmg - defendingPokemon.health;

  const finalDamage = recievedDamage - defendingPokemon.defense / 2;

  return finalDamage;
};

export const move4 = ({ attackingPokemon, defendingPokemon }) => {
  const recievedDamage = attackingPokemon.move1.dmg - defendingPokemon.health;

  const finalDamage = recievedDamage - defendingPokemon.defense / 2;

  return finalDamage;
};
