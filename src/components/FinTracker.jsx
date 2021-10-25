import React from "react";
import FinMonths from "./FinMonths";

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class FinTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      username: "",
      entries: [],
      currMonth: "",
      income: 0,
      outcome: 0,
      net: 0,
    };
    this.load();
  }

  load() {
    const d = new Date();
    let monthNum = d.getMonth();
    const { userID } = this.state;
    let reqUri =
      userID === ""
        ? "/getFinData?userID=6176d2f8b45230ad092b9c2c"
        : `/getFinData?userID=${userID}`;
    fetch(reqUri, { method: "get", "no-cors": true })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          currMonth: monthArr[monthNum],
          username: json["username"],
          entries: json["entries"],
        });
      });
  }

  render() {
    const { userID, currMonth, entries, income, outcome, net } = this.state;
    return (
      <>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <h2 className="pb-4 is-size-2 has-text-black has-text-weight-semibold">
                Financial Tracker Project
              </h2>
            </div>
            <div className="column"></div>
            <div className="column is-1">
              {userID === "" ? (
                <>
                  <button className="button is-success is-outlined">
                    Log In
                  </button>
                </>
              ) : (
                <>
                  <button className="button is-danger is-outlined">
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
          {currMonth === "" ? (
            <>
              <p className="is-size-4 has-text-black">Loading...</p>
            </>
          ) : (
            <>
              <div className="columns">
                <div className="column">
                  <h3 className="is-size-3 has-text-black">{currMonth}</h3>
                  <p>
                    <span>Income: {income}</span>
                    <br />
                    <span>Outcome: {outcome}</span>
                    <br />
                    <span>Net: {net}</span>
                  </p>
                </div>
                <div className="column"></div>
              </div>
              <div className="columns">
                <div className="column is-full">
                  <FinMonths
                    monthArr={monthArr}
                    currMonth={currMonth}
                    entries={entries}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default FinTracker;
