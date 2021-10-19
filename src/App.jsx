import React from "react";
import Info from "./Info";
import Tetris from "./Tetris";

import "bulma/css/bulma.min.css";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <>
        <section className="section bg-grey" id="about">
          <Info />
        </section>
        <section className="section bg-white p-3 sticky" id="nav">
          <NavBar />
        </section>
        <section className="section bg-tetris" id="tetrisGame">
          <Tetris />
        </section>
      </>
    );
  }
}

export default App;
