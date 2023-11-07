import { Suspense, useEffect, useState } from "react";
import Loading from "../../../../../common/loading/loading";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { fromMilisecondsToDisplayFormatDateString } from "../../../../../utils/utils";

export default function CoursesUser(props) {
    const [otherCourses, setOtherCourses] = useState([])
    const [onGoingCourses, setOngoingCourses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCourse();
        console.log()

        return function cleanUp() {
            localStorage.removeItem("course")
        }
    }, [])

    const handleNavigate = (id) => {
        navigate("/course/" + id)
    }

    function fetchCourse() {
        axios.get(process.env.REACT_APP_HOST_URL + "/course?id=ductm", {}).then((res) => {
            if (res.data.status) {
                let courses = res.data.data
                let ongoing = [];
                let others = [];
                courses.forEach((course) => {
                    console.log(new Date().getTime())
                    let currentTime = new Date().getTime()
                    if (course.endDate >= currentTime && course.startDate <= currentTime) {
                        ongoing.push(course)
                    } else {
                        others.push(course)
                    }
                })
                setOtherCourses(others);
                setOngoingCourses(ongoing);
                localStorage.setItem("course", JSON.stringify(courses))
            } else {
                props.sendToast("error", res.data.data)
            }
        })
    }

    return (
        <Suspense fallback={<Loading />}>
            <div
                style={{
                    marginBottom: "40px",
                }}
            >
                <h2
                    className="bold"
                    style={{
                        fontSize: "1.75rem",
                    }}
                >
                    Ongoing Courses
                </h2>
                <Grid container spacing={4}>
                    {
                        onGoingCourses.length > 0 ?
                            onGoingCourses.map((course, index) => {
                                return (
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Card sx={{ width: 345 }} >
                                            <CardActionArea onClick={() => handleNavigate(course.id)}>
                                                <CardMedia
                                                    sx={{ height: 120, backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + (index + 1) + ".jpg)", }}
                                                />
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                        {course.id}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{
                                                        fontWeight: "bold",
                                                        color: "primary"
                                                    }} component="div">
                                                        {course.subject}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        Lecturer: {course.lecturer}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        From {fromMilisecondsToDisplayFormatDateString(course.startDate)} to {fromMilisecondsToDisplayFormatDateString(course.endDate)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })
                            : <>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Typography>
                                        Not any ongoing courses right now
                                    </Typography>
                                </Grid>
                            </>
                    }
                </Grid>
                {
                    otherCourses.length > 0 ? <h2
                        className="bold"
                        style={{
                            fontSize: "1.75rem",
                        }}
                    >
                        All Courses
                        <Grid container spacing={4}>{
                            otherCourses.map((course, index) => {
                                return (
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Card sx={{ width: 345 }}>
                                            <CardMedia
                                                sx={{ height: 120, backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + (index + 1) + ".jpg)", }}
                                            />
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                    {course.id}
                                                </Typography>
                                                <Typography variant="h5" sx={{
                                                    fontWeight: "bold",
                                                    color: "primary"
                                                }} component="div">
                                                    {course.subject}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    Lecturer: {course.lecturer}
                                                </Typography>
                                                <Typography variant="body2">
                                                    From {fromMilisecondsToDisplayFormatDateString(course.startDate)} to {fromMilisecondsToDisplayFormatDateString(course.endDate)}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" onClick={() => handleNavigate(course.id)}>
                                                    See Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </h2> : <></>
                }

            </div>
        </Suspense>
    )
}