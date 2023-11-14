import CustomTable from "../../../../../../common/table/table";
import { Grid } from "@mui/material";
import { getAllHeaderColumns } from "../../../../../../utils/utils";

const headCells = [
    {
        id: "student_id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
];

export default function ParticipantsWidget(props) {

    const handleDelete = (id) => {
        console.log(id)
    }

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
                                colNames={getAllHeaderColumns(headCells)}
                                handleEdit={props.handleEdit}
                                handleDelete={handleDelete}
                            /> : <><h3>Please select a group to see its participants</h3></>
                        }

                    </div>
                </div>
            </Grid>
        </Grid>
    )
}