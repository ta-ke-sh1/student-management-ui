import { useState, useEffect } from "react";
import { TextField, Select, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllHeaderColumns } from "../../../../../utils/utils";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Feedback Id",
    },
    {
        id: "course_id",
        numeric: false,
        disablePadding: true,
        label: "Course Id",
    },
    {
        id: "lecturer_id",
        numeric: false,
        disablePadding: true,
        label: "Lecturer Id",
    },
    {
        id: "student_id",
        numeric: false,
        disablePadding: true,
        label: "Student Id",
    },
    {
        id: "q1",
        numeric: true,
        disablePadding: false,
        label: "Question 1",
    },
    {
        id: "q2",
        numeric: true,
        disablePadding: false,
        label: "Question 2",
    },
    {
        id: "q3",
        numeric: true,
        disablePadding: false,
        label: "Question 3",
    },
    {
        id: "q4",
        numeric: true,
        disablePadding: false,
        label: "Question 4",
    },
    {
        id: "q5",
        numeric: true,
        disablePadding: false,
        label: "Question 2",
    },
    {
        id: "q6",
        numeric: true,
        disablePadding: false,
        label: "Question 6",
    },
    {
        id: "q7",
        numeric: true,
        disablePadding: false,
        label: "Question 7",
    },
];

export default function FeedbackAdmin(props) {
    const [campus, setFeedback] = useState("HN");

    // Feedback room data
    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);

    const [number, setNumber] = useState("");

    // Selected room state for editing

    const [selected, setSelected] = useState([]);

    const [tableTitle, setTableTitle] = useState("All Feedbacks");

    useEffect(() => {
        fetchRows();
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
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const fetchFeedback = (id) => {
        try {
            return rows.find((row) => row.id === id);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleRefreshEntry = () => {
        console.log("Fetch rows!");
        fetchRows();
    };

    const handleEdit = (id) => {
        props.sendToast("error", "Cannot edit student's feedback!");
    };

    const handleDelete = (index) => {
        props.sendToast("error", "Cannot delete student's feedback!");
    };

    const handleSearch = () => {
        try {
            let query = "Feedback: ";
            let searchResult = rowData.filter((r) => r.campus === campus);
            query += campus;

            if (number !== "") {
                query += " / Feedback number: " + number;
                searchResult = rowData.filter(
                    (r) => r.campus === campus && r.number === number
                );
            }

            if (!Array.isArray(searchResult)) {
                searchResult = [];
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
        setFeedback("HN");
        setNumber("");
        setTableTitle("All Feedbacks");
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Feedback Control</h2>
                        <p>Search for your room</p>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}></Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={number}
                                    onChange={(e) => {
                                        setNumber(e.target.value);
                                    }}
                                    id="form-number"
                                    fullWidth
                                    label="Feedback Number"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={(e) => handleSearch(e)}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                            height: "225px",
                            borderRadius: "10px",
                            backgroundSize: "contain",
                        }}></div>
                </Grid>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                handleAddEntry={() => {
                                    handleOpenModal();
                                }}
                                title={tableTitle}
                                rows={rows}
                                headCells={headCells}
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleRefreshEntry={handleRefreshEntry}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
