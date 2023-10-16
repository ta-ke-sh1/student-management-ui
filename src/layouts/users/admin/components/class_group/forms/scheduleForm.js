import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function ScheduleListForm(props) {
    const [slot, setSlot] = useState(1)
    const [session, setSession] = useState(0)
    const [date, setDate] = useState(new Date())
    const [room, setRoom] = useState()
    const [lecturer, setLecturer] = useState({})

    const [rooms, setRooms] = useState([])
    const [lecturers, setLecturers] = useState([])

    const handleConfirm = () => { };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Schedule</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <TextField
                        disabled={props.id ? true : false}
                        type="number"
                        onChange={(e) => setSession(e.target.value)}
                        value={session}
                        id="form-ession"
                        fullWidth
                        label="Session Number"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <DesktopDatePicker
                        value={dayjs(date)}
                        label="Schedule Date"
                        onChange={(e) => {
                            setDate(e)
                        }}
                        sx={{
                            width: "100%",
                        }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="slot-select-label-form">
                            Slot
                        </InputLabel>
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
                            }}>
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
                        <InputLabel id="slot-select-label-form">
                            Room
                        </InputLabel>
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
                            }}>
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
                        <InputLabel id="lecturer-select-label-form">
                            Lecturer
                        </InputLabel>
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
                                setSlot(e.target.value);
                            }}>
                            {lecturers.map((lecturer, index) => (
                                <MenuItem key={"Lecturer-number-" + (index + 1)} value={lecturer.id}>
                                    {lecturer.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}