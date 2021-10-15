
import React from "react";
import Info from "./Info";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <Info />
      </>
    );
  }
}

export default App;
