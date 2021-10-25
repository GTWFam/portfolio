import React from "react";
import FinMonthTab from "./FinMonthTab";

class FinMonths extends React.Component {
  render() {
    const { monthArr, currMonth, entries, setMoney } = this.props;
    console.log(currMonth);
    return (
      <>
        <div className="tabs is-boxed is-centered">
          <ul>
            {monthArr.map((month) => (
              <>
                <li
                  className={month == currMonth ? "is-active" : ""}
                  data-target={month + "-content"}
                >
                  <a>{month}</a>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="px-2" id="tabs-content">
          {monthArr.map((month) => {
            let monthEntries = entries.filter((entry) => entry.month === month);
            return (
              <>
                <FinMonthTab
                  month={month}
                  monthData={monthEntries}
                  currMonth={currMonth}
                />
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default FinMonths;
