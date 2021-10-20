import "bulma/css/bulma.min.css";
import React from "react";

import Info from "./Info";
import Tetris from "./Tetris";
import NavBar from "./NavBar";
import Othello from "./Othello";

class App extends React.Component {
  render() {
    return (
      <>
        <span class="anchor" id="about"></span>
        <section className="section bg-grey">
          <Info />
        </section>
        <section className="section bg-white p-3" id="nav">
          <NavBar />
        </section>
        <span class="anchor" id="tetrisGame"></span>
        <section className="section bg-tetris">
          <Tetris />
        </section>
        <span class="anchor" id="othelloGame"></span>
        <section className="section bg-othello">
          <Othello />
        </section>
      </>
    );
  }
}

export default App;
