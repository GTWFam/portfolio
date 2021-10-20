import React from "react";
import { loadTetris } from "../assets/scripts/tetrisGame";

class Tetris extends React.Component {
  componentDidMount() {
    loadTetris();
  }

  render() {
    return (
      <>
        <div className="container has-text-centered">
          <h2 className="is-subtitle is-size-2 has-text-black has-text-weight-semibold">
            Tetris Project
          </h2>
          <div className="columns">
            <div className="column is-half is-flex is-justify-content-end">
              <canvas id="tetris" width="300" height="500"></canvas>
            </div>
            <div className="column is-half is-flex is-justify-content-start">
              <p className="is-size-4 has-text-black">
                <span id="currentPlayer"></span>
                <span className="mx-6"></span>
                <span id="currentScore"></span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tetris;
