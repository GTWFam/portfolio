import React from "react";
import { loadOthello } from "../assets/scripts/othelloGame";

class Othello extends React.Component {
  componentDidMount() {
    loadOthello();
  }
  render() {
    return (
      <>
        <div className="container has-text-centered">
          <h2 className="pb-4 is-size-2 has-text-black has-text-weight-semibold">
            Othello Project
          </h2>
          <div className="columns">
            <div className="column is-flex is-justify-content-center">
              <canvas id="othello" width="563" height="563"></canvas>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Othello;
