import React from "react";
import { useFetchSchedules } from "../hooks/useFetchSchedule";
import ScheduleList from "./components/scheduleList";

export default function ScheduleHome() {
    const { schedules } = useFetchSchedules();
    return (
        <div>
            <h1>Hello world</h1>
            {schedules.map((schedule) => {
                return (
                    <ScheduleList
                        key={"schedule" + schedule.id}
                        schedule={schedule}
                    />
                );
            })}
        </div>
    );
}
