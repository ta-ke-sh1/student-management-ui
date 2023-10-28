import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomTable from "../../../../../../common/table/table";
import { useEffect } from "react";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "programme",
        numeric: true,
        disablePadding: false,
        label: "Programme",
    },
    {
        id: "department",
        numeric: true,
        disablePadding: false,
        label: "Department",
    },
    {
        id: "term",
        numeric: true,
        disablePadding: false,
        label: "Term",
    }, {
        id: "slots",
        numeric: true,
        disablePadding: false,
        label: "Slots",
    },
    {
        id: "subject",
        numeric: true,
        disablePadding: false,
        label: "Subject",
    }, {
        id: "lecturer",
        numeric: true,
        disablePadding: false,
        label: "Lecturer",
    },
];

export default function GroupWidget(props) {

    function createData(programme, department, term, id, slots, subject, lecturer) {
        return {
            programme, department, term, id, slots, subject, lecturer
        };
    }

    let data = [];
    props.groups.forEach((row) => {
        data.push(
            createData(row.programme, row.department, row.term, row.id, row.slots, row.subject, row.lecturer)
        )
    })

    useEffect(() => {

    })

    const fetchData = (id) => {
        return data.find((row) => row.id === id)
    }

    const handleEdit = (id) => {
        let data = fetchData(id)
        console.log(data)
    }

    const handleDelete = (id) => {
        console.log(id)
    }

    return (
        <Grid
            container
            spacing={4}>
            <Grid item xs={12}>
                <div className="big-widget">
                    <CustomTable
                        handleRefreshEntry={props.handleRefreshEntry}
                        isCampusControl={true}
                        handleSearchInfo={props.handleSearchInfo}
                        handleGetSelected={props.handleGetSelected}
                        getSelectedId={props.getSelectedId}
                        additionalTools={props.additionalTools}
                        handleAddEntry={props.handleAddEntry}
                        title={"Campus"}
                        rows={data}
                        headCells={headCells}
                        colNames={[
                            "id", "programme", "department", "term", "slots", "subject", "lecturer"
                        ]}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </Grid>
        </Grid>
    )
}