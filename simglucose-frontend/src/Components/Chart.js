import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const RenderLineChart = ({ listOfResults }) => {
  const filter_data = listOfResults.filter(
    (result) => result.patient_id === "adolescent#001"
  );
  return (
    <LineChart
      width={900}
      height={300}
      data={filter_data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="bg" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="cgm" stroke="#82ca9d" dot={false} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        dataKey="time"
        height={100}
        tick={<CustomizedAxisTick />}
        interval="preserveStartEnd"
      />
      <YAxis />
      <Tooltip />
      <Legend align="right" height={18} />
    </LineChart>
  );
};
export default RenderLineChart;
