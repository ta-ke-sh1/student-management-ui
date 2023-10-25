import { Grid } from "@mui/material"
import CustomTable from "../../../../../../components/table/table"

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
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
                            handleAddEntry={props.handleAddEntry}
                            title={"Schedules"}
                            rows={props.schedules}
                            headCells={headCells}
                            colNames={[
                                "id",
                                "programme",
                                "building",
                                "number",
                            ]}
                            handleEdit={props.handleEdit}
                            handleDelete={props.handleDelete}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}