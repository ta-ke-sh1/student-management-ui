import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Chip } from "@mui/material";
import CustomTable from "../../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AttendanceForm from "./attendanceForm";

import axios from "axios";
import { getAllHeaderColumns } from "../../../../../utils/utils";

const attendances = [
  { id: "Attendance-HN-100", campus: "HN", attendance: "100", building: "Pham Van Bach", capacity: 100 },
  { id: "Attendance-HN-101", campus: "HN", attendance: "101", building: "Pham Van Bach", capacity: 100 },
  { id: "Attendance-HN-102", campus: "HN", attendance: "102", building: "Pham Van Bach", capacity: 100 },
  { id: "Attendance-HN-103", campus: "HCM", attendance: "103", building: "Pham Van Bach", capacity: 100 },
  { id: "Attendance-HN-104", campus: "HN", attendance: "104", building: "Pham Van Bach", capacity: 100 },
];

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Attendance Id",
  },
  {
    id: "campus",
    numeric: true,
    disablePadding: false,
    label: "Campus",
  },
  {
    id: "number",
    numeric: true,
    disablePadding: false,
    label: "Attendance Number",
  },
  {
    id: "building",
    numeric: true,
    disablePadding: false,
    label: "Building",
  },
  {
    id: "capacity",
    numeric: true,
    disablePadding: false,
    label: "Capacity",
  },
];

let departments = [
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
];

let programmes = [
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

export default function Attendance() {
  // Campus attendance data
  const [rowData, setRowData] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [group, setGroup] = useState();

  // Selected attendance state for editing
  const [attendance, setAttendance] = useState({});

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selected, setSelected] = useState([]);

  const [tableTitle, setTableTitle] = useState("All Attendances");

  const [programme, setProgramme] = useState("");
  const [term, setTerm] = useState("");
  const terms = [
    {
      id: -1,
      name: "Please select a term",
    },
    {
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
    },
  ];
  const [year, setYear] = useState(2023);
  const [department, setDepartment] = useState("");

  const [groups, setGroups] = useState([
    {
      id: "TCH2011",
      slots: "42",
      subject: "COMP1786",
      lecturer: "TungDT",
      programme: "UOG",
      term: "SU-23",
      department: "GCH",
    },
    {
      id: "TCH2101",
      slots: 42,
      subject: "2",
      lecturer: "quandh",
      programme: "UOG",
      term: "SU-23",
      department: "GCH",
    },
    {
      id: "Testing",
      slots: "2",
      subject: "1",
      lecturer: "1",
      programme: "UOG",
      term: "SU-23",
      department: "GCH",
    },
  ]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    let res = [];
    setParticipants(attendances);
    setRowData(attendances);
  };

  const fetchAttendance = (id) => {
    return participants.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    let attendance = fetchAttendance(id);
    setAttendance({
      id: attendance.id,
      campus: attendance.campus,
      building: attendance.building,
      number: attendance.number,
      capacity: attendance.capacity,
    });
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    setDialogTitle("Delete Attendance");
    setDialogContent("This attendance will be deleted, are you sure? This change cannot be undone");
    setOpen(true);
    setSelected(index);
    console.log(index);
  };

  const handleDeleteRequest = () => {
    let query = [];
    if (Array.isArray(selected)) {
      query = selected.join("@");
    } else {
      query = selected;
    }

    console.log(query);
    axios.delete(process.env.REACT_APP_HOST_URL + "/campus/attendance?q=" + query).then((res) => {
      console.log(res);
      setOpen(false);
    });
  };

  const handleSearch = (e) => {};

  const handleClearSearch = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setAttendance({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8} xl={9}>
          <div className="big-widget" style={{ paddingBottom: "25px" }}>
            <h2>Attendance Control</h2>
            <p>First, select a term and department for attendance group</p>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
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
                    {programmes.map((programme) =>
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
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="term-select-label">Term</InputLabel>
                  <Select
                    id="form-term"
                    labelId="term-select-label"
                    value={term}
                    label="Term"
                    onChange={(e) => {
                      setTerm(e.target.value);
                    }}
                  >
                    {terms.map((term) =>
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
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setYear(e.target.value)} value={year} id="year" fullWidth label="Year" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
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
                    {departments.map((term) =>
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
                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleSearch(e)}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClearSearch(e)}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} md={4} xl={3}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 1 + ".jpg)",
              width: "100%",
              height: "305px",
              borderRadius: "10px",
              backgroundSize: "contain",
            }}
          ></div>
        </Grid>
        {groups.length > 0 ? (
          <>
            <Grid item xs={12}>
              <div
                className="big-widget"
                style={{
                  paddingBottom: "30px",
                }}
              >
                <h2>Matching Groups</h2>
                <p>Select a group to see the attendance status</p>
                {groups.map((group) => {
                  return (
                    <Button
                      variant="outlined"
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      {group.id}
                    </Button>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="big-widget">
                <div className="campus-list">
                  <CustomTable
                    handleAddEntry={() => {
                      handleOpenModal();
                    }}
                    title={"Participants List"}
                    rows={participants}
                    headCells={headCells}
                    colNames={getAllHeaderColumns(headCells)}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          zIndex: 100000,
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteRequest}>Accept</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <AttendanceForm closeHandler={handleCloseModal} attendance={attendance} refresh={fetchRows} />
        </DialogContent>
      </Dialog>
    </>
  );
}
