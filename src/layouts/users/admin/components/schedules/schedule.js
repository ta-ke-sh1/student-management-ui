import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import ScheduleForm from "./scheduleForm";
import { programmes } from "../../mockData/mock";
import { ToastContainer, toast } from "react-toastify";

const schedules = [
  { id: "Schedule-HN-100", campus: "HN", schedule: "100", building: "Pham Van Bach", capacity: 100 },
  { id: "Schedule-HN-101", campus: "HN", schedule: "101", building: "Pham Van Bach", capacity: 100 },
  { id: "Schedule-HN-102", campus: "HN", schedule: "102", building: "Pham Van Bach", capacity: 100 },
  { id: "Schedule-HN-103", campus: "HCM", schedule: "103", building: "Pham Van Bach", capacity: 100 },
  { id: "Schedule-HN-419", campus: "HN", schedule: "419", building: "Pham Van Bach", capacity: 100 },
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Schedule Id",
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
    label: "Schedule Number",
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

export default function ScheduleAdmin(props) {
  const [campus, setCampus] = useState("HN");

  // Campus schedule data
  const [rowData, setRowData] = useState([]);
  const [rows, setRows] = useState([]);

  const [number, setNumber] = useState("");

  // Selected schedule state for editing
  const [schedule, setSchedule] = useState({});

  const [programme, setProgramme] = useState("");

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selected, setSelected] = useState([]);

  const [tableTitle, setTableTitle] = useState("All Schedules");

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    let res = [];
    schedules.forEach((schedule) => {
      res.push(schedule);
    });
    setRows(res);
    setRowData(res);
  };

  const fetchSchedule = (id) => {
    return rows.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    let schedule = fetchSchedule(id);
    setSchedule({
      id: schedule.id,
      campus: schedule.campus,
      building: schedule.building,
      number: schedule.number,
      capacity: schedule.capacity,
    });
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    setDialogTitle("Delete Schedule");
    setDialogContent("This schedule will be deleted, are you sure? This change cannot be undone");
    setOpen(true);
    setSelected(index);
    console.log(index);
  };

  const handleDeleteRequest = () => {
    try {
      let query = [];
      if (Array.isArray(selected)) {
        query = selected.join("@");
      } else {
        query = selected;
      }

      console.log(query);
      axios.delete(process.env.REACT_APP_HOST_URL + "/campus/schedule?q=" + query).then((res) => {
        console.log(res);
        setOpen(false);
      });
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left"
      })
    }

  };

  const handleSearch = (e) => {
    e.preventDefault();

    let query = "Campus: ";
    let searchResult = rowData.filter((r) => r.campus === campus);
    query += campus;

    if (number !== "") {
      query += " / Schedule number: " + number;
      searchResult = rowData.filter((r) => r.campus === campus && r.number === number);
    }

    if (!Array.isArray(searchResult)) {
      searchResult = [];
    }

    setRows(searchResult);
    setTableTitle(query);
  };

  const handleClearSearch = (e) => {
    e.preventDefault();
    setRows(rowData);
    setCampus("HN");
    setNumber("");
    setTableTitle("All Schedules");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setSchedule({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8} xl={6}>
          <div className="big-widget" style={{ paddingBottom: "25px" }}>
            <h2>Schedule Control</h2>
            <p>Search for a schedule</p>
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
                <TextField value={number} onChange={(e) => setNumber(e.target.value)} id="form-number" fullWidth label="Schedule Number" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleSearch(e)}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClearSearch(e)}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} md={4} xl={6}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
              width: "100%",
              height: "225px",
              borderRadius: "10px",
              backgroundSize: "contain",
            }}
          ></div>
        </Grid>
        <Grid item xs={12}>
          <div className="big-widget">
            <div className="campus-list">
              <CustomTable
                handleAddEntry={() => {
                  handleOpenModal();
                }}
                title={tableTitle}
                rows={rows}
                headCells={headCells}
                colNames={["id", "campus", "number", "building", "capacity"]}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </Grid>
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
          <ScheduleForm closeHandler={handleCloseModal} schedule={schedule} />
        </DialogContent>
      </Dialog>
    </>
  );
}
