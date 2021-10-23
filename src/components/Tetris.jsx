import React from "react";
import { loadTetris, startGame } from "../assets/scripts/tetrisGame";

class Tetris extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      error: "Loading...",
    };
    this.load();
  }

  load() {
    fetch(`/getTetrisRecords`, { method: "get", "no-cors": true })
      .then((res) => {
        let data = res.json();
        if (data.error) {
          this.setState({
            error: data.error,
          });
          return () => this.load();
        }
        return data;
      })
      .then((json) => {
        this.setState({
          records: json,
        });
      });
  }

  componentDidMount() {
    loadTetris();
  }

  render() {
    let { records, error } = this.state;
    return (
      <>
        <div className="container has-text-centered">
          <h2 className="is-size-2 has-text-white has-text-weight-semibold pb-4">
            Tetris Project
          </h2>
          <div className="columns">
            <div className="column is-half is-flex is-justify-content-end">
              <div className="tetris-container">
                <canvas id="tetris" width="302" height="500">
                  Your browser does not support the HTML canvas tag.
                </canvas>
                <div id="tetrisPaused" className="hero is-success">
                  <div className="hero-body columns is-vcentered">
                    <h3 className="is-size-3 has-text-white has-text-weight-semibold">
                      Game is Paused!
                    </h3>
                  </div>
                </div>
                <div className="container hero is-success" id="playerForm">
                  <div className="hero-body">
                    <div class="field">
                      <label class="label has-text-white is-size-4">
                        Enter your Name
                      </label>
                      <div class="control">
                        <input
                          id="playerName"
                          class="input"
                          type="text"
                          placeholder="Username"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <button class="button is-link" onClick={startGame}>
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-half has-text-left scoreboard">
              <p className="is-size-4 has-text-white">
                <span className="text">Name</span>
                <span className="mx-6"></span>
                <span className="text has-text-right">Score</span>
              </p>
              <hr />
              <p className="is-size-4 has-text-white">
                <span className="text" id="currentPlayer"></span>
                <span className="mx-6"></span>
                <span className="text has-text-right" id="currentScore"></span>
              </p>
              <hr />
              <p className="is-size-4 has-text-white has-text-center">
                Scoreboard
              </p>
              {records ? (
                records.map((record) => {
                  return (
                    <>
                      <p className="is-size-4 has-text-white">
                        <span className="text">{record.name}</span>
                        <span className="mx-6"></span>
                        <span className="text has-text-right">
                          {record.score}
                        </span>
                      </p>
                    </>
                  );
                })
              ) : (
                <p className="is-size-4 has-text-white">
                  <span className="text">{error}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tetris;
