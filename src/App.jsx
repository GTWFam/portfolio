import React from "react";
import Info from "./Info";
import "bulma/css/bulma.min.css";

class App extends React.Component {
  render() {
    return (
      <>
        <section className="sections">
          <Info />
        </section>
      </>
    );
  }
}

export default App;
