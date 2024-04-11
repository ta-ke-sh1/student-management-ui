import axios from "axios";
import { useEffect, useState } from "react";

export default function FeedbackLecturerTab(props) {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    function fetchFeedbacks() {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/lecturer/course", {
                params: {
                    course_id: props.course.id,
                },
            })
            .then((res) => {
                if (res.status) {
                    setFeedbacks(res.data);
                } else {
                    props.sendToast("error", res.data);
                }
            });
    }

    return (
        <>
            <h3>Feedbacks</h3>
            <div
                style={{
                    width: "100%",
                    position: "relative",
                }}>
                {feedbacks.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid xs={3}>Student ID</Grid>
                            {[...Array(8).keys()].map((i) => {
                                return (
                                    <Grid item xs={1}>
                                        Question {i}
                                    </Grid>
                                );
                            })}
                            <Grid xs={1}>Total</Grid>
                        </Grid>
                        {feedbacks.map((feedback, index) => {
                            return (
                                <Grid
                                    sx={{
                                        borderBottom: "1px solid black",
                                        margin: "10px 0",
                                    }}
                                    container
                                    spacing={2}
                                    key={
                                        "feedback-item-" +
                                        feedback.student_id +
                                        "-" +
                                        index
                                    }>
                                    <Grid xs={3}>{feedback.student_id}</Grid>
                                    {[...Array(8).keys()].map((i) => {
                                        return (
                                            <Grid item xs={1}>
                                                {feedback["q" + i]}
                                            </Grid>
                                        );
                                    })}
                                    <Grid xs={1}>{feedback.total}</Grid>
                                    {feedback.comment ? (
                                        <Grid xs={12}>
                                            Additional comment: <br />
                                            {feedback.comment}
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                            );
                        })}
                    </>
                ) : (
                    <>Currently no students have submitted their feedback yet</>
                )}
            </div>
        </>
    );
}
