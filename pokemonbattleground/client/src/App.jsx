import React from "react";

import Battle from "./components/battle/Battle";
import EndScreen from "./components/endScreen/End";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Home";
import Moves from "./components/moves/Moves";

import "./style.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div className="flex-wrap">
          <Header />
          <div className="bg-Img">
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/moves" element={<Moves />}></Route>
              <Route exact path="/battle" element={<Battle />}></Route>
              <Route exact path="/end" element={<EndScreen />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
