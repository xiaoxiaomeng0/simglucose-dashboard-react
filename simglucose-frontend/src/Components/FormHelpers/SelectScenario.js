import React from "react";
import { SelectTime, SelectPeriod } from "./SelectTimePeriod";

function SelectScenario({ values, handleChange }) {
  return (
    <div>
      <label className="me_auto">Please select your scenario:</label>
      <br />
      <div>
        <input
          type="radio"
          id="random_scenario"
          value="1"
          name="scenario"
          defaultChecked
          onChange={handleChange}
        />
        <label htmlFor="random_scenario">Random Scenario</label>
        {values.scenario === "1" ? (
          <div>
            <label htmlFor="random_seed">
              Input random seed for random scenario:
            </label>
            <input
              type="text"
              id="random_seed"
              name="random_seed"
              value={values.random_seed}
              onChange={handleChange}
            />
          </div>
        ) : null}
      </div>
      <input
        type="radio"
        id="custom_scenario"
        name="scenario"
        value="2"
        onChange={handleChange}
      />
      <label htmlFor="custom_scenario">Custom Scenario</label>
      {values.scenario === "2" ? (
        <div>
          <div>
            <label htmlFor="breakfast_time">Breakfast Time (hr):</label>
            <select
              id="breakfast_time"
              name="breakfast_time"
              value={values.breakfast_time}
              onChange={handleChange}
            >
              <SelectTime />
            </select>
            <select
              name="breakfast_period"
              value={values.breakfast_period}
              onChange={handleChange}
            >
              <SelectPeriod />
            </select>
          </div>
          <div>
            <label htmlFor="breakfast_size">Breakfast Size (g):</label>
            <input
              type="text"
              id="breakfast_size"
              name="breakfast_size"
              value={values.breakfast_size}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lunch_time">Lunch Time (hr):</label>
            <select
              id="lunch_time"
              name="lunch_time"
              value={values.lunch_time}
              onChange={handleChange}
            >
              <SelectTime />
            </select>
            <select
              name="lunch_period"
              value={values.lunch_period}
              onChange={handleChange}
            >
              <SelectPeriod />
            </select>
          </div>
          <div>
            <label htmlFor="lunch_size">Lunch Size (g):</label>
            <input
              type="text"
              id="lunch_size"
              name="lunch_size"
              value={values.lunch_size}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="dinner_time">Dinner Time (hr):</label>
            <select
              id="dinner_time"
              name="dinner_time"
              value={values.dinner_time}
              onChange={handleChange}
            >
              <SelectTime />
            </select>
            <select
              name="dinner_period"
              value={values.dinner_period}
              onChange={handleChange}
            >
              <SelectPeriod />
            </select>
          </div>
          <div>
            <label htmlFor="dinner_size">Dinner Size (g):</label>
            <input
              type="text"
              id="dinner_size"
              name="dinner_size"
              value={values.dinner_size}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="snack_time">Snack Time (hr):</label>
            <select
              id="snack_time"
              name="snack_time"
              value={values.snack_time}
              onChange={handleChange}
            >
              <SelectTime />
            </select>
            <select
              name="snack_period"
              value={values.snack_period}
              onChange={handleChange}
            >
              <SelectPeriod />
            </select>
          </div>
          <div>
            <label htmlFor="snack_size">Snack Size (g):</label>
            <input
              type="text"
              id="snack_size"
              name="snack_size"
              value={values.snack_size}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SelectScenario;
