import React from "react";

class FinMonthTab extends React.Component {
  render() {
    const { month, monthData, currMonth } = this.props;
    return (
      <>
        <div
          className={month == currMonth ? "" : "is-hidden"}
          id={month + "-content"}
        >
          <table className="table is-bordered is-hoverable">
            <thead>
              <tr>
                <th>From</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {monthData.map((entry) => {
                let rowColor = "is-success";
                if (entry.amount < 0) {
                  rowColor = "is-danger";
                }
                return (
                  <tr className={`${rowColor}`} height="40">
                    <td>{entry.from}</td>
                    <td>{entry.amount}$</td>
                    <td>{entry.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default FinMonthTab;
