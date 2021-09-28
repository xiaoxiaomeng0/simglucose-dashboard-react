import React from "react";
import RenderLineChart from "./Chart";

function ChartSection(props) {
  return (
    <div>
      <h4>Simulating ${}</h4>
      <RenderLineChart />
    </div>
  );
}

export default ChartSection;
