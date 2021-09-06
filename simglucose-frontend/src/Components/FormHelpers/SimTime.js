import React from 'react'
import {SelectTime, SelectPeriod} from "./SelectTimePeriod"

function SimTime({values, handleChange}) {
    return (
        <>
            <div>
                <label htmlFor="sim_time">Please input simulation duration:</label>
                <input 
                    type="text" 
                    id="sim_time" 
                    value={values.sim_time} 
                    name="sim_time"
                    onChange={handleChange}
                />
                
            </div>
            <div>
                <label htmlFor="start_time">Select start time of the day to initiate the simulation:</label>
                <select id="start_time" value={values.start_time} onChange={handleChange} name="start_time">
                    <SelectTime/>
                </select>
                <select value={values.start_period} onChange={handleChange} name="start_period">
                    <SelectPeriod/>
                </select>
            </div>
        </>
    )
}

export default SimTime
