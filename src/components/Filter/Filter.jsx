import React, { useEffect, useState } from "react";
import "../../Style/Filter.css";
const Filter = ({ OnFilterChange, ExpenseData, years }) => {
  const [SelectedYear, SetSelectedYear] = useState("All");
  const [TotalAmount, SetTotalAmount] = useState(0);
  const [TotalAmountAllYears, SetTotalAmountAllYears] = useState(0);
  const HandleYearChange = (year) => {
    SetSelectedYear(year);
  };

  useEffect(() => {
    OnFilterChange(SelectedYear);
    // Calculate Total Amount for the selected year
    let totalAmountSelectedYear = 0;
    if (SelectedYear === "All") {
      totalAmountSelectedYear = ExpenseData.reduce(
        (total, expense) => total + parseInt(expense.eprice),
        0
      );
    } else {
      totalAmountSelectedYear = ExpenseData.filter(
        (expense) =>
          new Date(expense.edate).getFullYear().toString() === SelectedYear
      ).reduce((total, expense) => total + parseInt(expense.eprice), 0);
    }

    SetTotalAmount(totalAmountSelectedYear);

    // Calculate Total Amount for all years
    const totalAmountAllYears = ExpenseData.reduce(
      (total, expense) => total + parseInt(expense.eprice),
      0
    );
    SetTotalAmountAllYears(totalAmountAllYears);
  }, [SelectedYear, OnFilterChange, ExpenseData]);

  return (
    <>
      <div className="Expense-Filter">
        <div className="Total-Am-Box">
          <label className="FLBL">Filter By Year:</label>
          <select
            className="OPT"
            value={SelectedYear}
            onChange={(e) => HandleYearChange(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="Total-Am-Box TAB1">
          <p className="TM">
            Total Amount for{" "}
            {SelectedYear === "All" ? "All Years" : SelectedYear} :{" "}
            {TotalAmount}
          </p>
          {SelectedYear !== "All" && (
            <p className="TM">
              Total Amount for All Years: {TotalAmountAllYears}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default Filter;
