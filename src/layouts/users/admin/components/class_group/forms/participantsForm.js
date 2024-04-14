import {
    Grid,
    Button,
    TextField,
    Divider,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ParticipantsForm(props) {
    const [student, setStudent] = useState();
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const loading = open && students.length === 0;

    console.log(props);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/user/students")
                .then((res) => {
                    if (res.data.status) {
                        let data = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            data.push(res.data.data[i]);
                        }
                        setStudents(data);
                        console.log(data);
                    } else {
                        toast.error(res.data.data, {
                            position: "bottom-left",
                        });
                    }
                });
        } catch (e) {
            toast.error(e.toString(), {
                position: "bottom-left",
            });
        }
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        try {
            axios
                .post(
                    process.env.REACT_APP_HOST_URL + "/schedule/participant",
                    {
                        group: props.group,
                        participants: student,
                    }
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        props.refresh(props.group.id);
                        props.closeHandler();
                    } else {
                        toast.error(res.data.data, {
                            position: "bottom-left",
                        });
                    }
                });
        } catch (e) {
            toast.error(e.toString(), {
                position: "bottom-left",
            });
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Participant</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <Autocomplete
                        multiple={false}
                        value={student}
                        id="asynchronous-tags-outlined"
                        options={students}
                        open={open}
                        onChange={(e, value) => {
                            console.log(e.target.value);
                            setStudent(value);
                        }}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={(option) =>
                            option.id +
                            " - " +
                            option.department_id +
                            " - " +
                            option.dob.replaceAll("-", "/")
                        }
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Students"
                                placeholder="Add 1 or multiple students"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdorment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Add
                    </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        color="error"
                        fullWidth
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    );
}
