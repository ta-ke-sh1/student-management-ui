import { useEffect, useState } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GroupWidget from "./widgets/groupWidget";
import axios from "axios";
import GroupForm from "./forms/groupForm";
import ParticipantsWidget from "./widgets/participantsWidget";
import ScheduleWidget from "./widgets/scheduleWidget";
import ScheduleListForm from "./forms/scheduleForm";
import ParticipantsForm from "./forms/participantsForm";
import Constants from "../../../../../utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttendanceWidget from "./widgets/attendanceWidget";
import AttendanceForm from "./forms/attendanceForm";
import { filterByAttribute } from "../../../../../utils/utils";

export default function FGWClass(props) {
  const constants = new Constants();

  const [programme, setProgramme] = useState("");
  const [term, setTerm] = useState("");

  const [participants, setParticipants] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const [participant, setParticipant] = useState({});
  const [schedule, setSchedule] = useState({});
  const [attendance, setAttendance] = useState({});

  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openParticipantsModal, setOpenParticipantsModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

  const [group, setGroup] = useState({});

  const [selectedSession, setSelectedSession] = useState({});

  const [groups, setGroups] = useState([]);

  const [year, setYear] = useState(2023);
  const [department, setDepartment] = useState("");

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [firstClick, setFirstClick] = useState(false);
  const [firstClickAttendance, setFirstClickAttendance] = useState(false);


  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGroups();

    return function cleanUp() {
      localStorage.setItem("groups_data", "")
    }
  }, []);

  const handleSearchGroup = async () => {

    let groups = JSON.parse(localStorage.getItem("groups_data"))
    if (programme !== "") {
      groups = groups.filter(function (group) {
        return group.programme === programme
      })
    }

    if (term !== "") {
      groups = groups.filter(function (group) {
        return group.term.startsWith(term)
      })
    }

    if (year !== "") {
      if (year > 2030 || year < 2000) {
        props.sendToast("error", "Year must be between 2000 and 2030")
        return;
      }
      groups = groups.filter(function (group) {
        return group.term.endsWith(year.toString().substr(2, 2))
      })
    }

    if (department !== "") {
      groups = groups.filter(function (group) {
        return group.department === department
      })
    }

    setGroups(groups)
  };

  const handleClearSearchGroup = () => {
    setProgramme("");
    setTerm("");
    setYear("")
    setDepartment("")
    let groups = JSON.parse(localStorage.getItem("groups_data"))
    setGroups(groups)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenGroupModal = (e) => {
    setOpenGroupModal(true);
  };

  const handleCloseGroupFormModal = () => {
    setOpenGroupModal(false);
  };

  const handleCloseScheduleFormModal = () => {
    setOpenScheduleModal(false);
  };

  const handleCloseParticipantFormModal = () => {
    setOpenParticipantsModal(false);
  };

  const handleCloseAttendanceFormModal = () => {
    setOpenAttendanceModal(false);
  };

  const handleEditGroup = (id) => {
    let data = filterByAttribute(groups, "id", id);
    console.log(data)
    setGroup(data[0]);
    setOpenGroupModal(true);
  };

  const handleEditParticipant = (id) => {
    let data = filterByAttribute(participants, "id", id);
    console.log(data)
    setParticipant(data[0]);
    setOpenParticipantsModal(true);
  };

  const handleEditSchedule = (id) => {
    let data = filterByAttribute(schedules, "id", id);
    console.log(data)
    setSchedule(data[0]);
    setOpenScheduleModal(true);
  };

  const fetchGroups = async () => {
    try {
      await axios.get(process.env.REACT_APP_HOST_URL + "/semester/groups").then((res) => {
        if (res.data.status) {
          setGroups(res.data.data);
          localStorage.setItem("groups_data", JSON.stringify(res.data.data));
        } else {
          props.sendToast("error", res.data.data)
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const fetchParticipants = async (id) => {
    try {
      await axios.get(process.env.REACT_APP_HOST_URL + "/semester/participants?id=" + id).then((res) => {
        if (res.data.status) {
          setParticipants(res.data.data ?? []);
        } else {
          props.sendToast("error", res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const fetchSchedules = async (id) => {
    try {
      await axios.get(process.env.REACT_APP_HOST_URL + "/semester/schedules?id=" + id).then((res) => {
        if (res.data.status) {
          setSchedules(res.data.data);
        } else {
          props.sendToast("error", res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const fetchAttendances = async (id) => {
    try {
      await axios.get(process.env.REACT_APP_HOST_URL + "/schedule/attendances?id=" + id).then((res) => {
        if (res.data.status) {
          setAttendances(res.data.data);
        } else {
          props.sendToast("error", res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  const handleSearchInfo = async (id) => {
    let group = filterByAttribute(groups, "id", id)
    setGroup(group[0])
    fetchParticipants(id);
    fetchSchedules(id);
    setFirstClick(true);
  };

  const handleSearchAttendance = async (id) => {
    console.log(id)
    setFirstClickAttendance(true);
    fetchAttendances(id);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={9}>
          <div className="big-widget" style={{ paddingBottom: "25px" }}>
            <h2>Class Group Control</h2>
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
                    {constants.terms.map((term) =>
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
                <TextField type="number" onChange={(e) => setYear(e.target.value)} value={year} id="year" fullWidth label="Year" variant="outlined" />
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
              <Grid item xs={12} md={6}>
                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleSearchGroup(e)}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={(e) => handleClearSearchGroup(e)}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} md={3}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
              width: "100%",
              height: "240px",
              borderRadius: "10px",
              backgroundSize: "contain",
            }}
          ></div>
        </Grid>
        <Grid item sm={12} md={12}>
          <GroupWidget
            handleRefreshEntry={fetchGroups}
            handleSearchInfo={handleSearchInfo}
            handleAddEntry={() => {
              handleOpenGroupModal();
            }}
            groups={groups}
            programme={programme}
            department={department}
            term={term + "-" + year.toString().substr(2, 2)}
            handleEdit={handleEditGroup}
          />
        </Grid>
        {firstClick ? (
          <>
            <Grid item sm={12} md={12}>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  sx={{
                    borderBottom: "3px solid #F11A7B",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <strong>Selected group details:</strong>
                  <span style={{ marginLeft: "10px" }}>{group.id}</span>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingTop: "20px" }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <ScheduleWidget
                        handleAddEntry={() => {
                          setOpenScheduleModal(true);
                        }}
                        closeHandler={() => setOpenScheduleModal(false)}
                        handleSearchAttendance={handleSearchAttendance}
                        handleEdit={handleEditSchedule}
                        firstClick={firstClick}
                        schedules={schedules}
                        refresh={fetchSchedules}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ParticipantsWidget
                        firstClick={firstClick}
                        handleAddEntry={() => {
                          setOpenParticipantsModal(true);
                        }}
                        closeHandler={() => setOpenParticipantsModal(false)}
                        handleEdit={handleEditParticipant}
                        participants={participants}
                        refresh={fetchParticipants}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        ) : (
          <></>
        )}
        {firstClickAttendance ? (
          <Grid item sm={12} md={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                sx={{
                  borderBottom: "3px solid #F11A7B",
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <strong>Attendance Report: </strong>
                <span style={{ marginLeft: "10px" }}>{selectedSession.id}</span>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingTop: "20px" }}>
                <AttendanceWidget
                  handleAddEntry={() => {
                    setOpenAttendanceModal(true);
                  }}
                  handleEdit={handleEditParticipant}
                  attendances={attendances}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
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

      <Dialog maxWidth="lg" className="modal" fullWidth={true} open={openGroupModal} onClose={() => setOpenGroupModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <GroupForm closeHandler={handleCloseGroupFormModal} group={group} refresh={fetchGroups} />
        </DialogContent>
      </Dialog>

      <Dialog maxWidth="lg" className="modal" fullWidth={true} open={openScheduleModal} onClose={() => setOpenScheduleModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <ScheduleListForm closeHandler={handleCloseScheduleFormModal} schedule={schedule} group={group} participants={participants} refresh={fetchSchedules} />
        </DialogContent>
      </Dialog>

      <Dialog maxWidth="md" className="modal" fullWidth={true} open={openParticipantsModal} onClose={() => setOpenParticipantsModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <ParticipantsForm closeHandler={handleCloseParticipantFormModal} refresh={fetchParticipants} participant={participant} group={group} />
        </DialogContent>
      </Dialog>

      <Dialog maxWidth="md" className="modal" fullWidth={true} open={openAttendanceModal} onClose={() => setOpenAttendanceModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <AttendanceForm closeHandler={handleCloseAttendanceFormModal} attendance={attendance} group={group} participants={participants} />
        </DialogContent>
      </Dialog>
    </>
  );
}
