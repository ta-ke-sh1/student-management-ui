import CustomTable from "../../../../../../common/table/table";
import { Grid } from "@mui/material";
import { getAllHeaderColumns } from "../../../../../../utils/utils";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Attendance Id",
    },
    {
        id: "slotId",
        numeric: true,
        disablePadding: false,
        label: "Slot Id"
    },
    {
        id: "student_id",
        numeric: true,
        disablePadding: false,
        label: "Student Id",
    },
    {
        id: "student_name",
        numeric: true,
        disablePadding: false,
        label: "Student Name",
    },
    {
        id: "isAttended",
        numeric: true,
        disablePadding: false,
        label: "Is Attended",
    },
];

export default function AttendanceWidget(props) {
    return (
        <Grid
            container>
            <Grid item xs={12}>
                <div className="big-widget">
                    <div className="programme-list">
                        {
                            <CustomTable
                                handleAddEntry={props.handleAddEntry}
                                title={"Attendance List"}
                                rows={props.attendances}
                                headCells={headCells}
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={props.handleEdit}
                                handleDelete={props.handleDelete}
                            />
                        }
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}