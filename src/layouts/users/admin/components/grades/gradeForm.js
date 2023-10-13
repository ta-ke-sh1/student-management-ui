import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function GradeForm(props) {
  const [building, setBuilding] = useState(props.grade.building);
  const [number, setNumber] = useState(props.grade.number);
  const [capacity, setCapacity] = useState(props.grade.capacity);

  const handleConfirm = () => {};

  return props.id ? (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <h2 style={{ margin: 0 }}>Manage grade</h2>
      </Grid>
      <Divider />
      <Grid item xs={12} md={12}>
        <TextField onChange={(e) => setBuilding(e.target.value)} value={building} id="form-building" fullWidth label="Building" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField value={number} onChange={(e) => setNumber(e.target.value)} id="form-number" fullWidth label="Room Number" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} id="form-capacity" fullWidth label="Maximum Capacity" variant="outlined" />
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
  ) : (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h2 style={{ margin: 0 }}>Manage grade</h2>
          <p>Only lecturers can create grading ticket</p>
        </Grid>
      </Grid>
    </>
  );
}
