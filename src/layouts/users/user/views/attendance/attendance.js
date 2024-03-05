import { Button } from "@mui/base";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AttendaceTab(props) {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchRows();
  }, []);

  function fetchRows() {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/").then((res) => {
        if (res.data.status) {
          let data = res.data.data;
          if (!Array.isArray(data)) {
            data = [];
          }
          setAttendances(res.data.data);
        } else {
          props.sendToast("error", res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  function handleSubmit() {
    try {
      axios
        .post(process.env.REACT_APP_HOST_URL + "/schedule/attendance", {
          attendances,
        })
        .then((res) => {
          if (res.data.status) {
            props.sendToast("success", "Attendance List Added!");
          } else {
            props.sendToast("error", res.data.data);
          }
        });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  function handleReturn() { }

  function handleChangeChecked(event, position) {
    event.preventDefault();
    const updatedCheckState = attendances.map((item, index) => {
      if (index === position) {
        item.status = event.target.value;
      }
    });

    setAttendances(updatedCheckState);
  }

  return (
    <>
      <div className="curriculum-container">
        <h2
          className="bold"
          style={{
            fontSize: "1.75rem",
          }}
        >
          Attendance Checking
        </h2>
        <div className="curriculum-row">
          <Grid container>
            <Grid item xs={2}>
              Index
            </Grid>
            <Grid item xs={2}>
              Code
            </Grid>
            <Grid item xs={4}>
              Name
            </Grid>
            <Grid item xs={2}>
              Date of Birth
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                Attendance
              </Box>
            </Grid>
          </Grid>
        </div>
        {attendances.map((attendance, index) => {
          return (
            <div className="curriculum-row">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={2} sm={2}>
                      {index}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {attendance.id}
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      {attendance.student_id}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {attendance.dob}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <FormControl>
                        <RadioGroup defaultValue={-1} onChange={(e) => handleChangeChecked(e, index)} value={attendance.remark}>
                          <FormControlLabel value={0} label="Absent" control={<Radio />} />
                          <FormControlLabel value={1} label="Attended" control={<Radio />} />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
        <div className="curriculum-row" style={{ backgroundColor: 'red' }}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button onClick={() => handleReturn()}>Return</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
