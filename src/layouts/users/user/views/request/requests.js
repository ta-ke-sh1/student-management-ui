import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import RequestsForm from "./requestForm";
import { ToastContainer, toast } from "react-toastify";
import { getAllHeaderColumns } from "../../../../../utils/utils";
import Constants from "../../../../../utils/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const headCells = [
    {
        id: "user_id",
        numeric: false,
        disablePadding: true,
        label: "Requests Id",
    },
    {
        id: "request_type",
        numeric: true,
        disablePadding: false,
        label: "Request Type",
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Date",
    },
    {
        id: "document",
        numeric: true,
        disablePadding: false,
        label: "Document",
    },
    {
        id: "comments",
        numeric: true,
        disablePadding: false,
        label: "Comments",
    },
];

export default function RequestsTab(props) {
    const constants = new Constants();

    // Campus requests data
    const [rows, setRows] = useState([]);

    // Selected requests state for editing
    const [request, setRequest] = useState({});

    const [date, setDate] = useState(dayjs(new Date()))
    const [user_id, setUserId] = useState("")
    const [request_type, setRequestType] = useState("")

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [selected, setSelected] = useState([]);

    const [tableTitle, setTableTitle] = useState("All Requests");

    useEffect(() => {
        fetchRows();

        return function cleanUp() {
            localStorage.removeItem("requestsData");
        }
    }, []);

    const fetchRows = () => {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/request").then((res) => {
                if (!res.data.status) {
                    props.sendToast("error", res.data.data);
                } else {
                    let data = [];
                    res.data.data.forEach((request) => {
                        data.push(request);
                    });
                    setRows(data);
                    localStorage.setItem("requestsData", JSON.stringify(data));
                }
            });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleEdit = (id) => {
        try {
            let request = fetchData(id);
            setRequest(request);
            setOpenModal(true);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleDelete = (index) => {
        try {
            setDialogTitle("Delete Requests");
            setDialogContent("This requests will be deleted, are you sure? This change cannot be undone");
            setOpen(true);
            setSelected(index);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleDeleteRequest = () => {
        try {
            let query = [];
            if (Array.isArray(selected)) {
                query = selected.join("@");
            } else {
                query = selected;
            }

            console.log(query);
            axios.delete(process.env.REACT_APP_HOST_URL + "/campus/requests?q=" + query).then((res) => {
                console.log(res);
                setOpen(false);
            });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const fetchData = (id) => {
        return rows.find((row) => row.id === id);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let data = localStorage.getItem("requestsData");
        data = JSON.parse(data);
        if (user_id !== "") {
            data = data.filter((row) => row.user_id.startsWith(user_id));
        }
        if (request_type !== "") {
            data = data.filter((row) => row.request_type === request_type);
        }

        setRows(data);
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setRequestType("");
        setDate(dayjs(new Date()))
        setUserId("")
        setRows(JSON.parse(localStorage.getItem("requestsData")));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSearchInfo = () => {

    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6}>
                    <div className="big-widget" style={{ paddingBottom: "15px" }}>
                        <h2>Requests Control</h2>
                        <p>Search for a requests</p>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <TextField value={user_id} onChange={(e) => setUserId(e.target.value)} id="form-user-id" fullWidth label="User Id" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="programme-select-label">Request Type</InputLabel>
                                    <Select
                                        id="form-programme"
                                        labelId="programme-select-label"
                                        value={request_type}
                                        label="Request Type"
                                        onChange={(e) => {
                                            setRequestType(e.target.value);
                                        }}
                                    >
                                        {constants.requestTypes.map((requestType) =>
                                            <MenuItem key={"option-requestType-" + requestType.id} value={requestType.id}>
                                                {requestType.id} - {requestType.name}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleSearch(e)}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClearSearch(e)}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} xl={6}>
                    <div
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
                            width: "100%",
                            height: "195px",
                            borderRadius: "10px",
                            backgroundSize: "contain",
                        }}
                    ></div>
                </Grid>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                handleRefreshEntry={fetchRows}
                                handleAddEntry={() => {
                                    toast.error("This function is prohibited", {
                                        position: "bottom-left"
                                    })
                                }}
                                isCampusControl={true}
                                handleSearchInfo={handleSearchInfo}
                                title={tableTitle}
                                rows={rows}
                                headCells={headCells}
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{
                    zIndex: 100000,
                }}
            >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteRequest}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}
                >
                    <RequestsForm closeHandler={handleCloseModal} request={request} refresh={fetchRows} />
                </DialogContent>
            </Dialog>

            <ToastContainer />
        </>
    );
}
