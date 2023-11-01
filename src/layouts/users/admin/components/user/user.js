import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Modal, Box } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import UserForm from "./userForm";
import axios from "axios";
import Constants from "../../../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { getAllHeaderColumns } from "../../../../../utils/utils";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Dept",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Auth Level",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "F. Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "L. Name",
  },
  {
    id: "dob",
    numeric: true,
    disablePadding: false,
    label: "Dob",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },

  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },

  {
    id: "district",
    numeric: true,
    disablePadding: false,
    label: "District",
  },

  {
    id: "ward",
    numeric: true,
    disablePadding: false,
    label: "Ward",
  },

  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
];

export default function UsersAdmin(props) {
  const constants = new Constants();
  const [user, setUser] = useState({});

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(dayjs(new Date()));
  const [phone, setPhone] = useState("+84");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [rowsStudents, setRowsStudents] = useState([]);
  const [rowsLecturers, setRowsLecturers] = useState([]);
  const [rowsAdmin, setRowsAdmins] = useState([]);

  useEffect(() => {
    fetchRows("all");
  }, []);

  const fetchRows = (type) => {
    switch (type) {
      case "student":
        fetchStudentRows();
        break;
      case "lecturer":
        fetchLecturerRows();
        break;
      case "admin":
        fetchAdminRows();
      case "all":
        fetchStudentRows();
        fetchLecturerRows();
        fetchAdminRows();
        break;
      default:
        break;
    }
  };

  const fetchStudentRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/students").then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          let result = [];
          res.data.data.forEach((user) => {
            result.push(user);
          });
          setStudents(result);
          setRowsStudents(result);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const fetchLecturerRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/lecturers").then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          let result = [];
          res.data.data.forEach((user) => {
            result.push(user);
          });
          setLecturers(result);
          setRowsLecturers(result);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const fetchAdminRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/admins").then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          let result = [];
          res.data.data.forEach((user) => {
            result.push(user);
          });
          setAdmins(result);
          setRowsAdmins(result);
          console.log(result);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const findDataById = (data, id) => {
    return data.find((row) => row.id === id);
  };

  const handleEditStudent = (id) => {
    let user = findDataById(rowsStudents, id);
    console.log(user);
    setUser(user);
    setOpenModal(true);
  };

  const handleEditAdmin = (id) => {
    let user = findDataById(rowsAdmin, id);
    console.log(user);
    setUser(user);
    setOpenModal(true);
  };

  const handleEditLecturer = (id) => {
    let user = findDataById(rowsLecturers, id);
    console.log(user);
    setUser(user);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    setDialogTitle("Delete User");
    setDialogContent("This user will be deleted, are you sure? This change cannot be undone");
    setOpen(true);
    console.log(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneChange = (newValue) => {
    setPhone(newValue);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPassword("");
    setId("");
    setAuth("");
    setFirstName("");
    setLastName("");
    setDob(dayjs(new Date()));
    setPhone("+84");
    setStatus("");
    setDepartment("");
    setEmail("");
  };

  const handleOpenModal = () => {
    setUser({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {};

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <div className="big-widget" style={{ paddingBottom: "15px" }}>
            <h2>Users Control</h2>
            <p>Search for an user using the following fields</p>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="auth-select-label">Auth Level</InputLabel>
                  <Select
                    id="form-role"
                    labelId="auth-select-label"
                    value={auth}
                    label="Auth Level"
                    onChange={(e) => {
                      setAuth(e.target.value);
                    }}
                  >
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={2}>Staff</MenuItem>
                    <MenuItem value={3}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="department-select-label">Status</InputLabel>
                  <Select
                    id="form-campus"
                    labelId="status-select-label"
                    value={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <MenuItem value={"activated"}>Activated</MenuItem>
                    <MenuItem value={"deactivated"}>Deactivated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setFirstName(e.target.value)} value={firstName} id="form-firstName" fullWidth label="First Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setLastName(e.target.value)} value={lastName} id="form-lastName" fullWidth label="Last Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="department-select-label">Department</InputLabel>
                  <Select
                    id="form-campus"
                    labelId="department-select-label"
                    value={department}
                    label="Department"
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                  >
                    {constants.departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setLastName(e.target.value)} value={lastName} id="form-lastName" fullWidth label="City" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setLastName(e.target.value)} value={lastName} id="form-lastName" fullWidth label="District" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="form-email" fullWidth label="Ward" variant="outlined" />
              </Grid>
              <Grid item xs={6} md={4}>
                <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} color="error" onClick={(e) => handleConfirm(e)}>
                  Reset Password
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClear(e)}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 3 + ".jpg)",
              width: "100%",
              height: "350px",
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
                init_count={4}
                title="Admins"
                rows={rowsAdmin}
                headCells={headCells}
                colNames={getAllHeaderColumns(headCells)}
                handleEdit={handleEditAdmin}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="big-widget">
            <div className="campus-list">
              <CustomTable
                handleAddEntry={() => {
                  handleOpenModal();
                }}
                init_count={4}
                title="Lecturers"
                rows={rowsLecturers}
                headCells={headCells}
                colNames={getAllHeaderColumns(headCells)}
                handleEdit={handleEditLecturer}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="big-widget">
            <div className="campus-list">
              <CustomTable
                handleAddEntry={() => {
                  handleOpenModal();
                }}
                init_count={4}
                title="Students"
                rows={rowsStudents}
                headCells={headCells}
                colNames={getAllHeaderColumns(headCells)}
                handleEdit={handleEditStudent}
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
          zIndex: 10000,
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Accept</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="lg" className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <UserForm closeHandler={handleCloseModal} user={user} refresh={fetchRows} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
