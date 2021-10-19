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
        <section className="section" id="nav">
          <NavBar />
        </section>
        <section className="section bg-tetris" id="tetris">
          <Tetris />
        </section>
      </>
    );
  }
}

export default App;
