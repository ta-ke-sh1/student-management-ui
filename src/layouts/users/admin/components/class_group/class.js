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
import { mockGroup } from "../../mockData/mock";
import ScheduleWidget from "./widgets/scheduleWidget";
import ParticipantsWidget from "./widgets/participantsWidget";
import GroupWidget from "./widgets/groupWidget";
import axios from "axios";
import GroupForm from "./forms/groupForm";

function createData(id, programme, building, number) {
    return {
        id,
        programme,
        building,
        number,
    };
}

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Group Id",
    },
    {
        id: "programme",
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
        label: "Group Number",
    },
];

const rooms = [
    {
        id: "Group-HN-100",
        programme: "HN",
        room: "100",
        building: "Pham Van Bach",
    },
    {
        id: "Group-HN-101",
        programme: "HN",
        room: "101",
        building: "Pham Van Bach",
    },
    {
        id: "Group-HN-102",
        programme: "HN",
        room: "102",
        building: "Pham Van Bach",
    },
];

export default function FGWClass() {
    let programmes = [
        {
            id: "ENG",
            name: "English Programme",
        },
        {
            id: "F2G",
            name: "F2G",
        },
        {
            id: "SUP",
            name: "Supplementary Courses",
        },
        {
            id: "UOG",
            name: "Top-Up",
        },
    ];

    const [roomId, setGroupId] = useState("");

    const [programme, setProgramme] = useState("");
    const [term, setTerm] = useState("");

    const [rows, setRows] = useState([]);

    const [terms, setTerms] = useState([
        {
            id: -1,
            name: "Please select a term",
        },
        {
            id: "SP-21",
            name: "Spring 2021",
        },
        {
            id: "SU-21",
            name: "Summer 2021",
        },
        {
            id: "FA-21",
            name: "Fall 2021",
        },
        {
            id: "SP-22",
            name: "Spring 2022",
        },
        {
            id: "SU-22",
            name: "Summer 2022",
        },
        {
            id: "FA-22",
            name: "Fall 2022",
        },
        {
            id: "SP-23",
            name: "Spring 2023",
        },
        {
            id: "SU-23",
            name: "Summer 2023",
        },
    ]);

    const [openGroupModal, setOpenGroupModal] = useState(false);

    const [group, setGroup] = useState(null)
    const [groups, setGroups] = useState([]);

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchRows();
        setGroups(mockGroup);
    }, [rows]);

    const fetchRows = () => {
        let res = [];
        rooms.forEach((room) => {
            res.push(
                createData(room.id, room.programme, room.building, room.room)
            );
        });
        setRows(res);
    };

    const fetchGroup = (id) => {
        return rows.find((row) => row.id === id);
    };

    const handleEdit = (id) => {
        let room = fetchGroup(id);
        setGroupId(room.id);
        setProgramme(room.programme);
    };

    const handleDelete = (index) => {
        setDialogTitle("Delete Group");
        setDialogContent(
            "This room will be deleted, are you sure? This change cannot be undone"
        );
        setOpen(true);
        console.log(index);
    };

    const handleSearchGroup = async (e) => {
        e.preventDefault();
        if (programme && term) {
            await axios.get(process.env.REACT_APP_HOST_URL + "/schedule?programme=" + programme + "&term=" + term).then((res) => {
                console.log(res)
            })

            setGroups(mockGroup);
        }
    };

    const handleClearSearchGroup = () => {
        setProgramme("")
        setTerm("")
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddParticipant = () => {
        console.log("Add new class");
    };

    const handleAddSchedule = () => {
        console.log("Add new schedule");
    };

    const handleOpenGroupModal = () => {
        setOpenGroupModal(true)
    }

    const handleCloseGroupFormModal = () => {
        setOpenGroupModal(false)
    }

    return (
        <>
            <Grid container spacing={4} sx={{ width: "98.5%" }}>
                <Grid item sm={12} md={6} style={{ marginBottom: "30px" }}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Class Schedule Control</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="programme-select-label">
                                        Programme
                                    </InputLabel>
                                    <Select
                                        id="form-programme"
                                        labelId="programme-select-label"
                                        value={programme}
                                        label="Programme"
                                        onChange={(e) => {
                                            setProgramme(e.target.value);
                                        }}>
                                        {programmes.map((programme) =>
                                            programme.id === -1 ? (
                                                <MenuItem
                                                    disabled={true}
                                                    key={programme.id}
                                                    value={programme.id}>
                                                    {programme.name}
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    key={programme.id}
                                                    value={programme.id}>
                                                    {programme.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="term-select-label">
                                        Term
                                    </InputLabel>
                                    <Select
                                        id="form-term"
                                        labelId="term-select-label"
                                        value={term}
                                        label="Term"
                                        onChange={(e) => {
                                            setTerm(e.target.value);
                                        }}>
                                        {terms.map((term) =>
                                            term.id === -1 ? (
                                                <MenuItem
                                                    disabled={true}
                                                    key={term.id}
                                                    value={term.id}>
                                                    {term.name}
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    key={term.id}
                                                    value={term.id}>
                                                    {term.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={(e) => handleSearchGroup(e)}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button
                                    color="error"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={(e) => handleClearSearchGroup(e)}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={6}>
                    <div
                        style={{
                            backgroundImage:
                                `url(${process.env.PUBLIC_URL}/banner/banner` +
                                5 +
                                ".jpg)",
                            width: "100%",
                            height: "160px",
                            borderRadius: "10px",
                            backgroundSize: "contain",
                        }}></div>
                </Grid>
            </Grid>

            <GroupWidget handleAddEntry={() => { handleOpenGroupModal(); }} groups={groups} />
            <ParticipantsWidget rows={rows} />
            <ScheduleWidget rows={rows} />

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

            <Dialog
                className="modal"
                fullWidth={true}
                open={openGroupModal}
                onClose={() => setOpenGroupModal(false)}>
                <DialogContent sx={{
                    bgcolor: "background.paper",
                    boxShadow: 12,
                }}>
                    <GroupForm closeHandler={handleCloseGroupFormModal} group={group} />
                </DialogContent>
            </Dialog>
        </ >
    );
}
