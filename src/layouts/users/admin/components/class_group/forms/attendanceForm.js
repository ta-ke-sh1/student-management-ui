import { Grid, List, Button, Select, InputLabel, Divider, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AttendanceForm(props) {
    console.log(props)

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [open, setOpen] = useState(false);
    const loading = open && students.length === 0;
    const handleConfirm = () => { };

    const fetchStudents = () => {
        try {
            setStudents(props.participants)
        }
        catch (e) {
            toast.error(e.toString(), {
                position: "bottom-left"
            })
        }
    }

    const handleAddToList = (e) => {
        setStudents([...students, student])
    }

    const [isAttended, setIsAttended] = useState(props.attendance.isAttended ?? -1);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Attendance</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="campus-select-label-form">Has attended</InputLabel>
                        <Select
                            defaultValue={isAttended}
                            value={isAttended}
                            label="Has attended"
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: (e) => {
                                    e.preventDefault();
                                },
                            }}
                            onChange={(e) => {
                                setIsAttended(e.target.value);
                            }}
                        >
                            <MenuItem value={"default"} disabled>
                                Please select a Campus
                            </MenuItem>
                            <MenuItem value={1}>
                                Attended
                            </MenuItem>
                            <MenuItem value={0}>
                                Not Attended
                            </MenuItem>
                            <MenuItem value={-1}>
                                Not Yet
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    );
}
