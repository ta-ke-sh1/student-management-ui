import {
    Grid,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";

export default function RegulationAndFilesForm(props) {
    const [id, setId] = useState(props.document.id);
    const [name, setName] = useState(props.document.name);
    const [path, setPath] = useState(props.document.path);
    const [status, setStatus] = useState(props.document.status);

    const [file, setFile] = useState(null)

    const handleConfirm = (e) => {
        e.preventDefault();

        if (file) {
            const formData = new FormData()
            formData.append("name", file.name)
            formData.append("path", "/documents/" + file.name)
            formData.append("file", file)

            console.log(file)

            if (id) {
                axios
                    .put(
                        process.env.REACT_APP_HOST_URL +
                        "/document?id=" +
                        id,
                        formData
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            props.closeHandler();
                        }
                    });
            } else {
                axios
                    .post(process.env.REACT_APP_HOST_URL + "/document", formData, {
                        'Content-Type': 'multipart/form-data'
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            props.closeHandler();
                        }
                    });
            }
        }
    };

    const handleChangeFile = (newValue) => {
        setFile(newValue);
        setName(newValue.name)
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage document</h2>
                    <p>You can manage your document using this form</p>
                </Grid>
                <Divider />
                <Grid item xs={12} md={12}>
                    <MuiFileInput
                        value={file}
                        onChange={handleChangeFile}
                        fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="form-name"
                        fullWidth
                        label="Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
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
