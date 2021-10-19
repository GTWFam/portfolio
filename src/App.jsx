import React from "react";
import Info from "./Info";
import Tetris from "./Tetris";

import "bulma/css/bulma.min.css";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <>
        <section className="section bg-grey pt-6" id="about">
          <Info />
        </section>
        <section className="section pt-6" id="nav">
          <NavBar />
        </section>
        <section className="section bg-tetris pt-6" id="tetrisGame">
          <Tetris />
        </section>
      </>
    );
  }
}

export default App;
