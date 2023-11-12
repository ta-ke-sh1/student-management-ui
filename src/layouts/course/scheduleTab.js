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

export default function ScheduleTab(props) {
    const [schedules, setSchedules] = useState([
        {
            session: 1,
            lecturer: "tungdt",
            date: 1697553920,
            slot: 2,
        },
        {
            session: 2,
            lecturer: "tungdt",
            date: 1697553920,
            slot: 3,
        },
        {
            session: 3,
            lecturer: "tungdt",
            date: 1697640320,
            slot: 2,
        },
        {
            session: 4,
            lecturer: "tungdt",
            date: 1697640320,
            slot: 3,
        },
    ]);

    const [participants, setParticipants] = useState([
        {
            id: "trunght",
            firstName: "Trung",
            lastName: "Ha The",
        },
    ]);

    useEffect(() => { }, []);

    const takeAttendance = () => { };

    const normalizeIndex = (index) => {
        const limit = 5;
        return index > limit ? (index % (limit + 1)) + 1 : index;
    };

    function isValidDate(date) {
        const current = new Date().getTime();
        return (
            date * 1000 > current - 86400000 && date * 1000 < current + 86400000
        );
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
            {schedules.map((schedule, index) => {
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
                                        normalizeIndex(index + 1) +
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
                                        {schedule.session}
                                    </Grid>
                                    <Grid item xs={3} alignItems="center">
                                        <strong>Lecturer: </strong>
                                        {schedule.lecturer}
                                    </Grid>
                                    <Grid item xs={2} alignItems="center">
                                        <strong>Date: </strong>
                                        {fromMilisecondsToDisplayFormatDateString(
                                            schedule.date * 1000
                                        )}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <strong>Slot: </strong>
                                        {schedule.slot}
                                    </Grid>
                                    {
                                        <Grid item xs={3}>
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end">
                                                <Button
                                                    disabled={isValidDate(
                                                        schedule.date * 1000
                                                    )}
                                                    onClick={takeAttendance}
                                                    variant="contained">
                                                    Take Attendance
                                                </Button>
                                            </Box>
                                        </Grid>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
