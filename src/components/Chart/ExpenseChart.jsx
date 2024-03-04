import React from "react";
import Chart from "./Chart";
const ExpenseChart = (props) => {
  const expenseData = props.expense || [];
  const ChartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of expenseData) {
    const expenseMonth = new Date(expense.edate).getMonth();
    if (!isNaN(expense.eprice)) {
      ChartDataPoints[expenseMonth].value += parseInt(expense.eprice);
    }
  }
  return (
    <Chart
      DataPoints={ChartDataPoints}
      totalAmountAllYears={props.totalAmountAllYears}
      totalAmount={props.totalAmount}
    />
  );
};
export default ExpenseChart;
