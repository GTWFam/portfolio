import "bulma/css/bulma.min.css";
import React from "react";

import Info from "./components/Info";
import Tetris from "./components/Tetris";
import NavBar from "./components/NavBar";
import GA4React from "ga-4-react";

class App extends React.Component {
  componentDidMount() {
    fetch(`/getTetrisRecords`, { method: "get", "no-cors": true })
      .then((res) => res.json())
      .then((data) => {
        const ga4react = new GA4React(data.GA_CODE);
        ga4react.initialize().then(
          (ga4) => {
            ga4.pageview(window.location.pathname + window.location.search);
          },
          (err) => {
            console.error(err);
          }
        );
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
