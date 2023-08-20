import React, { useLayoutEffect, useState } from "react";
import { useFetchSchedules } from "./hooks/useFetchSchedule";
import ScheduleList from "./scheduleList";
import { Button, Grid, Hidden, TableRow } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
import { StaticDatePicker } from "@mui/x-date-pickers";


const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const slot = [
    {
        time: "7:30 - 9:00"
    }, {
        time: "9:10 - 10:40"
    }, {
        time: "10:50 - 12:20"
    }, {
        time: "12:50 - 14:20"
    }, {
        time: "14:30 - 16:00"
    }, {
        time: "16:10 - 17:40"
    }, {
        time: "17:50 - 19:20"
    }, {
        time: "19:30 - 21:00"
    },
]

export default function ScheduleHome() {

    const [week, setWeek] = useState(moment().week());
    const { schedules } = useFetchSchedules(week);

    const [dateMap, setDateMap] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment())

    const timestampToFormattedDate = (timestamp) => {
        return moment(timestamp).format("L")
    }

    const dateToFormattedDate = (date) => {
        return moment(date).format("MMM DD, YYYY")
    }

    function getDayOfWeek(timestamp) {
        let date = new Date(timestamp)
        return date.getDay();
    }

    function getFirstDateOfWeek(timestamp) {
        let date = new Date(timestamp)
        return new Date(date.setDate(date.getDate() - date.getDay() + 1))
    }

    function getLastDateOfWeek(timestamp) {
        let date = new Date(timestamp)
        return new Date(date.setDate(date.getDate() - date.getDay() + 7));
    }

    useLayoutEffect(() => {
        initDate()
        initDateMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedules]);


    const initDate = () => {
        let date = new Date()
        setSelectedDate(date)
    }

    const handleChangeDate = (e) => {
        setSelectedDate(e)
    }

    const initDateMap = () => {
        let d_map = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                row.push({
                    isSlot: false,
                })
            }
            d_map.push(row)
        }

        schedules.forEach((schedule) => {
            let dayNumber = getDayOfWeek(schedule.date)
            let slot = schedule.slot - 1

            d_map[slot][dayNumber] = {
                room: schedule.room,
                class: schedule.class,
                subject: schedule.subject,
                isSlot: true,
                status: schedule.status,
                lecturer: schedule.lecturer
            }
        })

        setDateMap(d_map);
    }

    const renderSlot = (slot, dayNumber) => {
        if (dateMap) {
            let schedule = dateMap[slot][dayNumber];
            if (schedule.isSlot) {
                let className = "slot-content-container " + (schedule.status === 1 ? "attended" : schedule.status === 0 ? "absent" : "not-yet")
                return (
                    <div className={className}>
                        <div className={"slot-content"}>
                            {dateMap[slot][dayNumber].subject}
                            <br />
                            {dateMap[slot][dayNumber].class}
                            <br />
                            {dateMap[slot][dayNumber].room} - {dateMap[slot][dayNumber].lecturer}
                            <br />
                            ({schedule.status === 1 ? "Attended" : schedule.status === 0 ? "Absent" : "Not Yet"})
                        </div>
                    </div>

                )
            } else {
                return <div className="slot-content"></div>
            }
        }
    }

    return (
        <div className="schedule-container">
            <div className="schedule-table">
                <h1 className="bold" style={{
                    fontSize: '1.75rem',
                }}>
                    Schedule
                </h1>
                <div className="date-row">
                    <h3>{dateToFormattedDate(getFirstDateOfWeek(selectedDate))} to {dateToFormattedDate(getLastDateOfWeek(selectedDate))}</h3>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <DatePicker
                            onChange={(e) => {
                                setSelectedDate(e)
                            }}
                            label="Select a Date"
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                </div>
                <Grid container columns={10}>
                    <Grid item xs={12}>
                        <div id="schedule-heading">
                            <Grid container className="schedule-table-row" columns={8}>
                                <Grid item xs={1} className="schedule-table-slot"><div className="slot-content"></div></Grid>
                                {
                                    daysOfTheWeek.map((day) => {
                                        return <Grid xs={1} item key={'schedule-heading-' + day + ""} className="schedule-table-slot schedule-table-heading">
                                            <div className="slot-content">
                                                {day}
                                            </div>
                                        </Grid>
                                    })
                                }
                            </Grid>
                        </div>
                        {
                            slot.map((slot, i) => {
                                return (
                                    <div key={"i-" + i} id="schedule-slot-1">
                                        <Grid container className="schedule-table-row" columns={8}>
                                            <Grid item xs={1} className="schedule-table-slot"><div className="slot-content">Slot {i + 1} <br />{slot.time}</div></Grid>
                                            {
                                                daysOfTheWeek.map((day, dayIndex) => {
                                                    return <Grid item xs={1} key={'schedule-' + day + "-slot-" + i} id={'schedule-' + day + "-slot-" + i} className="schedule-table-slot">
                                                        {dateMap.length > 0 && renderSlot(i, dayIndex)}
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                    </Grid>
                    <p>
                        <strong>Note:</strong> <span>(absent)</span> Student has not attended this slot, <span>(attended)</span> Student has attended this slot
                    </p>
                </Grid>
            </div>
        </div >
    );
}
