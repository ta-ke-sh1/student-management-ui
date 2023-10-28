import {
    Grid,
    FormControl,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Divider,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function SubjectForm(props) {

    const [subject, setSubject] = useState(props.subject)
    const _id = props.subject.id
    const [subjectId, setSubjectId] = useState(props.subject.id ?? "")
    const [name, setName] = useState(props.subject.name ?? "");
    const [description, setDescription] = useState(props.subject.description ?? "")
    const [prerequisites, setPrerequisites] = useState(props.subject.prerequisites ?? "N/A");
    const [degree, setDegree] = useState(props.subject.degree ?? "")
    const [slots, setSlots] = useState(props.subject.slots ?? 40);


    const handleConfirm = (e) => {
        e.preventDefault()
        if (name && description && prerequisites && degree && slots) {
            if (_id) {
                axios.put(process.env.REACT_APP_HOST_URL +
                    "/subject?id=" +
                    subjectId,
                    {
                        id: subjectId,
                        name: name,
                        description: description,
                        prerequisites: prerequisites,
                        degree: degree,
                        slots: slots
                    }).then((res) => {
                        if (res.data.status) {
                            props.closeHandler();
                            props.refresh();
                        } else {
                            toast.error(res.data.data, {
                                position: "bottom-left"
                            })
                        }
                    });
            } else {
                axios.post(process.env.REACT_APP_HOST_URL +
                    "/subject",
                    {
                        id: subjectId,
                        name: name,
                        description: description,
                        prerequisites: prerequisites,
                        degree: degree,
                        slots: slots
                    }).then((res) => {
                        if (res.data.status) {
                            props.closeHandler();
                            props.refresh();
                        } else {
                            toast.error(res.data.data, {
                                position: "bottom-left"
                            })
                        }
                    });
            }
        } else {
            toast.error("Please fill all fields", {
                position: "bottom-left"
            })
        }
    }


    return (
        <>

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage Subject</h2>
                    <p>You can manage the subject using this form</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={_id ? true : false}
                        onChange={(e) => setSubjectId(e.target.value)}
                        value={subjectId}
                        id="form-name"
                        fullWidth
                        label="Subject Code"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="form-name"
                        fullWidth
                        label="Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="form-description"
                        label="Description"
                        variant="outlined"
                        rows={3}
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)}
                        id="form-prerequisites"
                        label="Prerequisites"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        id="form-degree"
                        label="Degree"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        fullWidth
                        value={slots}
                        onChange={(e) => setSlots(e.target.value)}
                        id="form-slots"
                        label="Slot Number"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="contained" sx={{ padding: '15px 30px' }} onClick={(e) => handleConfirm(e)}>Save</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="outlined" sx={{ padding: '15px 30px' }} onClick={props.closeHandler}>Cancel</Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    )
}