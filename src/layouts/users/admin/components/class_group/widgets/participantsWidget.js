import CustomTable from "../../../../../../components/table/table";
import { Grid } from "@mui/material";

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

export default function ParticipantsWidget(props) {
    return (
        <Grid
            container
            spacing={4}
            style={{ marginBottom: "30px", width: "98.5%" }}>
            <Grid item xs={12}>
                <div className="big-widget">
                    <h2>Participants List</h2>
                    <div className="programme-list">
                        <CustomTable
                            handleAddEntry={props.handleAddParticipant}
                            title={"Campus"}
                            rows={props.participants}
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