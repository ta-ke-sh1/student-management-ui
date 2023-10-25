import { Grid, Button, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import Constants from "../../../../../utils/constants";

export default function RequestForm(props) {
  const constants = new Constants();
  const [id, setId] = useState(props.document.id);
  const [name, setName] = useState(props.document.name);
  const [path, setPath] = useState(props.document.path);
  const [status, setStatus] = useState(props.document.status);
  const [requestType, setRequestType] = useState("");

  const [file, setFile] = useState(null);

  const handleConfirm = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("path", "/documents/" + file.name);
      formData.append("file", file);

      console.log(file);

      if (id) {
        axios.put(process.env.REACT_APP_HOST_URL + "/document?id=" + id, formData).then((res) => {
          if (res.status === 200) {
            props.closeHandler();
          }
        });
      } else {
        axios
          .post(process.env.REACT_APP_HOST_URL + "/document", formData, {
            "Content-Type": "multipart/form-data",
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
    setName(newValue.name);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h2 style={{ margin: 0 }}>Manage Request</h2>
          <p>You can manage the request using this form</p>
        </Grid>
        <Divider />
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="term-select-label">Select a Request Type</InputLabel>
            <Select
              labelId="term-select-label"
              value={requestType}
              label="Select a Type"
              onChange={(e) => {
                setRequestType(e.target.value);
              }}
            >
              {constants.requestTypes.map((term) => (
                <MenuItem key={"option-term-" + term.id} value={term.id}>
                  {term.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <MuiFileInput value={file} onChange={handleChangeFile} fullWidth={true} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField onChange={(e) => setName(e.target.value)} value={name} id="form-name" fullWidth label="Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="term-select-label">Request Status</InputLabel>
            <Select
              labelId="term-select-label"
              value={status}
              label="Select a Type"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={-1}>Pending</MenuItem>
              <MenuItem value={0}>Declined</MenuItem>
              <MenuItem value={1}>Accepted</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained" sx={{ padding: "15px 30px" }} onClick={(e) => handleConfirm(e)}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button color="error" fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
