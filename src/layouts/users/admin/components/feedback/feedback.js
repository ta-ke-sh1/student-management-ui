import { useState, useEffect, useRef } from "react";
import { TextField, Button, Grid, Dialog, DialogContent } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchDocuments, getAllHeaderColumns } from "../../../../../utils/utils";
import FeedbackForm from "./feedbackForm";
import { items, cacheData, getArrayCache } from "../../../../../utils/dataOptimizer";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "course_id",
        numeric: true,
        disablePadding: false,
        label: "Course Id",
    },
    {
        id: "lecturer_id",
        numeric: true,
        disablePadding: false,
        label: "Lecturer Id",
    },
    {
        id: "student_id",
        numeric: true,
        disablePadding: false,
        label: "Student Id",
    },
    {
        id: "q1",
        numeric: true,
        disablePadding: false,
        label: "Q1",
    },
    {
        id: "q2",
        numeric: true,
        disablePadding: false,
        label: "Q2",
    },
    {
        id: "q3",
        numeric: true,
        disablePadding: false,
        label: "Q3",
    },
    {
        id: "q4",
        numeric: true,
        disablePadding: false,
        label: "Q4",
    },
    {
        id: "q5",
        numeric: true,
        disablePadding: false,
        label: "Q2",
    },
    {
        id: "q6",
        numeric: true,
        disablePadding: false,
        label: "Q6",
    },
    {
        id: "q7",
        numeric: true,
        disablePadding: false,
        label: "Q7",
    },
    {
        id: "q8",
        numeric: true,
        disablePadding: false,
        label: "Q8",
    },
    {
        id: "total",
        numeric: true,
        disablePadding: false,
        label: "Total",
    }, {
        id: "comments",
        numeric: true,
        disablePadding: false,
        label: "Comments",
    },
];

export default function FeedbackAdmin(props) {
    const tableRef = useRef();
    const [feedback, setFeedback] = useState({});

    // Feedback room data
    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);

    const [feedbackId, setFeedbackId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [lecturerId, setLecturerId] = useState("");

    const [tableTitle, setTableTitle] = useState("All Feedbacks");

    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)

    useEffect(() => {
        const data = getArrayCache(items.Feedback)
        if (data.length > 0) {
            setRowData(data)
            setRows(data)
        } else {
            fetchRows();
        }

    }, []);

    const fetchRows = () => {
        let result = [];
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/feedback")
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    }

                    res.data.data.forEach((room) => {
                        result.push(room);
                    });

                    setRows(result);
                    setRowData(result);
                    cacheData(items.Feedback, result)
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleAddEntry = () => {
        props.sendToast("error", "Only students can add feedback!");
    }

    const handleRefreshEntry = () => {
        fetchRows();
    };

    const handleEdit = (id) => {
        const feeback = fetchDocuments(rowData, id)
        setFeedback(feeback)
        setOpen(true)
    };

    const handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_HOST_URL + "/feedback", {
            params: {
                id: id
            }
        }).then((res) => {
            if (res.data.status) {
                props.sendToast("success", "Deleted student feedback with id " + id);
                fetchRows();
            } else {
                props.sendToast("error", "Cannot delete feedback " + id);
            }
        })
    };

    const handleSearch = () => {
        try {
            tableRef.current.clearSelected();
            let query = "Feedback: ";
            let searchResult = rowData;
            if (feedbackId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.id.startsWith(feedbackId)
                );
            }

            if (courseId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.course_id.startsWith(courseId)
                );
            }

            if (lecturerId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.lecturer_id.startsWith(lecturerId)
                );
            }

            if (studentId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.student_id.startsWith(studentId)
                );
            }

            setRows(searchResult);
            setTableTitle(query);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setRows(rowData);
        setFeedbackId("");
        setStudentId("");
        setCourseId("");
        setLecturerId("");
        setTableTitle("All Feedbacks");
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Feedback Search</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={feedbackId}
                                    onChange={(e) => {
                                        setFeedbackId(e.target.value);
                                    }}
                                    id="form-feedbackId"
                                    fullWidth
                                    label="Feedback Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={courseId}
                                    onChange={(e) => {
                                        setCourseId(e.target.value);
                                    }}
                                    id="form-courseId"
                                    fullWidth
                                    label="Course Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={lecturerId}
                                    onChange={(e) => {
                                        setLecturerId(e.target.value);
                                    }}
                                    id="form-lecturerId"
                                    fullWidth
                                    label="Lecturer Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={studentId}
                                    onChange={(e) => {
                                        setStudentId(e.target.value);
                                    }}
                                    id="form-studentId"
                                    fullWidth
                                    label="Student Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={(e) => handleSearch(e)}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    color="error"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={(e) => handleClearSearch(e)}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} xl={6}>
                    <div
                        style={{
                            backgroundImage:
                                `url(${process.env.PUBLIC_URL}/banner/banner` +
                                5 +
                                ".jpg)",
                            width: "100%",
                            height: "240px",
                            borderRadius: "10px",
                            backgroundSize: "contain",
                        }}></div>
                </Grid>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="feedback-list">
                            <CustomTable
                                ref={tableRef}
                                title={tableTitle}
                                rows={rows}
                                headCells={headCells}
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleRefreshEntry={handleRefreshEntry}
                                handleAddEntry={handleAddEntry}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Dialog
                className="modal"
                fullWidth={true}
                open={open}
                onClose={handleClose}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}>
                    <FeedbackForm
                        closeHandler={handleClose}
                        feedback={feedback}
                        refresh={fetchRows}
                        sendToast={props.sendToast}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
