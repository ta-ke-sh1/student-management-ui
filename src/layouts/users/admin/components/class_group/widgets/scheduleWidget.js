import { Grid } from "@mui/material"
import CustomTable from "../../../../../../components/table/table"

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Group Id",
    },
    {
        id: "programme",
        numeric: true,
        disablePadding: false,
        label: "Campus",
    },
    {
        id: "building",
        numeric: true,
        disablePadding: false,
        label: "Building",
    },
    {
        id: "number",
        numeric: true,
        disablePadding: false,
        label: "Group Number",
    },
];

export default function ScheduleWidget(props) {
    return (
        <Grid
            container
            spacing={4}>
            <Grid item xs={12}>
                <div className="big-widget">
                    <div className="programme-list">
                        <CustomTable
                            handleAddEntry={props.handleAddSchedule}
                            title={"Campus"}
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