import "bulma/css/bulma.min.css";
import React from "react";

import Info from "./components/Info";
import Tetris from "./components/Tetris";
import NavBar from "./components/NavBar";
import ReactGA from "react-ga";

class App extends React.Component {
  componentDidMount() {
    fetch(`/getGACode`, { method: "get", "no-cors": true })
      .then((res) => {
        let json = res.json();
        return json;
      })
      .then((data) => {
        console.log(data.GA_UA_CODE);
        ReactGA.initialize(data.GA_UA_CODE);
        ReactGA.pageview(window.location.pathname + window.location.search);
      });
  }

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
        <section className="section has-background-link-light has-text-centered">
          <h2 className="is-size-2 has-text-black has-text-weight-semibold pb-4">
            Financial Tracker
          </h2>
          <iframe src="https://gtwfin.herokuapp.com/" width="100%" height="750">
            <p>Your browser does not support iframes.</p>
          </iframe>
        </section>
        <span class="anchor" id="othelloGame"></span>
        <section className="section has-background-primary-dark has-text-centered">
          <h2 className="is-size-2 has-text-black has-text-weight-semibold pb-4">
            Othello
          </h2>
          <iframe
            src="https://ppham-othello.herokuapp.com/"
            width="100%"
            height="750"
          >
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
