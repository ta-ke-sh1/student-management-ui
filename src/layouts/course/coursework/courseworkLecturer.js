import { Grid, Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AssignmentGradingModal from "../components/modal/assignment_grading_modal";
import { formatSecondsToDate } from "../../../utils/utils";
import lodash from "lodash";

export default function AllSubmissionsTab(props) {
    console.log(props);

    const [submission, setSubmission] = useState();
    const [submissions, setSubmissions] = useState([]);
    const [hasFetch, setHasFetch] = useState(false);
    const [participants, setParticipants] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log("Test");
        fetchParticipants(props.course.id);
    }, [hasFetch]);

    function fetchParticipants(id) {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/course/participants", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                if (res.data.status) {
                    setParticipants(res.data.data);
                }
            });
    }

    function fetchAssignments(id) {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/submission/course", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                if (res.data.status) {
                    setSubmissions(res.data.data);
                    setHasFetch(true);
                }
            });
    }

    function getRemainingSubmissions() {
        let remains = lodash.differenceWith(
            participants,
            submissions,
            function (o1, o2) {
                return o1["student_id"] == o2["user_id"];
            }
        );
        console.log(remains);
        return remains ?? [];
    }

    return (
        <>
            <div className="curriculum-container">
                <div
                    style={{
                        height: "40px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "20px 0",
                    }}>
                    <h3
                        className="bold"
                        style={{
                            lineHeight: "1.5rem",
                            fontSize: "1.75rem",
                        }}>
                        Submissions
                    </h3>
                    <Button
                        onClick={props.handleOpenCourseworkModal}
                        variant="contained">
                        Add New Coursework
                    </Button>
                </div>

                <div
                    style={{
                        marginBottom: "20px",
                        paddingBottom: "10px",
                    }}>
                    {props.course.assignments ? (
                        props.course.assignments.length > 0 ? (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                    }}>
                                    <div
                                        style={{
                                            marginRight: "20px",
                                            paddingTop: "5px",
                                        }}>
                                        Select an assignment:
                                    </div>
                                    {props.course.assignments.map(
                                        (assignment) => {
                                            return (
                                                <Button
                                                    sx={{
                                                        marginRight: 10,
                                                    }}
                                                    variant="outlined"
                                                    onClick={() => {
                                                        fetchAssignments(
                                                            assignment.id
                                                        );
                                                    }}>
                                                    {assignment.name}
                                                </Button>
                                            );
                                        }
                                    )}
                                </div>
                            </>
                        ) : (
                            <></>
                        )
                    ) : (
                        <>This course has no assignment yet</>
                    )}
                </div>
                {submissions.length > 0 ? (
                    <>
                        <div
                            className="curriculum-row"
                            style={{
                                fontSize: "13px",
                            }}>
                            <Grid container>
                                <Grid item xs={1}>
                                    Index
                                </Grid>
                                <Grid item xs={1}>
                                    Student
                                </Grid>
                                <Grid item xs={2}>
                                    Submission Time
                                </Grid>
                                <Grid item xs={2}>
                                    File
                                </Grid>
                                <Grid item xs={1}>
                                    Grade Number
                                </Grid>
                                <Grid item xs={1}>
                                    Grade Text
                                </Grid>
                                <Grid item xs={3}>
                                    Comments
                                </Grid>
                                <Grid item xs={1}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end">
                                        Action
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                        {submissions.map((submission, index) => {
                            return (
                                <GradingRow
                                    submission={submission}
                                    index={index}
                                    handleOpen={handleOpen}
                                    handleSetSubmission={() => {
                                        setSubmission(submissions[index]);
                                    }}
                                />
                            );
                        })}
                        <>
                            {getRemainingSubmissions().map(
                                (submission, index) => {
                                    return (
                                        <>
                                            <GradingRow
                                                index={
                                                    submissions.length + index
                                                }
                                                submission={{
                                                    user_id:
                                                        submission.student_id,
                                                    grade: 0,
                                                    gradeText: "N/A",
                                                    comments: "",
                                                    fileNames: [],
                                                }}
                                                handleOpen={handleOpen}
                                                handleSetSubmission={() => {
                                                    setSubmission({
                                                        user_id: submission.id,
                                                        grade: 0,
                                                        gradeText: "N/A",
                                                        comments: "",
                                                        fileNames: [],
                                                    });
                                                }}
                                            />
                                        </>
                                    );
                                }
                            )}
                        </>
                    </>
                ) : (
                    <></>
                )}
                <Modal open={open} onClose={handleClose} sx={{}}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 800,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                        }}>
                        <AssignmentGradingModal
                            closeHandler={handleClose}
                            assignment={submission}
                            sendToast={props.sendToast}
                        />
                    </Box>
                </Modal>
            </div>
        </>
    );
}

function GradingRow(props) {
    const { submission, index } = props;
    return (
        <div className="curriculum-row">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            {index + 1}
                        </Grid>
                        <Grid item xs={1}>
                            {submission.user_id}
                        </Grid>
                        <Grid item xs={2}>
                            {submission.date
                                ? formatSecondsToDate(submission.date)
                                : "Not yet submitted"}
                        </Grid>
                        <Grid item xs={2}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                {submission.fileNames.map((fileName) => {
                                    return <div>{fileName}</div>;
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            {submission.grade}
                        </Grid>
                        <Grid item xs={1}>
                            {submission.gradeText}
                        </Grid>

                        <Grid item xs={3}>
                            {submission.comments}
                        </Grid>
                        <Grid item xs={1}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    onClick={() => {
                                        props.handleSetSubmission(index);
                                        props.handleOpen();
                                    }}>
                                    Grade
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
