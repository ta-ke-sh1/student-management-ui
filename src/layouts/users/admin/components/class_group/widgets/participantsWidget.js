import CustomTable from "../../../../../../common/table/table";
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
            container>
            <Grid item xs={12}>
                <div className="big-widget">
                    <div className="programme-list">
                        {
                            props.firstClick ? <CustomTable
                                handleAddEntry={props.handleAddEntry}
                                title={"Participants List"}
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
                            /> : <><h3>Please select a group to see its participants</h3></>
                        }

                    </div>
                </div>
            </Grid>
        </Grid>
    )
}