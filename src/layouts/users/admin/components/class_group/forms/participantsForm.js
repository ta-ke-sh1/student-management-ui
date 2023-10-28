import { Grid, Button, TextField, Divider,Autocomplete } from "@mui/material";
import { useState } from "react";

const users = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function ParticipantsForm(props) {
    const [slot, setSlot] = useState(1)
    const [session, setSession] = useState(0)
    const [date, setDate] = useState(new Date())
    const [room, setRoom] = useState()

    const [studentQuery, setStudentQuery] = useState([])
    const [rooms, setRooms] = useState([])
    const [students, setStudents] = useState([])

    const handleConfirm = () => { };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStudentQuery(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Participant</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <TextField
                        disabled={props.id ? true : false}
                        type="number"
                        onChange={(e) => setSession(e.target.value)}
                        value={session}
                        id="form-ession"
                        fullWidth
                        label="Session Number"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={users}
                        getOptionLabel={(option) => option}
                        defaultValue={[]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Students"
                                placeholder="Add 1 or multiple students"
                            />
                        )}
                    />
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
        </>
    )
}