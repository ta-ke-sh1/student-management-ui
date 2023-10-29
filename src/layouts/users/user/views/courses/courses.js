import { Suspense, useState } from "react";
import Loading from "../../../../../common/loading/loading";
import { Card, Grid, Typography } from "@mui/material";

export default function CoursesUser(props) {
    const [courses, setCourses] = useState([])

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
                        courses.length > 0 ?
                            courses.map((course) => {
                                return (
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Card>
                                            Test
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

                <h2
                    className="bold"
                    style={{
                        fontSize: "1.75rem",
                    }}
                >
                    All Courses
                </h2>
            </div>
        </Suspense>
    )
}