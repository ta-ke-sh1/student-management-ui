import { Grid, Divider, Button, FormControl, Select, MenuItem, InputLabel, TextField } from "@mui/material";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export default function GroupForm(props) {

    const [term, setTerm] = useState("")
    const [programme, setProgramme] = useState("");
    const [year, setYear] = useState(2023)
    const [name, setName] = useState("")

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

    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Group</h2>
                    <p>You can manage the group using this form</p>
                </Grid>
                <Grid item xs={12} md={12}>
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
                        <InputLabel id="term-select-label">
                            Select a Term
                        </InputLabel>
                        <Select
                            labelId="term-select-label"
                            value={term}
                            label="Term"
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
                            setYear(e);
                        }} views={['year']} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="form-lastName"
                        fullWidth
                        label="Group Name"
                        variant="outlined"
                    />
                </Grid>
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