import { useState, useEffect } from "react";
import { TextField, Button, Grid, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SubjectForm from "./subjectForm";
import { ToastContainer, toast } from "react-toastify";
import Constants from "../../../../../utils/constants";
import axios from "axios";
import { getAllHeaderColumns } from "../../../../../utils/utils";


const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Subject Code",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "prerequisites",
    numeric: true,
    disablePadding: false,
    label: "Prerequisites",
  },
  {
    id: "degree",
    numeric: true,
    disablePadding: false,
    label: "Degree",
  },
  {
    id: "slots",
    numeric: true,
    disablePadding: false,
    label: "Slots",
  },
];

export default function SubjectsAdmin() {
  const constants = new Constants();

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [rows, setRows] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);

  const [subject, setSubject] = useState({});
  const [openSubjectModal, setOpenSubjectModal] = useState(false);

  const [programme, setProgramme] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("");

  const handleClearSearch = () => { };

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/subject").then((res) => {
        if (!res.data.status) {
          toast.error(res.data.data, {
            position: "bottom-left"
          })
        } else {
          let data = [];
          res.data.data.forEach((subject) => {
            data.push(subject);
          });
          setRows(data);
          setRowData(data);
        }
      })
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left"
      })
    }

  };

  const handleDelete = (index) => {
    try {
      setDialogTitle("Delete Room");
      setDialogContent("This room will be deleted, are you sure? This change cannot be undone");
      setOpen(true);
      setId(index)
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left"
      })
    }
  };

  const handleDeleteRequest = (id) => {
    let query = ""
    if (Array.isArray(id)) {
      id.forEach((i) => {
        query += (i + "%")
      })
    } else {
      query = id
    }
    axios.delete(process.env.REACT_APP_HOST_URL + "/subject?id=" + query).then((res) => {
      if (res.data.status) {
        toast.success("Deleted")
      } else {

      }
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSubjectModal = () => {
    setSubject({});
    setOpenSubjectModal(true);
  };

  const handleCloseSubjectModal = () => {
    setOpenSubjectModal(false);
  };

  const fetchSubject = (id) => {
    return rows.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    let subject = fetchSubject(id);
    setSubject({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      prerequisites: subject.prerequisites,
      degree: subject.degree,
      slots: subject.slots,
    });
    setOpenSubjectModal(true);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={12}>
          <div className="big-widget" style={{ paddingBottom: "25px" }}>
            <h2>Subject Control</h2>
            <p>Search for a subject</p>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField value={id} onChange={(e) => setId(e.target.value)} fullWidth label="Subject Id" variant="outlined" />
              </Grid>
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
              <Grid item xs={12} md={3}>
                <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClearSearch(e)}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} md={12}>
          <div className="big-widget">
            <div className="campus-list">
              <CustomTable
                title={"Courses"}
                rows={rows}
                init_count={4}
                headCells={headCells}
                colNames={getAllHeaderColumns(headCells)}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleAddEntry={() => {
                  handleOpenSubjectModal();
                }}
                handleRefreshEntry={fetchRows}
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
          zIndex: 100000000000,
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleDeleteRequest(id);
            handleClose()
          }}>Accept</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog className="modal" fullWidth={true} open={openSubjectModal} onClose={() => setOpenSubjectModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <SubjectForm closeHandler={handleCloseSubjectModal} subject={subject} refresh={fetchRows} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
