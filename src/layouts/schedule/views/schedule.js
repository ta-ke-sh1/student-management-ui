import React, { useLayoutEffect, useState } from "react";
import { useFetchSchedules } from "../hooks/useFetchSchedule";
import ScheduleList from "./components/scheduleList";
import { Button, Grid, TableRow } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";


const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const slot = [1, 2, 3, 4, 5, 6, 7, 8]

export default function ScheduleHome() {
    const [week, setWeek] = useState(moment().week());
    const [dateMap, setDateMap] = useState([])
    const { schedules } = useFetchSchedules(week);

    const timestampToFormattedDate = (timestamp) => {
        return moment(timestamp).format("L")
    }

    function getDayOfWeek(timestamp) {
        let date = new Date(timestamp)
        return date.getDay();
    }

    useLayoutEffect(() => {
        initDateMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedules]);

    const getWeekFromDate = (e) => {
        setWeek(e.week())
    }

    const initDateMap = () => {
        let d_map = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                row.push({
                    className: "",
                    room: "",
                    course: "",
                    isSlot: false,
                })
            }
            d_map.push(row)
        }
        schedules.forEach((schedule) => {
            let dayNumber = getDayOfWeek(schedule.date)
            let slot = schedule.slot - 1
            d_map[slot][dayNumber] = {
                room: schedule.roomId,
                course: "",
                isSlot: true,
            }
        })
        setDateMap(d_map);
    }

    const renderSlot = (slot, dayNumber) => {
        if (dateMap) {
            if (dateMap[slot][dayNumber].isSlot) {
                return <>Hello</>
            } else {
                return <></>
            }
        }

    }

    return (
        <div>
            <h1>Hello world</h1>
            <div className="schedule-table">
                <div className="row">
                    <Button variant="outlined" className="schedule-btn">Last Week</Button>
                    <Button variant="outlined" className="schedule-btn">Next Week</Button>
                    <span> or </span>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <DatePicker
                            onChange={(e) => {
                                getWeekFromDate(e)
                            }}
                            label="Select a week"
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                </div>
                <div id="schedule-heading">
                    <Grid container className="schedule-table-row">
                        <Grid item className="schedule-table-slot schedule-table-heading"></Grid>
                        {
                            daysOfTheWeek.map((day) => {
                                return <Grid item key={'schedule-heading-' + day + ""} className="schedule-table-slot schedule-table-heading">
                                    <div className="slot-content">
                                        {day}
                                    </div>
                                </Grid>
                            })
                        }
                    </Grid>
                </div>
                {
                    slot.map((i, slotIndex) => {
                        return (
                            <div key={"i-" + i} id="schedule-slot-1">
                                <Grid container className="schedule-table-row">
                                    <Grid item className="schedule-table-slot"><div className="slot-content">Slot {i}</div></Grid>
                                    {
                                        daysOfTheWeek.map((day, dayIndex) => {
                                            return <Grid item key={'schedule-' + day + "-slot-" + i} id={'schedule-' + day + "-slot-" + i} className="schedule-table-slot">
                                                <div className="slot-content">
                                                    {dateMap.length > 0 && renderSlot(slotIndex, dayIndex)}
                                                </div>
                                            </Grid>
                                        })
                                    }
                                </Grid>
                                <div>
                                    Note:
                                    <ul>(attended) Student has attended this slot</ul>
                                    <ul>(absent) Student has not attended this slot</ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
