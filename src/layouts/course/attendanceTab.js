import { Box, Button, Card, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { normalizeIndex } from "../../utils/utils";

export default function AttendanceTab(props) {
    const session = props.session;

    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        const course = JSON.parse(localStorage.getItem("schedule"));
        console.log(course);
        fetchRows(course);

        return function CleanUp() {
            localStorage.removeItem("schedule");
        }
    }, [session])

    function fetchRows(course) {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/attendances", {
                params: {
                    id: course.course_id,
                    session: course.slot
                }
            }).then((res) => {
                if (res.data.status) {
                    console.log(res.data.data)
                    setAttendances(res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            })
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function handleChange(e, index) {
        let temp = [...attendances]
        temp[index].remark = e.target.value
        setAttendances(temp)
    }

    function handleTakeAttendance() {
        try {
            axios.post(process.env.REACT_APP_HOST_URL + "/course/attendances", attendances).then((res) => {
                if (res.data.status) {
                    props.sendToast("success", "Attendance saved!")
                } else {
                    props.sendToast("error", res.data.data)
                }
            })
        } catch (e) {
            props.sendToast("error", e.toString())
        }
    }

    return (<>
        <div>
            <h3>Attendaces Checking</h3>
            <Grid container spacing={3}>
                {
                    attendances.length > 0 ?
                        <>
                            {
                                attendances.map((attendance, index) => {
                                    return (
                                        <Grid key={"attendance-" + index + "-" + attendance.user_id} item sm={12} >
                                            <Card>
                                                <CardMedia sx={{
                                                    width: "150px",
                                                    backgroundImage:
                                                        `url(${process.env.PUBLIC_URL}/banner/banner` +
                                                        normalizeIndex(index + 1) +
                                                        ".jpg)",
                                                }}>
                                                </CardMedia>
                                                <CardContent sx={{
                                                    padding: "20px",
                                                    flex: "1 0 auto",
                                                }}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={1}>
                                                            <strong style={{ marginRight: '10px' }}>No.{index + 1}</strong>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <strong style={{ marginRight: '10px' }}>{attendance.student_id}</strong>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <strong style={{ marginRight: '10px' }}>Date of Birth: {attendance.dob}</strong>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Box display="flex"
                                                                justifyContent="flex-end">
                                                                <FormControl>
                                                                    <FormLabel>Status</FormLabel>
                                                                    <RadioGroup row
                                                                        value={attendances[index].remark}
                                                                        onChange={(e) => {
                                                                            handleChange(e, index)
                                                                        }}>
                                                                        <FormControlLabel control={<Radio />} value={-1} label="Other" />
                                                                        <FormControlLabel control={<Radio />} value={1} label="Attended" />
                                                                        <FormControlLabel control={<Radio />} value={0} label="Absent" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }

                        </> :
                        <>
                            <p style={{
                                marginLeft: '25px'
                            }}>This class no participants</p>
                        </>
                }
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={4}>
                        {
                            attendances.length > 0 ? <Grid item xs={3} sm={3}>
                                <Button fullWidth variant="outlined" onClick={handleTakeAttendance}>Take Attendance</Button>
                            </Grid> : <></>
                        }
                        <Grid item xs={3} sm={3}>
                            <Button variant="outlined" color="error" fullWidth onClick={() => {
                                props.handleSelectTab(1);
                            }}>Return</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </>)
}