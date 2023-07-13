import React from "react";

import Nav from "./Nav";

import "./buttons.css";

const Header = () => {
  return (
    <>
      <header>
        <div class="text-4xl font-sans font-bold flex flex-row bg-indigo-300 justify-center">
          Pokemon Showdown
        </div>
      </header>
      <div class="font-sans font-bold flex flex-row bg-indigo-300 justify-center buttons gap-2">
        <Nav />
      </div>
    </>
  );
};

export default Header;
