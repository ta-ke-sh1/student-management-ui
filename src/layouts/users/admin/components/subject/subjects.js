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

function createData(id, name, description, prerequisites, degree, slots) {
  return {
    id,
    name,
    description,
    prerequisites,
    degree,
    slots,
  };
}

const subjects = [
  {
    id: "1618",
    name: "Programming",
    description: "This unit introduces students to the core concepts of programming with an introduction to algorithms and the characteristics of programming paradigms.",
    prerequisites: ["1618", "1631"],
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1619",
    name: "Networking",
    description:
      "Building on the successful top-down approach, the course of Computer Networking is implemented with an early emphasis on application-layer paradigms and application programming interfaces, encouraging a hands-on experience with protocols and networking concepts.",
    prerequisites: "",
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1622",
    name: "Database Design & Development",
    description:
      "The aim of this unit is to give students opportunities to develop an understanding of the concepts and issues relating to database design and development, as well as to provide the practical skills to translate that understanding into the design and creation of complex databases.",
    prerequisites: "",
    degree: "Bachelor",
    slots: 48,
  },
  {
    id: "1633",
    name: "Web Design & Development",
    description:
      "This unit introduces students to the underpinning services required to host, manage and access a secure website before introducing and exploring the methods used by designers and developers to blend back-end technologies (server-side) with front-end technologies (client-side). ",
    prerequisites: "[1622] Database Design & Development",
    degree: "Bachelor",
    slots: 48,
  },
  {
    id: "1690",
    name: "Internet of Things",
    description: "This unit introduces to students the technical foundation and the architecture of IoT ecosystems, platform and framework in IoT system design, encouraging a hands-on experience with lab practice and IoT application programming.",
    prerequisites: "",
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1644",
    name: "Cloud Computing",
    description:
      "This unit is designed to develop an understanding of the fundamental concept of Cloud Computing, cloud segments, and cloud deployment models, the need for Cloud Computing, an appreciation of issues associated with managing cloud service architecture and to develop a critical awareness of Cloud Computing based projects.",
    prerequisites: ["Already familar with server technologies example PHP Already familar with HTML/CSS/JS"],
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1649",
    name: "Data Structures & Algorithms",
    description: "This unit introduces students to data structures and how they are used in algorithms, enabling them to design and implement data structures. The unit introduces the specification of abstract data types and explores their use in concrete data structures. ",
    prerequisites: "1644",
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1641",
    name: "Advanced Computing",
    description:
      "This unit introduces students to the core concepts of programming with an introduction to algorithms and the characteristics of programming paradigms. Among the topics included in this unit are: introduction to algorithms, procedural, object- orientated & event - driven programming, security considerations, the integrated development environment and the debugging process.",
    prerequisites: "1618 ,1631",
    degree: "Bachelor",
    slots: 40,
  },
  {
    id: "1647",
    name: "	Application Development",
    description:
      "This unit introduces students to Application Development and is designed to simulate the roles and responsibilities of a commercial developer working in a suitable business environment with access to a small team of colleagues. Initially, students are introduced to a business-related problem and will need to adopt and use appropriate methods and practices to analyse, break down and discuss the issues – then, decide, design, create and test a possible solution..",
    prerequisites: "1651",
    degree: "Bachelor",
    slots: 40,
  },
];

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
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
  const handleSearch = () => { };

  const handleClearSearch = () => { };

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/subjects").then((res) => {
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
      let res = [];
      subjects.forEach((subject) => {
        res.push(createData(subject.id, subject.name, subject.description, subject.prerequisites, subject.degree, subject.slots));
      });
      setRows(res);
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
      console.log(index);
    } catch (e) {
      toast.error(e.toString(), {
        position: "bottom-left"
      })
    }
  };

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
                colNames={["id", "name", "description", "prerequisites", "degree", "slots"]}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleAddEntry={() => {
                  handleOpenSubjectModal();
                }}
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
          <Button onClick={handleClose}>Accept</Button>
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
