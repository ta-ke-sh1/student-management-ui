import {
    Grid,
    Button,
    Divider,
    TextField,
    InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import PercentIcon from '@mui/icons-material/Percent';
import { getArrayCache } from "../../../../utils/dataOptimizer";

export default function CourseworkFormModal(props) {

    const { id } = useParams();

    useEffect(() => {
        let assignments = getArrayCache("Assignments");
        console.log(assignments)
        console.log(props)
    }, [])

    const [name, setName] = useState(props.coursework.name ?? "")
    const [openDate, setOpenDate] = useState(props.coursework.id ? dayjs(props.coursework.start * 1000) : new Date())
    const [deadline, setDeadline] = useState(props.coursework.id ? dayjs(props.coursework.deadline * 1000) : new Date())
    const [closedDate, setClosedDate] = useState(props.coursework.id ? dayjs(props.coursework.close * 1000) : new Date())
    const [percentage, setPercentage] = useState(0);

    const handleConfirm = () => {
        try {
            if (name === "" || percentage === 0) {
                props.sendToast("error", "Please fill all fields!");
                return;
            }
            // if (props.coursework.id) {
            //     axios.put(process.env.REACT_APP_HOST_URL + "/course/coursework", {
            //         id: props.coursework.id,
            //         course_id: id,
            //         name: name,
            //         start: dayjs(openDate).unix(),
            //         deadline: dayjs(deadline).unix(),
            //         close: dayjs(closedDate).unix()
            //     }).then((res) => {
            //         if (res.data.status) {
            //             props.closeHandler();
            //             props.refresh();
            //         } else {
            //             props.sendToast("error", res.data.data)
            //         }
            //         console.log(res)
            //     })
            // } else {
            //     axios.post(process.env.REACT_APP_HOST_URL + "/course/coursework", {
            //         course_id: id,
            //         name: name,
            //         start: dayjs(openDate).unix(),
            //         deadline: dayjs(deadline).unix(),
            //         close: dayjs(closedDate).unix()
            //     }).then((res) => {
            //         if (res.data.status) {
            //             props.closeHandler();
            //             props.refresh();
            //         } else {
            //             props.sendToast("error", res.data.data)
            //         }
            //         console.log(res)
            //     })
            // }

        } catch (e) {
            props.sendToast("error", e.toString())
        }

    }

    return (<>
        <Grid
            container
            spacing={3}>
            <Grid item xs={12} md={12}>
                <h2 style={{ margin: 0 }}>Manage Coursework Assignment</h2>
                <p>Manage the coursework assignment</p>
            </Grid>
            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="form-name"
                            fullWidth
                            label="Assignment Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DesktopDateTimePicker
                            value={dayjs(openDate)}
                            label="Open Date Time"
                            onChange={(e) => {
                                setOpenDate(e)
                            }}
                            sx={{
                                width: "100%",
                            }} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DesktopDateTimePicker
                            value={dayjs(deadline)}
                            label="Deadline Date Time"
                            onChange={(e) => {
                                setDeadline(e)
                            }}
                            sx={{
                                width: "100%",
                            }} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DesktopDateTimePicker
                            value={dayjs(closedDate)}
                            label="Closed Date Time"
                            onChange={(e) => {
                                setClosedDate(e)
                            }}
                            sx={{
                                width: "100%",
                            }} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            type="number"
                            onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (0 <= value && value <= 100) {
                                    let currentSum = 0;
                                    for (let i = 0; i < props.course.assignments.length; i++) {
                                        console.log(props.course.assignments[i].percentage)
                                        currentSum += props.course.assignments[i].percentage * 100;
                                    }
                                    console.log(currentSum);
                                    if (value <= (100 - currentSum)) {
                                        setPercentage(value)
                                    } else {
                                        props.sendToast("error", "Percentage could not be higher than " + (100 - currentSum) + "%")
                                    }

                                } else {
                                    props.sendToast("error", "Percentage must be between 0 and 100")
                                }
                            }}
                            value={percentage}
                            id="form-percentage"
                            fullWidth
                            label="Percentage"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PercentIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ padding: "15px 30px" }}
                            onClick={(e) => handleConfirm(e)}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button
                            color="error"
                            fullWidth
                            variant="outlined"
                            sx={{ padding: "15px 30px" }}
                            onClick={props.closeHandler}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </Grid>
    </>)
}