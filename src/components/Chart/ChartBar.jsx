import React from "react";
import "../../Style/ChartBar.css";
function ChartBar(props) {
  let barFillHeight = "0%";
  if (props.value > 0) {
    barFillHeight = props.value + "%";
  }

  return (
    <div className="CBOX1">
      <div className="CBOX2" title={`${props.label} = ${props.value}`}>
        <div className="CBOX3" style={{ height: barFillHeight }}></div>
      </div>
      <div className="CBOX4">{props.label}</div>
    </div>
  );
}

export default ChartBar;
