import { Grid, Button, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import Constants from "../../../../../utils/constants";
import { toast } from "react-toastify";

export default function RequestForm(props) {
  const constants = new Constants();
  console.log(props.request)

  const [id, setId] = useState(props.request.id ?? "");
  const [comment, setComment] = useState(props.request.comments ?? "");
  const [path, setPath] = useState(props.request.path ?? "");
  const [status, setStatus] = useState(props.request.status ?? "");
  const [requestType, setRequestType] = useState(props.request.request_type ?? "");

  const [file, setFile] = useState(null);

  const handleConfirm = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("path", "/requests/" + file.name);
      formData.append("file", file);

      console.log(file);

      if (id) {
        axios.put(process.env.REACT_APP_HOST_URL + "/request?id=" + id, formData).then((res) => {
          if (res.data.status) {
            props.closeHandler();
          } else {
            toast.error(res.data.data, {
              position: "bottom-left"
            })
          }
        });
      } else {
        axios
          .post(process.env.REACT_APP_HOST_URL + "/request", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((res) => {
            if (res.data.status) {
              props.closeHandler();
            } else {
              toast.error(res.data.data, {
                position: "bottom-left"
              })
            }
          });
      }
    }
  };

  const handleChangeFile = (newValue) => {
    setFile(newValue);
    setComment(newValue.name);
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
            <InputLabel id="requestType-select-label">Select a Request Type</InputLabel>
            <Select
              labelId="requestType-select-label"
              value={requestType}
              label="Select a Request Type"
              onChange={(e) => {
                setRequestType(e.target.value);
              }}
            >
              {constants.requestTypes.map((requestType) => (
                <MenuItem key={"option-requestType-" + requestType.id} value={requestType.id}>
                  {requestType.id} - {requestType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {
          props.request.id ?
            <></>
            :
            <Grid item xs={12} md={12}>
              <MuiFileInput value={file} onChange={handleChangeFile} fullWidth={true} />
            </Grid>
        }

        <Grid item xs={12} md={12}>
          <TextField onChange={(e) => setComment(e.target.value)} value={comment} id="form-comment" fullWidth label="Comment" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="requestType-select-label">Request Status</InputLabel>
            <Select
              labelId="requestType-select-label"
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
