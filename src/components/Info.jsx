import React from "react";
import ReactTypingEffect from "react-typing-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

class Info extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-flex is-justify-content-center">
              <figure className="image">
                <img
                  className="is-rounded"
                  src="../assets/images/Profile.jpg"
                  width="300"
                  height="300"
                  style={{ width: "unset" }}
                />
              </figure>
            </div>
            <div className="column">
              <h1 className="title is-size-1 has-text-black">
                Hi there, I am{" "}
                <ReactTypingEffect
                  text={["Bill", "Hoang"]}
                  displayTextRenderer={(text) => {
                    let name_color = "#2665AE";
                    if ("Bill".includes(text)) {
                      name_color = "#159b80";
                    }
                    return <span style={{ color: name_color }}> {text}</span>;
                  }}
                  eraseDelay={2000}
                  typingDelay={1000}
                  eraseSpeed={100}
                />
              </h1>
              <div className="columns">
                <div className="column">
                  <a
                    href="https://github.com/GTWFam"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon color="black" icon={faGithub} size="3x" />
                  </a>
                </div>
                <div className="column">
                  <a
                    href="https://www.linkedin.com/in/gtwfam/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      color="black"
                      icon={faLinkedin}
                      size="3x"
                    />
                  </a>
                </div>
                <div className="column">
                  <a
                    href="https://www.instagram.com/gtwfam/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      color="black"
                      icon={faInstagram}
                      size="3x"
                    />
                  </a>
                </div>
                <div className="column">
                  <a
                    href="https://www.facebook.com/hoang.phamphan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      color="black"
                      icon={faFacebook}
                      size="3x"
                    />
                  </a>
                </div>
                <div className="column is-half"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Info;
