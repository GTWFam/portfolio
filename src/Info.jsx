import React from "react";
import ReactTypingEffect from "react-typing-effect";

class Info extends React.Component {
  render() {
    return (
      <>
        <h1>
          Hi, I am{" "}
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
      </>
    );
  }
}

export default Info;
