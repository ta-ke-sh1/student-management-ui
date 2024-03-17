import { DialogContentText, Dialog } from "@mui/material";

import { useFetchRequests } from "./api/apiFunctions";
import AttendanceWidget from "./layouts/users/admin/components/class_group/widgets/attendanceWidget";
import AttendanceForm from "./layouts/users/admin/components/class_group/forms/attendanceForm";
import { useState } from "react";

export default function CompoundSearch() {
  const [attendance, setAttendance] = useState([])
  const [attendances, setAttendances] = useState([])
  const [participants, setParticipants] = useState([]);
  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

  const group = {}

  const handleCloseAttendanceFormModal = () => {
    setOpenAttendanceModal(false);
  };

  const handleEditParticipant = () => {
    setOpenAttendanceModal(true);
    setAttendance(data[0])
  }

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "100px auto",
        }}
      >
        <AttendanceWidget
          handleAddEntry={() => {
            setOpenAttendanceModal(true);
          }}
          handleEdit={handleEditParticipant}
          attendances={data}
        />
      </div>

      <Dialog maxWidth="md" className="modal" fullWidth={true} open={openAttendanceModal} onClose={() => setOpenAttendanceModal(false)}>
        <DialogContentText
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <AttendanceForm closeHandler={handleCloseAttendanceFormModal} attendance={attendance} group={group} participants={participants} />
        </DialogContentText>
      </Dialog>
    </>
  );
}

const data = [
  {
    "id": "F2G-SU-23-GCH-Testing-ductm-session11",
    "date": 1701698983708,
    "group_id": "F2G-SU-23-GCH-Testing",
    "dob": "2002-04-22",
    "session": 11,
    "student_id": "ductm",
    "remark": -1,
    "status": true
  },
  {
    "id": "F2G-SU-23-GCH-Testing-namnt-session11",
    "date": 1701698983708,
    "group_id": "F2G-SU-23-GCH-Testing",
    "dob": "2001-11-14",
    "session": 11,
    "student_id": "namnt",
    "remark": -1,
    "status": true
  },
  {
    "id": "F2G-SU-23-GCH-Testing-sonnt-session11",
    "date": 1701698983708,
    "group_id": "F2G-SU-23-GCH-Testing",
    "dob": "2002-04-22",
    "session": 11,
    "student_id": "sonnt",
    "remark": -1,
    "status": true
  },
  {
    "id": "F2G-SU-23-GCH-Testing-sonnt1-session11",
    "date": 1701698983708,
    "group_id": "F2G-SU-23-GCH-Testing",
    "dob": "2023-11-08",
    "session": 11,
    "student_id": "sonnt1",
    "remark": -1,
    "status": true
  }
]
