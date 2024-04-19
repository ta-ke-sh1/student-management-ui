import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Constants from "../../../../../utils/constants";

export default function FeedbackForm(props) {
    const [comment, setComment] = useState(props.feedback.comments ?? "")

    const handleConfirm = () => {
        axios.put(process.env.REACT_APP_HOST_URL + "/feedback", {
            id: props.feedback.id,
            comments: comment
        }).then((res) => {
            if (res.data.status) {
                props.closeHandler()
                props.refresh()
                props.sendToast("success", "Feedback updated!")
            } else {
                props.sendToast("error", "Failed to edit feedback")
            }
        })
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage feedback</h2>
                    <p style={{
                        marginBottom: 0
                    }}>You can only edit the feedback's comment</p>
                </Grid>
                <Grid item xs={12} md={12} sx={{ margin: 0 }}>
                    Course ID: <bold style={{ color: 'black' }} className="bold">{props.feedback.course_id}</bold> <br />
                    Lecturer ID: <bold style={{ color: 'black' }} className="bold">{props.feedback.lecturer_id}</bold> <br />
                    Student ID: <bold style={{ color: 'black' }} className="bold">{props.feedback.student_id}</bold> <br />
                </Grid>
                <Grid item xs={12} md={12}>
                    <div style={{ marginBottom: '10px' }}>
                        Question 1: From 1-5, rate your lecturer's overall
                        punctuality during the course:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q1}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 2: From 1-5, did your lecturer meet your expectation?:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q2}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 3: From 1-5, rate your lecturer's
                        enthusiasm about the course:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q3}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 4: From 1-5, rate your lecturer answers to
                        your questions:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q4}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 5: From 1-5, rate the knowledge level that
                        you gained after this course:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q5}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 6: From 1-5, assess the lecturer's ability
                        in guiding you through the assignment:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q6}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 7: From 1-5, did the lessons knowledge
                        sufficient to do the assignments?:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q7}</bold>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Question 8: From 1-5, were you satisfied with the
                        course overall knowledge and content?:<br />
                        <bold style={{ color: 'black' }} className="bold">Student response: {props.feedback.q8}</bold>
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField onChange={(e) => setComment(e.target.value)} value={comment} id="form-building" fullWidth label="Comments" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
