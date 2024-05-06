import { Grid, Button, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

export default function CourseworkMaterialModal(props) {
    const [type, setType] = useState(0);
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    const handleConfirm = () => {
        console.log(file);
        const formData = new FormData();
        formData.append("type", type)
        formData.append("course_id", props.course.id)

        if (type === 1) {
            formData.append("file", file)
        } else {
            formData.append("url", url)
        }
        axios.post(process.env.REACT_APP_HOST_URL + "/course/materials", formData).then((res) => {
            if (res.data.status) {
                props.sendToast("success", "Added new material!")
                props.closeHandler();
            } else {
                props.sendToast("error", "Failed to add new material!")
            }
        })
    };

    const handleChangeFile = (newValue) => {
        if (newValue.size > 1048576) {
            props.sendToast("error", "Must be smaller than 10mb")
        } else {
            setFile(newValue);
        }
    };

    return (
        <>
            <Grid
                container
                spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0, marginBottom: "10px" }}>
                        Add Coursework Materials.
                    </h2>
                    You can enter an url, select a file, or both.
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel>Material Type</InputLabel>
                        <Select
                            value={type}
                            label="Material Type"
                            onChange={(e) => setType(e.target.value)}>
                            <MenuItem
                                value={0}>
                                URL
                            </MenuItem>
                            <MenuItem
                                value={1}>
                                File
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {
                    type === 0 ? <Grid item xs={12} md={12}>
                        <TextField
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            id="form-url"
                            fullWidth
                            label="Material URL"
                            variant="outlined"
                        />
                    </Grid> : <Grid item xs={12} md={12}>
                        <MuiFileInput

                            value={file}
                            onChange={handleChangeFile}
                            label="File"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                }
                <Grid item xs={12} md={12}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        color="error"
                        fullWidth
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
