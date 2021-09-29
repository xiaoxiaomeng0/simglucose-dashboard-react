import React, { useRef } from "react";
import { SelectTime, SelectPeriod } from "./SelectTimePeriod";

function SimTime({ simTimeRef, startTimeRef, startPeriodRef }) {
  return (
    <>
      <div>
        <label htmlFor="sim_time">
          Please input simulation duration: (hr):
        </label>
        <input type="text" id="sim_time" ref={simTimeRef} />
      </div>
      <div>
        <label htmlFor="start_time">
          Select start time of the day to initiate the simulation:
        </label>
        <select id="start_time" ref={startTimeRef}>
          <SelectTime />
        </select>
        <select ref={startPeriodRef}>
          <SelectPeriod />
        </select>
      </div>
    </>
  );
}

export default SimTime;
