import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeedbackStudentTab(props) {
    const hasExpired = props.course.endDate > new Date();
    const [canSubmit, setCanSubmit] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [feedback, setFeedback] = useState({
        q1: 3,
        q2: 3,
        q3: 3,
        q4: 3,
        q5: 3,
        q6: 3,
        q7: 3,
        q8: 3,
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback((feedback) => ({ ...feedback, [name]: parseInt(value) }));
    };

    const fetchFeedback = () => {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/feedback", {
                params: {
                    id: "Feedback-" + props.course.id + "-" + props.user.id,
                },
            })
            .then((res) => {
                if (res.status) {
                    if (res.data === -1) {
                        setHasSubmitted(true);
                    }
                } else {
                    props.sendToast("error", "Error in fetching feedback");
                }
            });
    };

    const sendFeedback = () => {
        if (!canSubmit) {
            return;
        }
        setCanSubmit(false);
        const total =
            feedback.q1 +
            feedback.q2 +
            feedback.q3 +
            feedback.q4 +
            feedback.q5 +
            feedback.q6 +
            feedback.q7 +
            feedback.q8;
        axios
            .post(process.env.REACT_APP_HOST_URL + "/feedback", {
                ...feedback,
                total: total,
                course_id: props.course.id,
                lecturer_id: props.course.lecturer,
                student_id: props.user.id,
            })
            .then((res) => {
                setCanSubmit(true);
                setHasSubmitted(true);
            });
        console.log(feedback);
    };

    return (
        <>
            {hasExpired ? (
                <>
                    <h3>
                        {!hasSubmitted
                            ? "The course has ended. Please answer the following questions:"
                            : "Student has already submitted feedback for this course!"}
                    </h3>
                    {!hasSubmitted ? (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q1"
                                        value={feedback.q1}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q2"
                                        value={feedback.q2}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q3"
                                        value={feedback.q3}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q4"
                                        value={feedback.q4}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q5"
                                        value={feedback.q5}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q6"
                                        value={feedback.q6}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q7"
                                        value={feedback.q7}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>
                                        From 1-5, rate your lecturer
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="q8"
                                        value={feedback.q8}
                                        onChange={handleChange}>
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio />}
                                            label={"1"}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label={"2"}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                            label={"3"}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                            label={"4"}
                                        />
                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                            label={"5"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={(e) => sendFeedback(e)}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <>
                    <div>
                        <h3>
                            This course does not have any available feedback
                            questions!
                        </h3>
                    </div>
                </>
            )}
        </>
    );
}
