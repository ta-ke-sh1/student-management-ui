import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CoursesCards(props) {
    return (
        <>
            <Link to={"/course"}>
                <div className="course-cards-container">
                    <Grid container spacing={4}>
                        {props.courses &&
                            props.courses.map((course) => (
                                <Grid item xs={12} md={4}>
                                    <div className="course-card" style={{
                                        backgroundImage: `url(${process.env.REACT_APP_HOST_URL + "/courses/" + course.courseId + "/banner/banner.jpg"})`
                                    }}>
                                        <div className="text-line">
                                            <span>
                                                {course.className +
                                                    " - " +
                                                    course.courseId +
                                                    " - " +
                                                    course.courseName +
                                                    " - " +
                                                    course.teacher}
                                            </span>

                                        </div>
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </Link>
        </>
    );
}
