import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { fromMilisecondsToDisplayFormatDateString, normalizeIndex } from "../../utils/utils";
import AssignmentGradingModal from "./components/modal/assignment_grading_modal";

export default function AssignmentTab(props) {
    const course = JSON.parse(localStorage.getItem("assignment"));
    const [assignments, setAssignments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [assignment, setAssignment] = useState({});

    useEffect(() => {
        fetchRows();
    }, [])

    function fetchRows() {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/courseworks/submissions", {
                params: {
                    course_id: course.id,
                    assignment_id: course.name
                }
            }).then((res) => {
                if (res.data.status) {
                    console.log(res.data.data)
                    setAssignments(res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            })
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function handleDownload() { }

    function handleGrade(id) {
        let asm = assignments.find((row) => row.id === id);
        setAssignment(asm);
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const numberGradeToText = (grade) => {
        if (grade <= 0) return "Not yet"
        else if (grade < 5) return "Refer"
        else if (grade < 7) return "Pass"
        else if (grade < 8.6) return "Merit"
        else return "Distinction"
    }

    return (<>
        <div>
            <h3>Submitted</h3>
            <Grid container spacing={3}>
                {
                    assignments.length > 0 ? assignments.map((assignment, index) => {
                        return (
                            <Grid key={"assignment-" + index + "-" + assignment.user_id} item sm={12} >
                                <Card>
                                    <CardMedia sx={{
                                        width: "150px",
                                        backgroundImage:
                                            `url(${process.env.PUBLIC_URL}/banner/banner` +
                                            normalizeIndex(index + 1) +
                                            ".jpg)",
                                    }}>
                                    </CardMedia>
                                    <CardContent sx={{
                                        padding: "20px",
                                        flex: "1 0 auto",
                                    }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={1}>
                                                <strong style={{ marginRight: '10px' }}>No.{index}</strong>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <strong style={{ marginRight: '10px' }}>Student: {assignment.user_id}</strong>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <strong style={{ marginRight: '10px' }}>Submitted at: {fromMilisecondsToDisplayFormatDateString(assignment.date)}</strong>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="outlined" onClick={handleDownload}>Download</Button>
                                            </Grid>
                                            <Grid item justify="flex-end" xs={1}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Button variant="outlined" onClick={() => handleGrade(assignment.id)}>Grade</Button>
                                                </Box>
                                            </Grid>
                                            <Grid item justify="flex-end" xs={2}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <strong style={{ marginRight: '10px' }}>Grade:</strong> {assignment.grade ? <>{assignment.grade}</> : <>Not yet</>}
                                                </Box>
                                            </Grid>
                                            <Grid item justify="flex-end" xs={1}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    {numberGradeToText(assignment.grade)}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                </Card>
                            </Grid>
                        )
                    }) :
                        <>
                            <p style={{
                                marginLeft: '25px'
                            }}>Nobody has submitted their coursework.</p>
                        </>
                }
            </Grid>
        </div>

        <Dialog className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
            <DialogContent
                sx={{
                    bgcolor: "background.paper",
                    boxShadow: 12,
                }}
            >
                <AssignmentGradingModal assignment={assignment} closeHandler={handleCloseModal} refresh={fetchRows} />
            </DialogContent>
        </Dialog>
    </>)
}