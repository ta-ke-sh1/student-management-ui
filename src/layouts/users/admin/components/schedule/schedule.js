import { useState, useEffect, useRef } from "react";
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchDocuments, getAllHeaderColumns } from "../../../../../utils/utils";
import CourseScheduleForm from "./scheduleForm";
import { cacheData, getArrayCache, items } from "../../../../../utils/dataOptimizer";

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
        id: "subject",
        numeric: true,
        disablePadding: false,
        label: "Subject",
    },
    {
        id: "session",
        numeric: true,
        disablePadding: false,
        label: "Session",
    },
    {
        id: "lecturer",
        numeric: true,
        disablePadding: false,
        label: "Lecturer",
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Date",
    },
    {
        id: "slot",
        numeric: true,
        disablePadding: false,
        label: "Slot",
    },
    {
        id: "room",
        numeric: true,
        disablePadding: false,
        label: "Room",
    },
];

export default function ScheduleAdmin(props) {
    // Schedule schedule data
    const tableRef = useRef(null);
    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);

    const [scheduleId, setScheduleId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [session, setSession] = useState(0);

    const [tableTitle, setTableTitle] = useState("All Schedules");
    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const [schedule, setSchedule] = useState({});

    const handleOpenModal = () => setOpenModal(true)
    const handleOpenDialog = () => setOpenDialog(true)
    const handleCloseModal = () => setOpenModal(false)
    const handleCloseDialog = () => setOpenDialog(false)

    useEffect(() => {
        const data = getArrayCache(items.Schedule);
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
                .get(process.env.REACT_APP_HOST_URL + "/schedule/all")
                .then((res) => {
                    if (!res.data.status) {
                        props.sendToast("error", res.data.data);
                    }

                    res.data.data.forEach((schedule) => {
                        result.push(schedule);
                    });

                    setRows(result);
                    setRowData(result);
                    cacheData(items.Schedule, result)
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleRefreshEntry = () => {
        fetchRows();
    };

    const handleEdit = (id) => {
        const schedule = fetchDocuments(rowData, id)
        setSchedule(schedule)
        setOpenModal(true)
    };

    const handleDelete = (index) => {
        props.sendToast("error", "Cannot delete student's schedule!");
    };

    const handleSearch = () => {
        try {
            tableRef.current.clearSelected();
            let query = "Schedule: ";
            let searchResult = rowData;
            if (scheduleId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.id.startsWith(scheduleId)
                );
            }

            if (courseId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.course_id.startsWith(courseId)
                );
            }

            if (session !== "") {
                searchResult = searchResult.filter(
                    (r) => r.session === session
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
        setScheduleId("");
        setCourseId("");
        setSession("");
        setTableTitle("All Schedules");
    };

    const handleDeleteRequest = (id) => {

    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Schedule Search</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={scheduleId}
                                    onChange={(e) => {
                                        setScheduleId(e.target.value);
                                    }}
                                    id="form-scheduleId"
                                    fullWidth
                                    label="Schedule Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={session}
                                    onChange={(e) => {
                                        if (e.target.value === "") return;
                                        let val = parseInt(e.target.value);
                                        setSession(isNaN(val) ? 0 : val);
                                    }}
                                    id="form-session"
                                    fullWidth
                                    label="Session"
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
                        <div className="schedule-list">
                            <CustomTable
                                ref={tableRef}
                                title={tableTitle}
                                rows={rows}
                                headCells={headCells}
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleRefreshEntry={handleRefreshEntry}
                                handleAddEntry={() => {
                                    setSchedule({})
                                    handleOpenModal()
                                }}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{
                    zIndex: 100000,
                }}>
                <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once deleted, this document will not be able to be restored!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteRequest}>Accept</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                className="modal"
                fullWidth={true}
                open={openModal}
                onClose={handleCloseModal}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}>
                    <CourseScheduleForm refresh={fetchRows} sendToast={props.sendToast} schedule={schedule} closeHandler={handleCloseModal} />
                </DialogContent>
            </Dialog>
        </>
    );
}
