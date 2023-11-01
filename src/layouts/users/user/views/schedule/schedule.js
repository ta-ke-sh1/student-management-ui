import React, { useLayoutEffect, useState } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
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
  // token = {id, avatar, user, email, role}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTakeAttendance = () => { };

  const fetchSchedules = () => {
    try {
      let course_id = ""
      token.courses.forEach((course) => {
        course_id += ("%" + course.course_id)
      })

      axios
        .get(process.env.REACT_APP_HOST_URL + "/schedule/" + (token.role === 2 ? "lecturer" : "student"), {
          params: {
            user_id: token.user,
            course_id: course_id,
            startDate: getFirstDateOfWeek(selectedDate.getTime()).getTime(),
            endDate: getLastDateOfWeek(selectedDate.getTime()).getTime(),
          },
        })
        .then((res) => {
          if (!res.data.status) {
            props.sendToast("error", res.data.data);
          } else {
            const schedules = res.data.data;
            props.sendToast("success", "Data fetched successfuly");

            let d_map = Array.from({ length: 8 }, () => Array.from({ length: 7 }, () => ({ isSlot: false })));
            schedules.forEach((schedule) => {
              let dayNumber = getDayOfWeek(schedule.date);
              let slot = schedule.slot - 1;
              d_map[slot][dayNumber] = {
                room: schedule.room,
                class: schedule.class,
                subject: schedule.subject,
                isSlot: true,
                remark: schedule.remark,
                lecturer: schedule.lecturer,
              };
            });

            setDateMap(d_map);
          }
        });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
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
              {dateMap[slot][dayNumber].room}
              <br />
              {dateMap[slot][dayNumber].lecturer}
              <br />
              ({schedule.status === 1 ? "Attended" : schedule.status === 0 ? "Absent" : "Not Yet"})
              <br />
              {token.role === 3 ? <Button onClick={handleTakeAttendance}>Take Attendance</Button> : <></>}
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
            <Tooltip title="Select a date to see weekly schedule">
              <DatePicker
                onChange={(e) => {
                  setSelectedDate(e);
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
    </div>
  );
}
