import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../../../../utils/constants";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { fetchDocuments } from "../../../../../utils/utils";

export default function AttendanceScheduleForm(props) {

    const [formData, setFormData] = useState({
        course_id: props.schedule.course_id ?? "",
        subject: props.schedule.subject ?? "",
        session: props.schedule.session ?? 0,
        lecturer: props.schedule.lecturer ?? "",
        room: props.schedule.room ?? "",
        date: props.schedule.date ?? new Date(),
        slot: props.schedule.slot ?? 1,
    })

    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem("groups_data")) ?? [])
    const [rooms, setRooms] = useState(JSON.parse(localStorage.getItem("rooms")) ?? [])
    const [subjects, setSubjects] = useState(JSON.parse(localStorage.getItem("subjectsData")) ?? [])
    const [lecturers, setLecturers] = useState(JSON.parse(localStorage.getItem("lecturers")) ?? [])

    const constants = new Constants();

    useEffect(() => {
        if (subjects.length == 0) {
            fetchSubjects();
        }

        if (rooms.length == 0) {
            fetchRooms()
        }

        if (courses.length == 0) {
            fetchCourses()
        }

        if (lecturers.length == 0) {
            fetchLecturers();
        }
    }, [])

    async function fetchLecturers() {
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/user/all")
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    } else {
                        let result = [];
                        res.data.data.forEach((user) => {
                            if (user.role === 2) {
                                result.push(user);
                            }
                        });
                        localStorage.setItem(
                            "lecturers",
                            JSON.stringify(result)
                        );
                        setLecturers(result);
                    }
                });
        } catch (e) {

        }
    }

    async function fetchCourses() {
        try {
            await axios
                .get(process.env.REACT_APP_HOST_URL + "/semester/groups")
                .then((res) => {
                    if (res.data.status) {
                        setCourses(res.data.data);
                        localStorage.setItem(
                            "groups_data",
                            JSON.stringify(res.data.data)
                        );
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    async function fetchSubjects() {
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/subject")
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    } else {
                        let data = [];
                        res.data.data.forEach((subject) => {
                            data.push(subject);
                        });
                        setSubjects(data);
                        localStorage.setItem(
                            "subjectsData",
                            JSON.stringify(data)
                        );
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    async function fetchRooms() {
        let result = [];
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/campus/rooms")
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    }

                    res.data.data.forEach((room) => {
                        result.push(room);
                    });

                    setRooms(result);
                    localStorage.setItem("rooms", JSON.stringify(result))
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    const handleConfirm = () => {
        console.log(formData)
        if (formData.course_id && formData.subject && formData.lecturer && formData.room) {
            if (props.schedule.id) {
                axios.put(process.env.REACT_APP_HOST_URL + "/schedule", formData).then((res) => {
                    console.log(res)
                })
            } else {
                axios.post(process.env.REACT_APP_HOST_URL + "/schedule", formData).then((res) => {
                    console.log(res)
                })
            }
        } else {
            props.sendToast("error", "Missing fields!")
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((feedback) => ({
            ...feedback,
            [name]: name === "slot" ? parseInt(value) : value,
        }));

        if (name === "course_id") {
            let course = fetchDocuments(courses, value)
            setFormData((feedback) => ({
                ...feedback,
                subject: course.subject
            }))
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>

                    <h2 style={{ margin: 0 }}>
                        {
                            formData.course_id ? "Manage course: " + formData.course_id + " schedule" : "Add session schedule"
                        }

                    </h2>
                </Grid>
                <Divider />
                {
                    props.schedule.id ? <></> :
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="room-select-label-form">Course</InputLabel>
                                <Select
                                    defaultValue={formData.course_id ?? ""}
                                    value={formData.course_id ?? ""}
                                    label="Course"
                                    name="course_id"
                                    MenuProps={{
                                        disablePortal: true, // <--- HERE
                                        onClick: (e) => {
                                            e.preventDefault();
                                        },
                                    }}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"default"} disabled>
                                        Please select a course
                                    </MenuItem>
                                    {courses.map((course) => (
                                        <MenuItem key={course.id} value={course.id}>
                                            {course.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                }
                <Grid item xs={12} md={12}>
                    <TextField type="number" onChange={handleChange} name="session" value={formData.session} id="form-session" fullWidth label="Session" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="slot-select-label-form">Slot</InputLabel>
                        <Select
                            defaultValue={formData.slot ?? 1}
                            value={formData.slot ?? 1}
                            label="Slot"
                            name="slot"
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: (e) => {
                                    e.preventDefault();
                                },
                            }}
                            onChange={handleChange}
                        >
                            <MenuItem value={"default"} disabled>
                                Please select a slot
                            </MenuItem>
                            {constants.slot.map((slot, index) => (
                                <MenuItem key={slot.id} value={slot.id}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="lecturer-select-label-form">Lecturer</InputLabel>
                        <Select
                            defaultValue={formData.lecturer ?? ""}
                            value={formData.lecturer ?? ""}
                            label="Lecturer"
                            name="lecturer"
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: (e) => {
                                    e.preventDefault();
                                },
                            }}
                            onChange={handleChange}
                        >
                            <MenuItem value={"default"} disabled>
                                Please select a lecturer
                            </MenuItem>
                            {lecturers.map((lecturer) => (
                                <MenuItem key={lecturer.id} value={lecturer.id}>
                                    {lecturer.id} - {lecturer.lastName} {lecturer.firstName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <DesktopDatePicker
                        value={dayjs(formData.date)}
                        id="form-date"
                        name="date"
                        label="Date"
                        variant="outlined"
                        onChange={(value) => {
                            setFormData((feedback) => ({
                                ...feedback,
                                date: value
                            }));
                        }}
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="room-select-label-form">Room</InputLabel>
                        <Select
                            defaultValue={formData.room ?? 1}
                            value={formData.room ?? 1}
                            label="Room"
                            name="room"
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: (e) => {
                                    e.preventDefault();
                                },
                            }}
                            onChange={handleChange}
                        >
                            <MenuItem value={"default"} disabled>
                                Please select a room
                            </MenuItem>
                            {rooms.map((room) => (
                                <MenuItem key={room.id} value={room.id}>
                                    {room.id}
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
    );
}
