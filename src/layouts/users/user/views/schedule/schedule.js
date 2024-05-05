import React, { useLayoutEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Constants from "../../../../../utils/constants";
import axios from "axios";
import { decodeToken } from "../../../../../utils/utils";

export default function ScheduleHome(props) {
    const token = decodeToken(localStorage.getItem("access_token"));

    console.log(token)

    const constants = new Constants();

    const [dateMap, setDateMap] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateToFormattedDate = (date) => {
        return moment(date).format("MMM DD, YYYY");
    };

    function getDayOfWeek(timestamp) {
        let date = new Date(timestamp);
        return date.getDay();
    }

    function getFirstDateOfWeek(timestamp) {
        let date = new Date(timestamp);
        return new Date(date.setDate(date.getDate() - date.getDay() + 1));
    }

    function getLastDateOfWeek(timestamp) {
        let date = new Date(timestamp);
        return new Date(date.setDate(date.getDate() - date.getDay() + 7));
    }

    useLayoutEffect(() => {
        fetchSchedules();
    }, []);

    const handleTakeAttendance = (data) => {
        data.source = "home";
        localStorage.setItem("schedule", JSON.stringify(data));
        props.handleChangeAttendance();
    };

    const fetchSchedules = (date) => {
        try {
            let course_id = "";
            token.courses.forEach((course) => {
                course_id += "%" + course.group_id;
            });

            axios
                .get(
                    process.env.REACT_APP_HOST_URL +
                    "/schedule/" +
                    (token.role === 2 ? "lecturer" : "student"),
                    {
                        params: {
                            user_id: token.user,
                            startDate: getFirstDateOfWeek(
                                date ?? selectedDate.getTime()
                            ).getTime(),
                            endDate: getLastDateOfWeek(
                                date ?? selectedDate.getTime()
                            ).getTime(),
                        },
                    }
                )
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    } else {
                        const schedules = res.data.data;

                        let d_map = Array.from({ length: 8 }, () =>
                            Array.from({ length: 7 }, () => ({ isSlot: false }))
                        );
                        schedules.forEach((schedule) => {
                            let dayNumber = getDayOfWeek(schedule.date);
                            let slot = schedule.slot - 1;
                            d_map[slot][dayNumber] = {
                                isSlot: true,
                                ...schedule,
                            };
                        });
                        setDateMap(d_map);
                    }
                });
        } catch (e) {
            props.sendToast("error", "Failed to fetch user schedules");
        }
    };

    const renderSlot = (slot, dayNumber) => {
        if (dateMap) {
            let schedule = dateMap[slot][dayNumber];
            if (schedule.isSlot) {
                let className =
                    "slot-content-container " +
                    (token.role === 2
                        ? "lecturer"
                        : schedule.remark === 1
                            ? "attended"
                            : schedule.remark === 0
                                ? "absent"
                                : "not-yet");
                return (
                    <div className={className}>
                        <Tooltip
                            arrow
                            title={
                                token.role === 2
                                    ? "Click to take attendance"
                                    : ""
                            }>
                            <div
                                style={{
                                    userSelect: "none",
                                    cursor: token.role === 2 ? "pointer" : "default",
                                }}
                                className={"slot-content"}
                                onClick={() => {
                                    return token.role === 2
                                        ? handleTakeAttendance(
                                            dateMap[slot][dayNumber]
                                        )
                                        : null;
                                }}>
                                {dateMap[slot][dayNumber].subject}
                                <br />
                                {dateMap[slot][dayNumber].course_id}
                                <br />
                                {dateMap[slot][dayNumber].room}
                                <br />
                                {dateMap[slot][dayNumber].lecturer}
                                <br />
                                {token.role === 2
                                    ? "Take Attendance"
                                    : schedule.remark === 1
                                        ? "Attended"
                                        : schedule.remark === 0
                                            ? "Absent"
                                            : "Not Yet"}
                            </div>
                        </Tooltip>
                    </div>
                );
            } else {
                return <div className="slot-content"></div>;
            }
        }
    };

    return (
        <div className="schedule-container">
            <div className="schedule-table">
                <h1
                    className="bold"
                    style={{
                        fontSize: "1.75rem",
                    }}>
                    Schedule
                </h1>
                <div className="date-row">
                    <h3>
                        {dateToFormattedDate(getFirstDateOfWeek(selectedDate))}{" "}
                        to{" "}
                        {dateToFormattedDate(getLastDateOfWeek(selectedDate))}
                    </h3>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Tooltip arrow title="Select a date to see weekly schedule">
                            <DatePicker
                                onChange={(e) => {
                                    setSelectedDate(e);
                                    fetchSchedules(e);
                                }}
                                label="Select a Date"
                                slotProps={{ textField: { size: "small" } }}
                            />
                        </Tooltip>
                    </LocalizationProvider>
                </div>
                <Grid container columns={10}>
                    <Grid item xs={12}>
                        <div id="schedule-heading">
                            <Grid
                                container
                                className="schedule-table-row"
                                columns={8}>
                                <Grid
                                    item
                                    xs={1}
                                    className="schedule-table-slot">
                                    <div className="slot-content"></div>
                                </Grid>
                                {constants.daysOfTheWeek.map((day) => {
                                    return (
                                        <Grid
                                            xs={1}
                                            item
                                            key={"schedule-heading-" + day + ""}
                                            className="schedule-table-slot schedule-table-heading">
                                            <div className="slot-content">
                                                {day}
                                            </div>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </div>
                        {constants.slot.map((slot, i) => {
                            return (
                                <div key={"i-" + i} id="schedule-slot-1">
                                    <Grid
                                        container
                                        className="schedule-table-row"
                                        columns={8}>
                                        <Grid
                                            item
                                            xs={1}
                                            className="schedule-table-slot">
                                            <div className="slot-content">
                                                Slot {i + 1} <br />
                                                {slot.time}
                                            </div>
                                        </Grid>
                                        {constants.daysOfTheWeek.map(
                                            (day, dayIndex) => {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        key={
                                                            "schedule-" +
                                                            day +
                                                            "-slot-" +
                                                            i
                                                        }
                                                        id={
                                                            "schedule-" +
                                                            day +
                                                            "-slot-" +
                                                            i
                                                        }
                                                        className="schedule-table-slot">
                                                        {dateMap.length > 0 &&
                                                            renderSlot(
                                                                i,
                                                                dayIndex
                                                            )}
                                                    </Grid>
                                                );
                                            }
                                        )}
                                    </Grid>
                                </div>
                            );
                        })}
                    </Grid>
                    <p>
                        <strong>Note:</strong> <span>(absent)</span> Student has
                        not attended this slot, <span>(attended)</span> Student
                        has attended this slot
                    </p>
                </Grid>
            </div>
        </div>
    );
}
