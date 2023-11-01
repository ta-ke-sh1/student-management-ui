import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function ScheduleListForm(props) {
  const [slot, setSlot] = useState(1);
  const [session, setSession] = useState(0);
  const [date, setDate] = useState(new Date());
  const [room, setRoom] = useState();
  const [lecturer, setLecturer] = useState({});

  const [rooms, setRooms] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const handleConfirm = () => { };

  useEffect(() => {
    fetchLecturers();
    fetchRooms();
  }, []);



  const fetchRooms = () => {
    axios.get(process.env.REACT_APP_HOST_URL + "/campus/rooms")
  }

  const fetchLecturers = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/lecturers").then((res) => {
        if (res.data.status) {
          let data = [];
          for (let i = 0; i < res.data.data.length; i++) {
            data.push(res.data.data[i]);
          }
          setLecturers(data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString())
    }

  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h2 style={{ margin: 0 }}>Manage Schedule</h2>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={4}>

            <Divider />
            <Grid item xs={12} md={12}>
              <TextField disabled={props.id ? true : false} type="number" onChange={(e) => setSession(e.target.value)} value={session} id="form-ession" fullWidth label="Session Number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={12}>
              <DesktopDatePicker
                value={dayjs(date)}
                label="Schedule Date"
                onChange={(e) => {
                  setDate(e);
                }}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="slot-select-label-form">Slot</InputLabel>
                <Select
                  defaultValue={slot}
                  value={slot}
                  label="Slot"
                  MenuProps={{
                    disablePortal: true, // <--- HERE
                    onClick: (e) => {
                      e.preventDefault();
                    },
                  }}
                  onChange={(e) => {
                    setSlot(e.target.value);
                  }}
                >
                  {[...Array(9)].map((_, index) => (
                    <MenuItem key={"Slot-number-" + (index + 1)} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="slot-select-label-form">Room</InputLabel>
                <Select
                  defaultValue={slot}
                  value={slot}
                  label="Room"
                  MenuProps={{
                    disablePortal: true, // <--- HERE
                    onClick: (e) => {
                      e.preventDefault();
                    },
                  }}
                  onChange={(e) => {
                    setSlot(e.target.value);
                  }}
                >
                  {rooms.map((room, index) => (
                    <MenuItem key={"Room-number-" + (index + 1)} value={room.id}>
                      {room.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="lecturer-select-label-form">Lecturer</InputLabel>
                <Select
                  defaultValue={lecturer}
                  value={lecturer}
                  label="Lecturer"
                  MenuProps={{
                    disablePortal: true, // <--- HERE
                    onClick: (e) => {
                      e.preventDefault();
                    },
                  }}
                  onChange={(e) => {
                    setLecturer(e.target.value);
                  }}
                >
                  {lecturers.map((lecturer, index) => (
                    <MenuItem key={"Lecturer-number-" + (index + 1)} value={lecturer.id}>
                      {lecturer.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5">
                Participants List
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <List sx={{
                width: '100%',
                borderRadius: '10px',
                bgcolor: '#f9f9f9',
                position: 'relative',
                overflow: 'auto',
                minHeight: 345,
                maxHeight: 345,
                '& ul': { padding: 0 },
              }}
                subheader={<li />}>
                {
                  props.participants && props.participants.map((participant, index) => {
                    return (
                      <ListItem key={"participant-list-" + index}>
                        <ListItemText>{participant.username}</ListItemText>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
            Create Attendance Reports
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
