import { useState, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Grid,
} from "@mui/material";
import CustomTable from "../../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CampusForm from "./campusForm";

import axios from "axios";

function createData(id, campus, building, number, capacity) {
    return {
        id,
        campus,
        building,
        number,
        capacity
    };
}

const rooms = [
    { id: "Room-HN-100", campus: "HN", room: "100", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-101", campus: "HN", room: "101", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-102", campus: "HN", room: "102", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-103", campus: "HCM", room: "103", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-104", campus: "HN", room: "104", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-105", campus: "HN", room: "105", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-106", campus: "HN", room: "106", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-107", campus: "HN", room: "107", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-108", campus: "HN", room: "108", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-109", campus: "DN", room: "109", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-110", campus: "HN", room: "110", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-111", campus: "DN", room: "111", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-112", campus: "HN", room: "112", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-113", campus: "HN", room: "113", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-114", campus: "HN", room: "114", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-407", campus: "CT", room: "407", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-408", campus: "CT", room: "408", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-409", campus: "HN", room: "409", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-410", campus: "HN", room: "410", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-411", campus: "HN", room: "411", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-412", campus: "HN", room: "412", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-413", campus: "HN", room: "413", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-414", campus: "HCM", room: "414", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-415", campus: "HCM", room: "415", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-416", campus: "HCM", room: "416", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-417", campus: "HN", room: "417", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-418", campus: "DN", room: "418", building: "Pham Van Bach", capacity: 100 },
    { id: "Room-HN-419", campus: "HN", room: "419", building: "Pham Van Bach", capacity: 100 },
];

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Room Id",
    },
    {
        id: "campus",
        numeric: true,
        disablePadding: false,
        label: "Campus",
    },
    {
        id: "number",
        numeric: true,
        disablePadding: false,
        label: "Room Number",
    },
    {
        id: "building",
        numeric: true,
        disablePadding: false,
        label: "Building",
    },
    {
        id: "capacity",
        numeric: true,
        disablePadding: false,
        label: "Capacity",
    },
];

export default function CampusAdmin() {
    let campuses = [
        {
            id: "HN",
            name: "Ha Noi",
        },
        {
            id: "HCM",
            name: "Ho Chi Minh",
        },
        {
            id: "DN",
            name: "Da Nang",
        },
        {
            id: "CT",
            name: "Can Tho",
        },
    ];

    const [campus, setCampus] = useState("HN");

    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);
    const [number, setNumber] = useState("");
    const [room, setRoom] = useState({});

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [selected, setSelected] = useState([])

    const [tableTitle, setTableTitle] = useState("All Rooms")

    useEffect(() => {
        fetchRows();
    }, []);

    const fetchRows = () => {
        let res = [];
        rooms.forEach((room) => {
            res.push(
                createData(room.id, room.campus, room.building, room.room, room.capacity)
            );
        });
        setRows(res);
        setRowData(res);
    };

    const fetchRoom = (id) => {
        return rows.find((row) => row.id === id);
    };

    const handleEdit = (id) => {
        let room = fetchRoom(id);
        setRoom({
            id: room.id,
            campus: room.campus,
            building: room.building,
            number: room.number,
            capacity: room.capacity,
        });
        setOpenModal(true);
    };

    const handleDelete = (index) => {
        setDialogTitle("Delete Room");
        setDialogContent(
            "This room will be deleted, are you sure? This change cannot be undone"
        );
        setOpen(true);
        setSelected(index)
        console.log(index);
    };

    const handleDeleteRequest = () => {
        let query = [];
        if (Array.isArray(selected)) {
            query = selected.join("@")
        } else {
            query = selected
        }

        console.log(query)
        axios.delete(process.env.REACT_APP_HOST_URL + "/campus/room?q=" + query).then((res) => {
            console.log(res)
            setOpen(false)
        })
    };

    const handleSearch = (e) => {
        e.preventDefault();

        let query = "Campus: ";
        let searchResult = rowData.filter((r) => r.campus === campus)
        query += campus

        if (number !== "") {
            query += (" / Room number: " + number)
            searchResult = rowData.filter((r) => r.campus === campus && r.number === number)
        }

        if (!Array.isArray(searchResult)) {
            searchResult = [];
        }

        setRows(searchResult)
        setTableTitle(query)
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setRows(rowData);
        setCampus("HN")
        setNumber("")
        setTableTitle("All Rooms")
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        setRoom({});
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={8} xl={6} style={{ marginBottom: "30px" }}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Room Control</h2>
                        <p>Search for your room</p>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="campus-select-label">
                                        Campus
                                    </InputLabel>
                                    <Select
                                        id="form-campus"
                                        labelId="campus-select-label"
                                        value={campus}
                                        label="Campus"
                                        onChange={(e) => {
                                            setCampus(e.target.value);
                                        }}>
                                        {campuses.map((campus) => (
                                            <MenuItem
                                                key={campus.id}
                                                value={campus.id}>
                                                {campus.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    id="form-number"
                                    fullWidth
                                    label="Room Number"
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
                <Grid item sm={12} md={4} xl={6} style={{ marginBottom: "30px" }}>
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
            </Grid>
            <Grid container spacing={4}>
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
                                colNames={[
                                    "id",
                                    "campus",
                                    "number",
                                    "building",
                                    "capacity",
                                ]}
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
                }}>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteRequest}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                className="modal"
                fullWidth={true}
                open={openModal}
                onClose={() => setOpenModal(false)}>
                <DialogContent sx={{
                    bgcolor: "background.paper",
                    boxShadow: 12,
                }}>
                    <CampusForm closeHandler={handleCloseModal} room={room} />
                </DialogContent>
            </Dialog>
        </>
    );
}
