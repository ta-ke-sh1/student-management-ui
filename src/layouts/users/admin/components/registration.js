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
import CustomTable from "../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function createData(id, campus, building, number) {
    return {
        id,
        campus,
        building,
        number,
    };
}

const rooms = [];

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
        id: "building",
        numeric: true,
        disablePadding: false,
        label: "Building",
    },
    {
        id: "number",
        numeric: true,
        disablePadding: false,
        label: "Room Number",
    },
];

export default function RegistrationAdmin() {
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

    const [roomId, setRoomId] = useState("");
    const [campus, setCampus] = useState("HN");
    const [rows, setRows] = useState([]);
    const [building, setBuilding] = useState("");
    const [number, setNumber] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchRows();
    }, [rows]);

    const fetchRows = () => {
        let res = [];
        rooms.forEach((room) => {
            res.push(
                createData(room.id, room.campus, room.building, room.room)
            );
        });
        setRows(res);
    };

    const fetchRoom = (id) => {
        return rows.find((row) => row.id === id);
    };

    const handleEdit = (id) => {
        let room = fetchRoom(id);
        setRoomId(room.id);
        setCampus(room.campus);
        setBuilding(room.building);
        setNumber(room.number);
    };

    const handleDelete = (index) => {
        setDialogTitle("Delete Room");
        setDialogContent(
            "This room will be deleted, are you sure? This change cannot be undone"
        );
        setOpen(true);
        console.log(index);
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log({
            id: roomId,
            campus: campus,
            building: building,
            number: number,
        });

        if (building === "" || number === "" || campus === "") return;

        setDialogTitle("Edit Room information");
        setDialogContent(
            "This room will be edited, are you sure? This change cannot be undone"
        );
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={4} sx={{ width: "98.5%" }}>
                <Grid item sm={12} md={6} style={{ marginBottom: "30px" }}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Room Control</h2>
                        <p>Edit or Add new roow here</p>
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
                                    onChange={(e) =>
                                        setBuilding(e.target.value)
                                    }
                                    value={building}
                                    id="form-building"
                                    fullWidth
                                    label="Building"
                                    variant="outlined"
                                />
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
                                    onClick={(e) => handleConfirm(e)}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={6} style={{ marginBottom: "30px" }}>
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
            <Grid container style={{ width: "97%" }}>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                init_count={4}
                                title={"Campus"}
                                rows={rows}
                                headCells={headCells}
                                colNames={[
                                    "id",
                                    "campus",
                                    "building",
                                    "number",
                                ]}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{ width: "97%" }}>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                init_count={4}
                                title={"Campus"}
                                rows={rows}
                                headCells={headCells}
                                colNames={[
                                    "id",
                                    "campus",
                                    "building",
                                    "number",
                                ]}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{ width: "97%" }}>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                init_count={4}
                                title={"Campus"}
                                rows={rows}
                                headCells={headCells}
                                colNames={[
                                    "id",
                                    "campus",
                                    "building",
                                    "number",
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
                    zIndex: 100000000000,
                }}>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
