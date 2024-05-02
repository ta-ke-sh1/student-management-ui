import { useEffect, useState } from "react";
import {
    Grid,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
} from "@mui/material";
import { fromMilisecondsToDisplayFormatDateString } from "../../utils/utils";
import axios from "axios";
import { cacheData, getArrayCache, lecturerItems } from "../../utils/dataOptimizer";

export default function ScheduleTab(props) {
    const course = props.course;
    const [schedules, setSchedules] = useState();
    const user = props.decoded;
    useEffect(() => {
        let data = getArrayCache(lecturerItems.Schedules)
        if (data.length > 0) {
            setSchedules(data)
        } else {
            fetchSchedules();
        }

    }, [course]);

    function fetchSchedules() {
        try {
            axios
                .get(
                    process.env.REACT_APP_HOST_URL +
                    "/course/schedules?id=" +
                    course.id
                )
                .then((res) => {
                    if (res.data.status) {
                        let data = res.data.data;
                        let sorted = data.sort((a, b) => a.session - b.session);
                        setSchedules(sorted);
                        cacheData(lecturerItems.Schedules, sorted)
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    const takeAttendance = (index) => {
        localStorage.setItem("schedule", JSON.stringify(schedules[index]));
        props.handleSelectTab(4);
    };

    const normalizeIndex = (index) => {
        const limit = 5;
        return index > limit ? (index % (limit + 1)) + 1 : index;
    };

    function isValidDate(date) {
        const current = new Date().getTime();
        // Can only take attendance within 2 days
        let isValid = date > current - 172800000 && date < current + 172800000;
        return isValid;
    }

    return (
        <div>
            <h2
                className="bold"
                style={{
                    fontSize: "1.75rem",
                    marginBottom: "18px",
                }}>
                Schedules
            </h2>
            {schedules &&
                schedules.map((schedule, index) => {
                    return (
                        <div
                            className="curriculum-row"
                            style={{
                                marginBottom: "15px",
                            }}>
                            <Card
                                sx={{
                                    display: "flex",
                                }}>
                                <CardMedia
                                    sx={{
                                        width: "150px",
                                        backgroundImage:
                                            `url(${process.env.PUBLIC_URL}/banner/banner` +
                                            normalizeIndex(index) +
                                            ".jpg)",
                                    }}></CardMedia>
                                <CardContent
                                    sx={{
                                        padding: "20px",
                                        flex: "1 0 auto",
                                    }}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={2} alignItems="center">
                                            <strong>Session: </strong>
                                            {schedule.session + 1}
                                        </Grid>
                                        <Grid item xs={3} alignItems="center">
                                            <strong>Lecturer: </strong>
                                            {schedule.lecturer}
                                        </Grid>
                                        <Grid item xs={2} alignItems="center">
                                            <strong>Date: </strong>
                                            {fromMilisecondsToDisplayFormatDateString(
                                                schedule.date
                                            )}
                                        </Grid>
                                        <Grid item xs={user.role === 2 ? 2 : 5}>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}>
                                                <strong>Slot: </strong>
                                                {schedule.slot}
                                            </div>
                                        </Grid>
                                        {user.role === 2 ? (
                                            <Grid item xs={3}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="flex-end">
                                                    <Button
                                                        disabled={!isValidDate(
                                                            schedule.date
                                                        )}
                                                        onClick={() =>
                                                            takeAttendance(
                                                                index
                                                            )
                                                        }
                                                        variant="contained">
                                                        Take Attendance
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        ) : (
                                            <></>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
        </div>
    );
}
