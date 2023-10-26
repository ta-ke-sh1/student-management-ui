import React, { useLayoutEffect, useState } from "react";
import { useFetchSchedules } from "./hooks/useFetchSchedule";
import ScheduleList from "./scheduleList";
import { Button, Grid, Hidden, TableRow } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { StaticDatePicker } from "@mui/x-date-pickers";
import Constants from "../../../../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function ScheduleHome(props) {
  const constants = new Constants();
  const [week, setWeek] = useState(moment().week());
  const { schedules } = useFetchSchedules(week);

  const [dateMap, setDateMap] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  const timestampToFormattedDate = (timestamp) => {
    return moment(timestamp).format("L");
  };

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
    initDate();
    initDateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSchedules = () => {
    axios.get(process.env.REACT_APP_HOST_URL + "/schedule/student" + props.user.id).then((res) => {
      if (!res.data.status) {
        toast.error(res.data.data, {
          position: "bottom-left",
        });
      } else {
      }
    });
  };

  const initDate = () => {
    let date = new Date();
    setSelectedDate(date);
  };

  const handleChangeDate = (e) => {
    setSelectedDate(e);
  };

  const initDateMap = () => {
    let d_map = Array.from({ length: 8 }, () => Array.from({ length: 7 }, () => ({ isSlot: false })));

    schedules.forEach((schedule) => {
      let dayNumber = getDayOfWeek(schedule.date);
      let slot = schedule.slot - 1;

      d_map[slot][dayNumber] = {
        room: schedule.room,
        class: schedule.class,
        subject: schedule.subject,
        isSlot: true,
        status: schedule.status,
        lecturer: schedule.lecturer,
      };
    });

    setDateMap(d_map);
  };

  const renderSlot = (slot, dayNumber) => {
    if (dateMap) {
      let schedule = dateMap[slot][dayNumber];
      if (schedule.isSlot) {
        let className = "slot-content-container " + (schedule.status === 1 ? "attended" : schedule.status === 0 ? "absent" : "not-yet");
        return (
          <div className={className}>
            <div className={"slot-content"}>
              {dateMap[slot][dayNumber].subject}
              <br />
              {dateMap[slot][dayNumber].class}
              <br />
              {dateMap[slot][dayNumber].room} - {dateMap[slot][dayNumber].lecturer}
              <br />({schedule.status === 1 ? "Attended" : schedule.status === 0 ? "Absent" : "Not Yet"})
            </div>
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
          }}
        >
          Schedule
        </h1>
        <div className="date-row">
          <h3>
            {dateToFormattedDate(getFirstDateOfWeek(selectedDate))} to {dateToFormattedDate(getLastDateOfWeek(selectedDate))}
          </h3>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              onChange={(e) => {
                setSelectedDate(e);
              }}
              label="Select a Date"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </div>
        <Grid container columns={10}>
          <Grid item xs={12}>
            <div id="schedule-heading">
              <Grid container className="schedule-table-row" columns={8}>
                <Grid item xs={1} className="schedule-table-slot">
                  <div className="slot-content"></div>
                </Grid>
                {constants.daysOfTheWeek.map((day) => {
                  return (
                    <Grid xs={1} item key={"schedule-heading-" + day + ""} className="schedule-table-slot schedule-table-heading">
                      <div className="slot-content">{day}</div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            {constants.slot.map((slot, i) => {
              return (
                <div key={"i-" + i} id="schedule-slot-1">
                  <Grid container className="schedule-table-row" columns={8}>
                    <Grid item xs={1} className="schedule-table-slot">
                      <div className="slot-content">
                        Slot {i + 1} <br />
                        {slot.time}
                      </div>
                    </Grid>
                    {constants.daysOfTheWeek.map((day, dayIndex) => {
                      return (
                        <Grid item xs={1} key={"schedule-" + day + "-slot-" + i} id={"schedule-" + day + "-slot-" + i} className="schedule-table-slot">
                          {dateMap.length > 0 && renderSlot(i, dayIndex)}
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              );
            })}
          </Grid>
          <p>
            <strong>Note:</strong> <span>(absent)</span> Student has not attended this slot, <span>(attended)</span> Student has attended this slot
          </p>
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
}
