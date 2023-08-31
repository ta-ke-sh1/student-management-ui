import {
    Grid,
    FormControl,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Divider,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function CampusForm(props) {
    const [roomId, setRoomId] = useState(props.room.roomId);
    const [campus, setCampus] = useState(props.room.campus);
    const [building, setBuilding] = useState(props.room.building);
    const [number, setNumber] = useState(props.room.number);

    const handleConfirm = () => {
        axios.post(process.env.REACT_APP_HOST_URL + "/room", {
            id: roomId,
            campus: campus,
            building: building,
            number: number,
        });
    };

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

    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    maxWidth: "500px",
                }}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage room</h2>
                    <p>You can manage your room using this form</p>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="campus-select-label">Campus</InputLabel>
                        <Select
                            id="form-campus"
                            labelId="campus-select-label"
                            value={campus}
                            label="Campus"
                            onChange={(e) => {
                                setCampus(e.target.value);
                            }}>
                            {campuses.map((campus) => (
                                <MenuItem key={campus.id} value={campus.id}>
                                    {campus.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        onChange={(e) => setBuilding(e.target.value)}
                        value={building}
                        id="form-building"
                        fullWidth
                        label="Building"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        id="form-number"
                        fullWidth
                        label="Room Number"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
