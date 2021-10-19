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
        <div className="navbar container is-flex is-justify-content-center is-align-content-center">
          <div className="columns">
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#about"
                  className="button is-info is-light is-medium"
                >
                  About
                </Link>
              </MemoryRouter>
            </div>
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#nav"
                  className="button is-info is-light is-medium"
                >
                  Navigation
                </Link>
              </MemoryRouter>
            </div>
            <div className="column">
              <MemoryRouter>
                <Link
                  smooth
                  to="#tetrisGame"
                  className="button is-info is-light is-medium"
                >
                  Tetris
                </Link>
              </MemoryRouter>
            </div>
          </div>
        </div>
      </>
    );
  }

  //   render() {
  //     return (
  //       <>
  //         <div className="navbar container is-flex is-justify-content-center is-align-content-center">
  //           <div className="columns">
  //             <div className="column">
  //               <a
  //                 href="#about"
  //                 className="button is-info is-light is-large"
  //                 onClick={this.nothing}
  //               >
  //                 About
  //               </a>
  //             </div>
  //             <div className="column">
  //               <a
  //                 href="#nav"
  //                 className="button is-info is-light is-large"
  //                 onClick={this.nothing}
  //               >
  //                 Navigation
  //               </a>
  //             </div>
  //             <div className="column">
  //               <a
  //                 href="#tetris"
  //                 className="button is-info is-light is-large"
  //                 onClick={this.nothing}
  //               >
  //                 Tetris
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
}

export default NavBar;
