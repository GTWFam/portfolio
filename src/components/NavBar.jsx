import React from "react";
import { MemoryRouter } from "react-router";
import { HashLink as Link } from "react-router-hash-link";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.nothing = this.nothing.bind(this);
  }
  nothing() {
    console.log("here");
    return false;
  }
  render() {
    return (
      <>
        <div className="container is-flex is-justify-content-center is-align-content-center">
          <div className="columns">
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#about"
                  className="button is-info is-light is-large"
                >
                  About
                </Link>
              </MemoryRouter>
            </div>
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#finTracker"
                  className="button is-info is-light is-large"
                >
                  FinTracker
                </Link>
              </MemoryRouter>
            </div>
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#tetrisGame"
                  className="button is-info is-light is-large"
                >
                  Tetris
                </Link>
              </MemoryRouter>
            </div>
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#othelloGame"
                  className="button is-info is-light is-large"
                >
                  Othello
                </Link>
              </MemoryRouter>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NavBar;
