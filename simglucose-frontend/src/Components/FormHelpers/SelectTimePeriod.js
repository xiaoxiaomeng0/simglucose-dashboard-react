import React from "react";

function SelectTime() {
  const list_of_time = [
    "Please select time",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
  ];
  return (
    <>
      {list_of_time.map((data) => {
        return (
          <option key={data} value={data}>
            {data}
          </option>
        );
      })}
    </>
  );
}

function SelectPeriod() {
  const list_of_period = ["Please select period", "AM", "PM"];
  return (
    <>
      {list_of_period.map((data) => {
        return (
          <option key={data} value={data}>
            {data}
          </option>
        );
      })}
    </>
  );
}
export { SelectTime, SelectPeriod };
