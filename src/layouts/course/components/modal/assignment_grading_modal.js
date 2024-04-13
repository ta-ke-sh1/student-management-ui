import {
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import Constants from "../../../../utils/constants";
import { useState } from "react";
import { fromMilisecondsToDisplayFormatDateString } from "../../../../utils/utils";

export default function AssignmentGradingModal(props) {
    const constants = new Constants();

    const [grade, setGrade] = useState(props.assignment.grade ?? 0);
    const [gradeText, setGradeText] = useState(
        props.assignment.gradeText ?? "Refer"
    );
    const [comments, setComments] = useState(props.assignment.comments ?? "");

    function submitGrade() {
        try {
            axios
                .post(process.env.REACT_APP_HOST_URL + "/submission/grade", {
                    id: props.assignment.id,
                    grade: grade,
                    gradeText: gradeText,
                    comments: comments,
                })
                .then((res) => {
                    if (res.data.status) {
                        props.sendToast(
                            "success",
                            "Grade submitted successfully!"
                        );
                        props.closeHandler();
                        props.refresh();
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Grade Form</h2>
                    <p>Student: {props.assignment.user_id}</p>
                    <p>
                        Submitted at:{" "}
                        {fromMilisecondsToDisplayFormatDateString(
                            props.assignment.date
                        )}
                    </p>
                </Grid>
                <Divider />
                <Grid item sm={12} xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={grade}
                        type="number"
                        onChange={(e) => setGrade(e.target.value)}
                        label="Grade Number"
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Grade Text</InputLabel>
                        <Select
                            value={gradeText}
                            label="Grade Text"
                            onChange={(e) => setGradeText(e.target.value)}>
                            {constants.grades.map((grade) => {
                                return (
                                    <MenuItem
                                        key={"form-grade" + grade.value}
                                        value={grade.value}>
                                        {grade.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        multiline
                        rows={7}
                        fullWidth
                        onChange={(e) => setComments(e.target.value)}
                        value={comments}
                        label="Comments"
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <Button
                        sx={{ padding: "10px 30px" }}
                        fullWidth
                        variant="outlined"
                        onClick={submitGrade}>
                        Submit
                    </Button>
                </Grid>
                <Grid item sm={6} xs={6}>
                    <Button
                        sx={{ padding: "10px 30px" }}
                        color="error"
                        fullWidth
                        variant="outlined"
                        onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
