import { Grid, Button, FormControl, Select, MenuItem, InputLabel, TextField, Alert, AlertTitle, Divider } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useState } from "react";

export default function GroupForm(props) {

    const [term, setTerm] = useState("")
    const [programme, setProgramme] = useState("");
    const [year, setYear] = useState(2023)
    const [name, setName] = useState("")

    const [lecturer, setLecturer] = useState("")
    const [subject, setSubject] = useState("")
    const [slots, setSlots] = useState(0)

    const [department, setDepartment] = useState("");

    const [error, setError] = useState("")

    const departments = [
        {
            id: "GBH",
            name: "Business",
        },
        {
            id: "GCH",
            name: "Computing",
        },
        {
            id: "GDH",
            name: "Graphic Design",
        },
        {
            id: "GFH",
            name: "Finance",
        },
    ]

    const programmes = [
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

    const terms = [{
        id: "SP",
        name: "Spring",
    },
    {
        id: "SU",
        name: "Summer",
    },
    {
        id: "FA",
        name: "Fall",
    },]

    const handleConfirm = () => {
        console.log()
        if (programme && term && name) {
            let data = {
                programme: programme,
                term: term + "-" + year.toString().substr(2, 2),
                department: department,
                name: name,
                lecturer: lecturer,
                subject: subject,
                slots: slots
            }

            axios.post(process.env.REACT_APP_HOST_URL + "/schedule", data).then((res) => {
                console.log(res)
                if (res.data.status) {
                    props.closeHandler();
                } else {
                    setError(res.data.msg)
                }
            })
        }
    }

    const handleFetchLecturer = () => {

    }

    const handleFetchSubjects = () => {

    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Group</h2>
                    <p>You can manage the group using this form</p>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="department-select-label">
                            Department
                        </InputLabel>
                        <Select
                            id="form-department"
                            labelId="department-select-label"
                            value={department}
                            label="Department"
                            onChange={(e) => {
                                setDepartment(e.target.value);
                            }}>
                            {departments.map((term) =>
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
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="term-select-label">
                            Select a Term
                        </InputLabel>
                        <Select
                            labelId="term-select-label"
                            value={term}
                            label="Select a Term"
                            onChange={(e) => {
                                setTerm(e.target.value);
                            }}>
                            {
                                terms.map((term) => <MenuItem key={"option-term-" + term.id} value={term.id}>{term.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DesktopDatePicker sx={{
                        width: "100%",
                    }}
                        label="Year"
                        variant="outlined"
                        onChange={(e) => {
                            setYear(e.$y);
                        }} views={['year']} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="form-name"
                        fullWidth
                        label="Group Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        onChange={(e) => setLecturer(e.target.value)}
                        value={lecturer}
                        id="form-lecturer"
                        fullWidth
                        label="Lecturer"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        id="form-subject"
                        fullWidth
                        label="Subject"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        type="number"
                        onChange={(e) => setSlots(e.target.value)}
                        value={slots}
                        id="form-slots"
                        fullWidth
                        label="Slots"
                        variant="outlined"
                    />
                </Grid>

                {error && error !== "" ?
                    <Grid item xs={12} md={12}>
                        <Alert severity="error">
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    </Grid> : <></>}

                <Divider />
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Save
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
        </>
    )
}