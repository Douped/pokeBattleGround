import React from "react";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Battle from "./components/battle/Battle";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/homepage/Home";
import Moves from "./components/moves/Moves";
import Login from "./components/login/Login";
import Sign from "./components/sign-up/Sign";
import Auth from "./utils/auth";
import Defeat from "./components/defeat/Defeat";
import Win from "./components/win/Win";

import "./style.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const token = Auth.loggedIn() ? Auth.getToken() : null;
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: token,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-wrap">
          <Header />
          <div className="bg-Img">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Sign />}></Route>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/moves/:pokemonID" element={<Moves />}></Route>
              <Route exact path="/battle" element={<Battle />}></Route>
              <Route exact path="/win" element={<Win />}></Route>
              <Route exact path="/defeat" element={<Defeat />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
