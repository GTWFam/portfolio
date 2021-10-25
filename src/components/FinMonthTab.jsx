import React from "react";
import { loadFinTrack } from "../assets/scripts/finTrackScript";

class FinMonthTab extends React.Component {
  componentDidMount() {
    loadFinTrack();
  }

  render() {
    const { month, monthData, currMonth } = this.props;
    return (
      <>
        <div
          className={month == currMonth ? "" : "is-hidden"}
          id={month + "-content"}
        >
          <div className="container">
            <div className="columns">
              <div className="column is-one-fifth"></div>
              <div className="column">
                <table className="table is-bordered is-hoverable is-fullwidth">
                  <thead>
                    <tr className="has-text-centered has-background-info-light is-size-5">
                      <th>From</th>
                      <th>Amount</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthData.map((entry) => {
                      let rowColor = "has-background-success-light";
                      let textColor = "has-text-success";
                      if (entry.amount < 0) {
                        rowColor = "has-background-danger-light";
                        textColor = "has-text-danger";
                      }
                      return (
                        <tr
                          className={`has-text-centered is-size-5 ${
                            rowColor + " " + textColor
                          }`}
                          height="40"
                        >
                          <td>{entry.from}</td>
                          <td>{entry.amount}$</td>
                          <td>{entry.category}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="column is-one-fifth"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FinMonthTab;
