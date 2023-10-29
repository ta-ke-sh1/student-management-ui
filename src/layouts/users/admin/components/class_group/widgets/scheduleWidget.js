import { Grid } from "@mui/material"
import CustomTable from "../../../../../../common/table/table"
import { getAllHeaderColumns } from "../../../../../../utils/utils";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Date",
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
    console.log(props)

    return (
        <Grid
            container>
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
                            handleDelete={props.handleDelete}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}