import React from "react";
import { loadOthello } from "./othelloGame.js";

class Othello extends React.Component {
  componentDidMount() {
    loadOthello();
  }
  render() {
    return (
      <>
        <div className="container has-text-centered">
          <h2 className="is-subtitle is-size-2 has-text-black has-text-weight-semibold">
            Othello Project
          </h2>
          <div className="columns">
            <div className="column is-flex is-justify-content-center">
              <canvas id="othello" width="500" height="500"></canvas>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Othello;
