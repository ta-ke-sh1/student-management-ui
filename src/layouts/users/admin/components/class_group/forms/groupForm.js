import { Grid, Button, FormControl, Select, MenuItem, InputLabel, TextField, Alert, AlertTitle, Divider } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import Constants from "../../../../../../utils/constants";

export default function GroupForm(props) {
  const constants = new Constants();

  const [term, setTerm] = useState(props.group.term.split("-")[0] ?? "");
  const [programme, setProgramme] = useState(props.group.programme ?? "");
  const [year, setYear] = useState((2000 + parseInt(props.group.term.split("-")[1])) ?? 2023);
  const [name, setName] = useState(props.group.name ?? "");
  const [lecturer, setLecturer] = useState(props.group.lecturer ?? "");
  const [subject, setSubject] = useState(props.group.subject ?? "");
  const [slots, setSlots] = useState(props.group.slots ?? 0);
  const [department, setDepartment] = useState(props.group.department ?? "");

  const [lecturers, setLecturers] = useState([])
  const [subjects, setSubjects] = useState([])

  const [error, setError] = useState("");

  useLayoutEffect(() => {
    if (props.group.department) {
      handleFetchLecturers(props.group.department)
      handleFetchSubjects(props.group.department)
    }
  }, [])

  const handleConfirm = () => {
    console.log();
    if (programme && term && name) {
      let data = {
        programme: programme,
        term: term + "-" + year.toString().substr(2, 2),
        department: department,
        name: name,
        lecturer: lecturer,
        subject: subject,
        slots: slots,
      };

      axios.post(process.env.REACT_APP_HOST_URL + "/schedule", data).then((res) => {
        console.log(res);
        if (res.data.status) {
          props.closeHandler();
        } else {
          setError(res.data.msg);
        }
      });
    }
  };

  const handleFetchLecturers = (department) => {
    axios.get(process.env.REACT_APP_HOST_URL + "/user/lecturers?department=" + department).then((res) => {
      if (res.data.status) {
        let data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push(res.data.data[i]);
        }
        setLecturers(data);
      }
    });
  };

  const handleFetchSubjects = (department) => {
    console.log("Fetch lecturers")
    axios.get(process.env.REACT_APP_HOST_URL + "/subject?department=" + department).then((res) => {
      if (res.data.status) {
        let data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push(res.data.data[i]);
        }
        setSubjects(data);
      }
    });
  };



  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h2 style={{ margin: 0 }}>Manage Group</h2>
          <p>You can manage the group using this form</p>
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
                handleFetchSubjects(e.target.value)
                handleFetchLecturers(e.target.value)
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
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) => setYear(e.target.value)}
            value={year}
            id="form-year"
            fullWidth
            label="Year"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField onChange={(e) => setName(e.target.value)} value={name} id="form-name" fullWidth label="Group Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="lecturer-select-label-form">Lecturer</InputLabel>
              <Select
                defaultValue={lecturer}
                value={lecturer}
                label="Lecturer"
                MenuProps={{
                  disablePortal: true, // <--- HERE
                  onClick: (e) => {
                    e.preventDefault();
                  },
                }}
                onChange={(e) => {
                  setLecturer(e.target.value);
                }}
              >
                {lecturers.map((lecturer, index) => (
                  <MenuItem key={"Lecturer-number-" + (index + 1)} value={lecturer.id}>
                    {lecturer.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="lecturer-select-label-form">Subject</InputLabel>
            <Select
              defaultValue={subject}
              value={subject}
              label="Subject"
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: (e) => {
                  e.preventDefault();
                },
              }}
              onChange={(e) => {
                setSubject(e.target.value)
              }}
            >
              {subjects.map((subject, index) => (
                <MenuItem key={"Lecturer-number-" + (index + 1)} value={subject.id}>
                  {subject.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="number" onChange={(e) => setSlots(e.target.value)} value={slots} id="form-slots" fullWidth label="Slots" variant="outlined" />
        </Grid>

        {error && error !== "" ? (
          <Grid item xs={12} md={12}>
            <Alert severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          </Grid>
        ) : (
          <></>
        )}

        <Divider />
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
  );
}
