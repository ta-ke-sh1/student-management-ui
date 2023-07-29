import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "./table";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function createData(id, campus, building, number) {
    return {
        id,
        campus,
        building,
        number,
    };
}

const rooms = [{ "id": "Room-HN-100", "campus": "HN", "room": "100", "building": "Pham Van Bach" }, { "id": "Room-HN-101", "campus": "HN", "room": "101", "building": "Pham Van Bach" }, { "id": "Room-HN-102", "campus": "HN", "room": "102", "building": "Pham Van Bach" }, { "id": "Room-HN-103", "campus": "HN", "room": "103", "building": "Pham Van Bach" }, { "id": "Room-HN-104", "campus": "HN", "room": "104", "building": "Pham Van Bach" }, { "id": "Room-HN-105", "campus": "HN", "room": "105", "building": "Pham Van Bach" }, { "id": "Room-HN-106", "campus": "HN", "room": "106", "building": "Pham Van Bach" }, { "id": "Room-HN-107", "campus": "HN", "room": "107", "building": "Pham Van Bach" }, { "id": "Room-HN-108", "campus": "HN", "room": "108", "building": "Pham Van Bach" }, { "id": "Room-HN-109", "campus": "HN", "room": "109", "building": "Pham Van Bach" }, { "id": "Room-HN-110", "campus": "HN", "room": "110", "building": "Pham Van Bach" }, { "id": "Room-HN-111", "campus": "HN", "room": "111", "building": "Pham Van Bach" }, { "id": "Room-HN-112", "campus": "HN", "room": "112", "building": "Pham Van Bach" }, { "id": "Room-HN-113", "campus": "HN", "room": "113", "building": "Pham Van Bach" }, { "id": "Room-HN-114", "campus": "HN", "room": "114", "building": "Pham Van Bach" }, { "id": "Room-HN-115", "campus": "HN", "room": "115", "building": "Pham Van Bach" }, { "id": "Room-HN-116", "campus": "HN", "room": "116", "building": "Pham Van Bach" }, { "id": "Room-HN-117", "campus": "HN", "room": "117", "building": "Pham Van Bach" }, { "id": "Room-HN-118", "campus": "HN", "room": "118", "building": "Pham Van Bach" }, { "id": "Room-HN-119", "campus": "HN", "room": "119", "building": "Pham Van Bach" }, { "id": "Room-HN-200", "campus": "HN", "room": "200", "building": "Pham Van Bach" }, { "id": "Room-HN-201", "campus": "HN", "room": "201", "building": "Pham Van Bach" }, { "id": "Room-HN-202", "campus": "HN", "room": "202", "building": "Pham Van Bach" }, { "id": "Room-HN-203", "campus": "HN", "room": "203", "building": "Pham Van Bach" }, { "id": "Room-HN-204", "campus": "HN", "room": "204", "building": "Pham Van Bach" }, { "id": "Room-HN-205", "campus": "HN", "room": "205", "building": "Pham Van Bach" }, { "id": "Room-HN-206", "campus": "HN", "room": "206", "building": "Pham Van Bach" }, { "id": "Room-HN-207", "campus": "HN", "room": "207", "building": "Pham Van Bach" }, { "id": "Room-HN-208", "campus": "HN", "room": "208", "building": "Pham Van Bach" }, { "id": "Room-HN-209", "campus": "HN", "room": "209", "building": "Pham Van Bach" }, { "id": "Room-HN-210", "campus": "HN", "room": "210", "building": "Pham Van Bach" }, { "id": "Room-HN-300", "campus": "HN", "room": "300", "building": "Pham Van Bach" }, { "id": "Room-HN-301", "campus": "HN", "room": "301", "building": "Pham Van Bach" }, { "id": "Room-HN-302", "campus": "HN", "room": "302", "building": "Pham Van Bach" }, { "id": "Room-HN-303", "campus": "HN", "room": "303", "building": "Pham Van Bach" }, { "id": "Room-HN-304", "campus": "HN", "room": "304", "building": "Pham Van Bach" }, { "id": "Room-HN-305", "campus": "HN", "room": "305", "building": "Pham Van Bach" }, { "id": "Room-HN-306", "campus": "HN", "room": "306", "building": "Pham Van Bach" }, { "id": "Room-HN-307", "campus": "HN", "room": "307", "building": "Pham Van Bach" }, { "id": "Room-HN-308", "campus": "HN", "room": "308", "building": "Pham Van Bach" }, { "id": "Room-HN-309", "campus": "HN", "room": "309", "building": "Pham Van Bach" }, { "id": "Room-HN-310", "campus": "HN", "room": "310", "building": "Pham Van Bach" }, { "id": "Room-HN-311", "campus": "HN", "room": "311", "building": "Pham Van Bach" }, { "id": "Room-HN-312", "campus": "HN", "room": "312", "building": "Pham Van Bach" }, { "id": "Room-HN-313", "campus": "HN", "room": "313", "building": "Pham Van Bach" }, { "id": "Room-HN-314", "campus": "HN", "room": "314", "building": "Pham Van Bach" }, { "id": "Room-HN-315", "campus": "HN", "room": "315", "building": "Pham Van Bach" }, { "id": "Room-HN-316", "campus": "HN", "room": "316", "building": "Pham Van Bach" }, { "id": "Room-HN-317", "campus": "HN", "room": "317", "building": "Pham Van Bach" }, { "id": "Room-HN-318", "campus": "HN", "room": "318", "building": "Pham Van Bach" }, { "id": "Room-HN-319", "campus": "HN", "room": "319", "building": "Pham Van Bach" }, { "id": "Room-HN-400", "campus": "HN", "room": "400", "building": "Pham Van Bach" }, { "id": "Room-HN-401", "campus": "HN", "room": "401", "building": "Pham Van Bach" }, { "id": "Room-HN-402", "campus": "HN", "room": "402", "building": "Pham Van Bach" }, { "id": "Room-HN-403", "campus": "HN", "room": "403", "building": "Pham Van Bach" }, { "id": "Room-HN-404", "campus": "HN", "room": "404", "building": "Pham Van Bach" }, { "id": "Room-HN-405", "campus": "HN", "room": "405", "building": "Pham Van Bach" }, { "id": "Room-HN-406", "campus": "HN", "room": "406", "building": "Pham Van Bach" }, { "id": "Room-HN-407", "campus": "HN", "room": "407", "building": "Pham Van Bach" }, { "id": "Room-HN-408", "campus": "HN", "room": "408", "building": "Pham Van Bach" }, { "id": "Room-HN-409", "campus": "HN", "room": "409", "building": "Pham Van Bach" }, { "id": "Room-HN-410", "campus": "HN", "room": "410", "building": "Pham Van Bach" }, { "id": "Room-HN-411", "campus": "HN", "room": "411", "building": "Pham Van Bach" }, { "id": "Room-HN-412", "campus": "HN", "room": "412", "building": "Pham Van Bach" }, { "id": "Room-HN-413", "campus": "HN", "room": "413", "building": "Pham Van Bach" }, { "id": "Room-HN-414", "campus": "HN", "room": "414", "building": "Pham Van Bach" }, { "id": "Room-HN-415", "campus": "HN", "room": "415", "building": "Pham Van Bach" }, { "id": "Room-HN-416", "campus": "HN", "room": "416", "building": "Pham Van Bach" }, { "id": "Room-HN-417", "campus": "HN", "room": "417", "building": "Pham Van Bach" }, { "id": "Room-HN-418", "campus": "HN", "room": "418", "building": "Pham Van Bach" }, { "id": "Room-HN-419", "campus": "HN", "room": "419", "building": "Pham Van Bach" }]

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

export default function CampusAdmin() {
    let campuses = [
        {
            id: 'HN',
            name: 'Ha Noi'
        },
        {
            id: 'HCM',
            name: 'Ho Chi Minh'
        },
        {
            id: 'DN',
            name: 'Da Nang'
        },
        {
            id: 'CT',
            name: 'Can Tho'
        },
    ]

    const [roomId, setRoomId] = useState('')
    const [campus, setCampus] = useState('HN');
    const [rows, setRows] = useState([])
    const [building, setBuilding] = useState('')
    const [number, setNumber] = useState('');

    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogContent, setDialogContent] = useState("")

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchRows()
    }, [rows])

    const fetchRows = () => {
        let res = [];
        rooms.forEach((room) => {
            res.push(
                createData(room.id, room.campus, room.building, room.room)
            )
        })
        setRows(res)
    }

    const fetchRoom = (id) => {
        return rows.find((row) => row.id === id)
    }

    const handleEdit = (id) => {
        let room = fetchRoom(id)
        setRoomId(room.id)
        setCampus(room.campus)
        setBuilding(room.building)
        setNumber(room.number)
    }

    const handleDelete = (index) => {
        setDialogTitle("Delete Room")
        setDialogContent("This room will be deleted, are you sure? This change cannot be undone")
        setOpen(true)
        console.log(index)
    }

    const handleConfirm = (e) => {
        e.preventDefault()
        console.log({
            id: roomId,
            campus: campus,
            building: building,
            number: number
        })

        if (building === "" || number === "" || campus === "") return

        setDialogTitle("Edit Room information")
        setDialogContent("This room will be edited, are you sure? This change cannot be undone")
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={4} sx={{ width: '98.5%' }}>
                <Grid item sm={12} md={6} style={{ marginBottom: '30px' }}>
                    <div className="big-widget" style={{ paddingBottom: '25px' }}>
                        <h2>Room Control</h2>
                        <p>Edit or Add new roow here</p>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="campus-select-label">Campus</InputLabel>
                                    <Select
                                        id="form-campus"
                                        labelId="campus-select-label"
                                        value={campus}
                                        label="Campus"
                                        onChange={(e) => {
                                            setCampus(e.target.value)
                                        }}
                                    >
                                        {campuses.map((campus) => <MenuItem key={campus.id} value={campus.id}>{campus.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    onChange={(e) => setBuilding(e.target.value)}
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
                                <Button fullWidth variant="outlined" sx={{ padding: '15px 30px' }} onClick={(e) => handleConfirm(e)}>Save</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={6} style={{ marginBottom: '30px' }}>
                    <div style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
                        width: '100%',
                        height: '225px',
                        borderRadius: '10px',
                        backgroundSize: 'contain'
                    }}>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{ width: '97%' }}>
                <Grid item xs={12}>
                    <div className="big-widget" >
                        <div className="campus-list">
                            <CustomTable
                                rows={rows}
                                headCells={headCells}
                                colNames={['id', 'campus', 'building', 'number']}
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
                    zIndex: 100000000000
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
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
