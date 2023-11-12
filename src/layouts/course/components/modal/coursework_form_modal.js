import {
    Grid,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

export default function CourseworkFormModal(props) {

    const { id } = useParams();

    const [name, setName] = useState("")
    const [openDate, setOpenDate] = useState(new Date())
    const [deadline, setDeadline] = useState(new Date())
    const [closedDate, setClosedDate] = useState(new Date())

    useEffect(() => {

    }, [])

    const handleConfirm = () => {
        try {
            axios.post(process.env.REACT_APP_HOST_URL + "/course/coursework", {
                id: id,
                name: name,
                start: dayjs(openDate).unix(),
                deadline: dayjs(deadline).unix(),
                close: dayjs(closedDate).unix()
            }).then((res) => {
                if (res.data.status) {
                    props.closeHandler();
                    window.location.reload();
                } else {
                    props.sendToast("error", res.data.data)
                }
                console.log(res)
            })
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