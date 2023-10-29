import { Grid, List, Button, TextField, ListItem, Autocomplete, CircularProgress, ListItemText, Divider, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AttendanceForm(props) {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
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

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Attendance</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <Autocomplete
                        multiple={true}
                        value={student}
                        id="asynchronous-tags-outlined"
                        options={students}
                        open={open}
                        onInputChange={(e, value) => {
                            fetchStudents();
                            setStudent(value)
                        }}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.username === value.username}
                        getOptionLabel={(option) => option.username}

                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Students"
                                placeholder="Search for a student"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdorment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
                        )} />
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
