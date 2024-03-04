import React from "react";
import ChartBar from "./ChartBar";
import "../../Style/Chart.css";
const Chart = (props) => {
  let ChartDataPoints = [];
  if (props.DataPoints && props.DataPoints.length > 0) {
    if (props.totalAmountAllYears > 0) {
      ChartDataPoints = props.DataPoints.map((dataPoint) => ({
        label: dataPoint.label,
        value: ((dataPoint.value / props.totalAmountAllYears) * 100).toFixed(2),
      }));
    } else if (props.totalAmount > 0) {
      ChartDataPoints = props.DataPoints.map((dataPoint) => ({
        label: dataPoint.label,
        value: ((dataPoint.value / props.totalAmount) * 100).toFixed(2),
      }));
    }
  }

  return (
    <div className="chart">
      {ChartDataPoints.map((dataPoint, index) => (
        <ChartBar key={index} label={dataPoint.label} value={dataPoint.value} />
      ))}
    </div>
  );
};
export default Chart;
