import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import GradeForm from "./gradeForm";
import { programmes } from "../../mockData/mock";

function createData(id, campus, building, number, capacity) {
  return {
    id,
    campus,
    building,
    number,
    capacity,
  };
}

const grades = [
  { id: "Grade-HN-100", campus: "HN", grade: "100", building: "Pham Van Bach", capacity: 100 },
  { id: "Grade-HN-101", campus: "HN", grade: "101", building: "Pham Van Bach", capacity: 100 },
  { id: "Grade-HN-102", campus: "HN", grade: "102", building: "Pham Van Bach", capacity: 100 },
  { id: "Grade-HN-103", campus: "HCM", grade: "103", building: "Pham Van Bach", capacity: 100 },
  { id: "Grade-HN-419", campus: "HN", grade: "419", building: "Pham Van Bach", capacity: 100 },
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Grade Id",
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
    label: "Grade Number",
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

const searchType = [];

export default function GradeAdmin(props) {
  const [campus, setCampus] = useState("HN");

  // Campus grade data
  const [rowData, setRowData] = useState([]);
  const [rows, setRows] = useState([]);

  const [number, setNumber] = useState("");

  // Selected grade state for editing
  const [grade, setGrade] = useState({});

  const [searchType, setSearchType] = useState("");

  const [group, setGroup] = useState("");
  const [grade_id, setGradeId] = useState("");
  const [year, setYear] = useState("2023");
  const [semester, setSemester] = useState("");

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selected, setSelected] = useState([]);

  const [tableTitle, setTableTitle] = useState("All Grades");

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    let res = [];
    grades.forEach((grade) => {
      res.push({ ...grade });
    });
    setRows(res);
    setRowData(res);
  };

  const fetchGrade = (id) => {
    return rows.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    let grade = fetchGrade(id);
    setGrade({
      id: grade.id,
      campus: grade.campus,
      building: grade.building,
      number: grade.number,
      capacity: grade.capacity,
    });
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    setDialogTitle("Delete Grade");
    setDialogContent("This grade will be deleted, are you sure? This change cannot be undone");
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
    axios.delete(process.env.REACT_APP_HOST_URL + "/campus/grade?q=" + query).then((res) => {
      console.log(res);
      setOpen(false);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let query = "Campus: ";
    let searchResult = rowData.filter((r) => r.campus === campus);
    query += campus;

    if (number !== "") {
      query += " / Grade number: " + number;
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
    setTableTitle("All Grades");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setGrade({});
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
            <h2>Grade Control</h2>
            <p>Search for a grade</p>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}></Grid>
              <Grid item xs={12} md={3}>
                <TextField value={number} onChange={(e) => setNumber(e.target.value)} id="form-number" fullWidth label="Grade Number" variant="outlined" />
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
        <Grid item sm={12} md={4} xl={6} style={{ marginBottom: "30px" }}>
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
          <GradeForm closeHandler={handleCloseModal} grade={grade} />
        </DialogContent>
      </Dialog>
    </>
  );
}
