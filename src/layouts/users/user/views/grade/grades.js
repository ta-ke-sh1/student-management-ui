import { Grid, Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllSubmissionsTab(props) {
    const [submissions, setSubmissions] = useState([]);
    const [hasFetch, setHasFetch] = useState(false);
    const [isOpen, setOpenModal] = useState(false);

    function fetchAssignments(id) {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/submission/course", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setSubmissions(res.data.data);
                    setHasFetch(true);
                } else {
                    props.sendToast("error", "Failed to fetch assignments");
                }
            });
    }

    function handleSubmit() {
        try {
            axios
                .post(process.env.REACT_APP_HOST_URL + "/schedule/submission", {
                    submissions,
                })
                .then((res) => {
                    if (res.data.status) {
                        props.sendToast("success", "Submisision List Added!");
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function handleReturn() {}

    return (
        <>
            <div className="curriculum-container">
                <h2
                    className="bold"
                    style={{
                        fontSize: "1.75rem",
                        marginBottom: "4px",
                    }}>
                    Submissions
                </h2>
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
                                        List of assignments:
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
                        <div className="curriculum-row">
                            <Grid container>
                                <Grid item xs={2}>
                                    Index
                                </Grid>
                                <Grid item xs={2}>
                                    Student_id
                                </Grid>
                                <Grid item xs={2}>
                                    Submission Time
                                </Grid>
                                <Grid item xs={2}>
                                    File
                                </Grid>
                                <Grid item xs={2}>
                                    Grade
                                </Grid>
                                <Grid item xs={2}>
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
                                <div className="curriculum-row">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={2} sm={2}>
                                                    {index + 1}
                                                </Grid>
                                                <Grid item xs={2} sm={2}>
                                                    {submission.user_id}
                                                </Grid>
                                                <Grid item xs={2} sm={2}>
                                                    {submission.date}
                                                </Grid>
                                                <Grid item xs={4} sm={2}>
                                                    {submission.fileNames.map(
                                                        (fileName) => {
                                                            return (
                                                                <div>
                                                                    {fileName}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </Grid>
                                                <Grid item xs={2} sm={2}>
                                                    {submission.grade}
                                                </Grid>
                                                <Grid item xs={2} sm={2}>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="flex-end">
                                                        <Button>
                                                            Grade Now
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <></>
                )}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setOpenModal(false)}
                sx={{
                    zIndex: 100000000000,
                }}>
                <Box></Box>
            </Modal>
        </>
    );
}
