import { Grid, FormControl, Button, TextField, InputLabel, Select, MenuItem, Divider, Input } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Constants from "../../../../../utils/constants";

export default function GradeForm(props) {
  const constants = new Constants();
  const [id, setId] = useState(props.grade.id);
  const [term, setTerm] = useState(props.grade.term);
  const [programme, setProgramme] = useState(props.grade.programme);
  const [department, setDepartment] = useState(props.grade.department);
  const [group, setGroup] = useState(props.grade.group);
  const [course, setCourse] = useState(props.grade.course);
  const [grade, setGrade] = useState(props.grade.grade);
  const [lecturer, setLecturer] = useState(props.grade.lecturer);

  const [groups, setGroups] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleConfirm = (e) => {
    e.preventDefault();
  };

  return props.grade.lecturer ? (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <h2 style={{ margin: 0 }}>Manage grade</h2>
      </Grid>
      <Divider />
      <Grid item xs={12} md={12}>
        <TextField onChange={(e) => setTerm(e.target.value)} value={term} id="form-term" fullWidth label="Term" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="programme-select-label">Programme</InputLabel>
          <Select
            id="form-programme"
            labelId="programme-select-label"
            value={programme}
            label="Programme"
            onChange={(e) => {
              setProgramme(e.target.value);
            }}
          >
            {constants.programmes.map((programme) =>
              programme.id === -1 ? (
                <MenuItem disabled={true} key={programme.id} value={programme.id}>
                  {programme.name}
                </MenuItem>
              ) : (
                <MenuItem key={programme.id} value={programme.id}>
                  {programme.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="department-select-label">Department</InputLabel>
          <Select
            id="form-department"
            labelId="department-select-label"
            value={department}
            label="Department"
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            {constants.departments.map((term) =>
              term.id === -1 ? (
                <MenuItem disabled={true} key={term.id} value={term.id}>
                  {term.name}
                </MenuItem>
              ) : (
                <MenuItem key={term.id} value={term.id}>
                  {term.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="term-select-label">Select a Term</InputLabel>
          <Select
            labelId="term-select-label"
            value={term}
            label="Select a Term"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          >
            {constants.terms.map((term) => (
              <MenuItem key={"option-term-" + term.id} value={term.id}>
                {term.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField onChange={(e) => setGroup(e.target.value)} value={group} id="form-group" fullWidth label="Group" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField onChange={(e) => setCourse(e.target.value)} value={course} id="form-course" fullWidth label="Course" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField onChange={(e) => setLecturer(e.target.value)} value={lecturer} id="form-lecturer" fullWidth label="Lecturer" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField type="number" value={grade} onChange={(e) => setGrade(e.target.value)} id="form-grade" fullWidth label="Grade" variant="outlined" />
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
