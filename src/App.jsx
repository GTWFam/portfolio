import "bulma/css/bulma.min.css";
import React from "react";

import Info from "./components/Info";
import Tetris from "./components/Tetris";
import NavBar from "./components/NavBar";
import Othello from "./components/Othello";
import FinTracker from "./components/FinTracker";

class App extends React.Component {
  render() {
    return (
      <>
        <span class="anchor" id="about"></span>
        <section className="section has-background-white-ter">
          <Info />
        </section>
        <section className="section has-background-info p-6" id="nav">
          <NavBar />
        </section>
        <span class="anchor" id="finTracker"></span>
        <section className="section has-background-link-light">
          <FinTracker />
        </section>
        <span class="anchor" id="tetrisGame"></span>
        <section className="section has-background-info-dark">
          <Tetris />
        </section>
        <span class="anchor" id="othelloGame"></span>
        <section className="section has-background-primary-dark">
          <Othello />
        </section>
      </>
    );
  }
}

export default App;
