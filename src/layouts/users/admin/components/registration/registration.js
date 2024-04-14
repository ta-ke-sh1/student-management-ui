import { useState, useEffect, useRef } from "react";
import { TextField, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllHeaderColumns } from "../../../../../utils/utils";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "group_id",
        numeric: true,
        disablePadding: false,
        label: "Group ID",
    },
    {
        id: "student_id",
        numeric: true,
        disablePadding: false,
        label: "Student ID",
    },
    {
        id: "firstName",
        numeric: true,
        disablePadding: false,
        label: "First Name",
    },
    {
        id: "lastName",
        numeric: true,
        disablePadding: false,
        label: "Last Name",
    },
    {
        id: "dob",
        numeric: true,
        disablePadding: false,
        label: "Date of Birth",
    },
];

export default function RegistrationAdmin(props) {
    const tableRef = useRef();
    const [registration, setRegistration] = useState("HN");

    // Registration room data
    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);

    const [registrationId, setRegistrationId] = useState("");
    const [groupId, setGroupId] = useState("");
    const [studentId, setStudentId] = useState("");

    const [tableTitle, setTableTitle] = useState("All Registrations");

    useEffect(() => {
        fetchRows();
    }, []);

    const fetchRows = () => {
        let result = [];
        try {
            axios
                .get(
                    process.env.REACT_APP_HOST_URL + "/course/registration/all"
                )
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

    const handleRefreshEntry = () => {
        console.log("Fetch rows!");
        fetchRows();
    };

    const handleEdit = (id) => {
        props.sendToast("error", "Cannot edit student's registration!");
    };

    const handleDelete = (index) => {
        props.sendToast("error", "Cannot delete student's registration!");
    };

    const handleSearch = () => {
        try {
            tableRef.current.clearSelected();
            let query = "Registration: ";
            let searchResult = rowData;
            if (registrationId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.id.startsWith(registrationId)
                );
            }

            if (groupId !== "") {
                searchResult = searchResult.filter((r) =>
                    r.group_id.startsWith(groupId)
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
        setRegistrationId("");
        setStudentId("");
        setGroupId("");
        setTableTitle("All Registrations");
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Registration Search</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={registrationId}
                                    onChange={(e) => {
                                        setRegistrationId(e.target.value);
                                    }}
                                    id="form-registrationId"
                                    fullWidth
                                    label="Registration Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={groupId}
                                    onChange={(e) => {
                                        setGroupId(e.target.value);
                                    }}
                                    id="form-groupId"
                                    fullWidth
                                    label="Class Id"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                        <div className="registration-list">
                            <CustomTable
                                ref={tableRef}
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
