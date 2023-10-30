import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import GradeForm from "./gradeForm";
import { ToastContainer, toast } from "react-toastify";
import { useFetchRequests } from "../../../../../api/apiFunctions";
import { getAllHeaderColumns } from "../../../../../utils/utils";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Grade Id",
  },
  {
    id: "student_id",
    numeric: true,
    disablePadding: false,
    label: "StudentId",
  },
  {
    id: "group",
    numeric: true,
    disablePadding: false,
    label: "Group",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "programme",
    numeric: true,
    disablePadding: false,
    label: "Programme",
  },
  {
    id: "term",
    numeric: true,
    disablePadding: false,
    label: "Term",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
];

const searchType = [];

export default function GradeAdmin(props) {
  const { data } = useFetchRequests(process.env.REACT_APP_HOST_URL + "/user/grade");

  const [campus, setCampus] = useState("HN");
  // Campus grade data
  const [rowData, setRowData] = useState(data);
  const [rows, setRows] = useState(data);
  const [number, setNumber] = useState("");
  // Selected grade state for editing
  const [grade, setGrade] = useState({});
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tableTitle, setTableTitle] = useState("All Grades");

  useEffect(() => {
    setRows(data);
    setRowData(data);
  }, [data]);

  const fetchRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/grade").then((res) => {
        if (res.data.status) {
          setRows(res.data.data);
          setRowData(res.data.data);
          toast.success("Data Fetched Succesfully", {
            position: "bottom-left",
          });
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

  const fetchGrade = (id) => {
    return rows.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    try {
      let grade = fetchGrade(id);
      setGrade({
        id: grade.id,
        campus: grade.campus,
        building: grade.building,
        number: grade.number,
        capacity: grade.capacity,
      });
      setOpenModal(true);
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (index) => {
    try {
      setDialogTitle("Delete Grade");
      setDialogContent("This grade will be deleted, are you sure? This change cannot be undone");
      setOpen(true);
      setSelected(index);
      console.log(index);
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left",
      });
    }
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
      axios.delete(process.env.REACT_APP_HOST_URL + "/campus/grade?q=" + query).then((res) => {
        console.log(res);
        setOpen(false);
      });
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left",
      });
    }
  };

  const handleSearch = (e) => {
    try {
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
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left",
      });
    }
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
            <p>Search for grade by id</p>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField value={number} onChange={(e) => setNumber(e.target.value)} id="form-number" fullWidth label="Assignment Id" variant="outlined" />
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
              {data && (
                <CustomTable
                  handleRefreshEntry={fetchRows}
                  handleAddEntry={() => {
                    handleOpenModal();
                  }}
                  title={tableTitle}
                  rows={data}
                  headCells={headCells}
                  colNames={getAllHeaderColumns(headCells)}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
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
          <GradeForm closeHandler={handleCloseModal} grade={grade} refresh={fetchRows} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
