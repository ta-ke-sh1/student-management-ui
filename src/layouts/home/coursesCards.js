import { Grid } from "@mui/material";

export default function CoursesCards(props) {
    return (
        <>
            <div className="course-cards-container">
                <Grid container spacing={2}>
                    {props.courses &&
                        props.courses.map((course) => (
                            <Grid item xs={12} md={4}>
                                <div className="course-card"></div>
                                {course.className +
                                    " - " +
                                    course.courseId +
                                    " - " +
                                    course.courseName +
                                    " - " +
                                    course.teacher}
                            </Grid>
                        ))}
                </Grid>
            </div>
        </>
    );
}
