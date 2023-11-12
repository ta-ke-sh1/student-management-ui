import { Grid, Button, TextField, Box } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

export default function CourseworkMaterialModal(props) {
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    const handleConfirm = () => {
        console.log(file);

    };

    const handleChangeFile = (newValue) => {
        setFile(newValue);
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
                    <TextField
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        id="form-url"
                        fullWidth
                        label="Material URL"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <MuiFileInput
                        value={file}
                        onChange={handleChangeFile}
                        label="File"
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
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
