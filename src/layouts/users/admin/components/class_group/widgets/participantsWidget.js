import CustomTable from "../../../../../../common/table/table";
import { Grid, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@mui/material";
import { filterByAttribute, getAllHeaderColumns } from "../../../../../../utils/utils";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const headCells = [
    {
        id: "student_id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
];

export default function ParticipantsWidget(props) {
    const [showModal, setShowModal] = useState(false);
    const [participant, setParticipant] = useState({})

    const handleDelete = (id) => {
        setShowModal(true)
        let data = filterByAttribute(props.participants, "id", id);
        setParticipant(data[0]);
    }

    const handleDeleteConfirmed = (id) => {
        console.log(participant)
        axios.delete(process.env.REACT_APP_HOST_URL + "/semester/participants", {
            params: {
                groupId: participant.id,
                studentId: participant.student_id
            }
        }).then((res) => {
            console.log(res)
            if (res.status) {
                setShowModal(false)
                toast("Student deleted")
                props.handleRefreshEntry(props.participants[0].group_id)
            }
        })
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <Grid
                container>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="programme-list">
                            {
                                props.firstClick ? <CustomTable
                                    handleRefreshEntry={() => {
                                        props.handleRefreshEntry(props.participants[0].group_id)
                                    }
                                    }
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

            <Dialog
                open={showModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{
                    zIndex: 100000000000,
                }}
            >
                <DialogTitle id="alert-dialog-title">Delete Student from class</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">This action cannot be undone!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmed}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    )
}