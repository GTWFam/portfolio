import "bulma/css/bulma.min.css";
import React from "react";

import Info from "./components/Info";
import Tetris from "./components/Tetris";
import NavBar from "./components/NavBar";
import Othello from "./components/Othello";

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
        <span class="anchor" id="othelloGame"></span>
        <section className="section has-background-primary-dark">
          <Othello />
        </section>
        <span class="anchor" id="oldWebsite"></span>
        <section className="section has-background-link-light">
          <iframe
            src="https://gtwfam.github.io/my_portfolio/"
            width="100%"
            height="750"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </section>
        <span class="anchor" id="finTracker"></span>
        <section className="section has-background-link-light">
          <h2 className="is-size-2 has-text-white has-text-weight-semibold pb-4">
            Financial Tracker
          </h2>
          <iframe src="https://gtwfin.herokuapp.com/" width="100%" height="750">
            <p>Your browser does not support iframes.</p>
          </iframe>
        </section>
        <span class="anchor" id="tetrisGame"></span>
        <section className="section has-background-info-dark">
          <Tetris />
        </section>
      </>
    );
  }
}

export default App;
