import { Grid } from "@mui/material";
import CustomTable from "../../../../../../common/table/table";
import { getAllHeaderColumns } from "../../../../../../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "dateString",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "session",
    numeric: true,
    disablePadding: false,
    label: "Session",
  },
  {
    id: "slot",
    numeric: true,
    disablePadding: false,
    label: "Slot",
  },

  {
    id: "room",
    numeric: true,
    disablePadding: false,
    label: "Room",
  },
  {
    id: "lecturer",
    numeric: true,
    disablePadding: false,
    label: "Lecturer",
  },
];

export default function ScheduleWidget(props) {
  console.log(props);

  const handleDelete = async (id) => {
    console.log(id);
    let q;
    if (Array.isArray(id)) {
      q = id.join("%")
    } else {
      q = id;
    }

    await axios.delete(process.env.REACT_APP_HOST_URL + "/schedule", {
      params: {
        queue: q
      }
    }).then((res) => {
      if (res.data.status) {
        props.refresh();
        toast.success("Selected schedules deleted!", {
          position: "bottom-left"
        });
      } else {
        toast.error(res.data.data, {
          position: "bottom-left"
        });
      }
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="big-widget">
          <div className="programme-list">
            <CustomTable
              isCampusControl={true}
              handleSearchInfo={props.handleSearchAttendance}
              handleAddEntry={props.handleAddEntry}
              title={"Schedules"}
              rows={props.schedules}
              headCells={headCells}
              colNames={getAllHeaderColumns(headCells)}
              handleEdit={props.handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
