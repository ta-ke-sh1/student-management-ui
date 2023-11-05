
import { Grid, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllSubmissionsTab(props) {
  const [submissions, setSubmisisions] = useState([]);

  useEffect(() => {
    fetchRows();
  }, []);

  function fetchRows() {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/").then((res) => {
        if (res.data.status) {
          let data = res.data.data;
          if (!Array.isArray(data)) {
            data = [];
          }
          setSubmisisions(res.data.data);
        } else {
          props.sendToast("error", res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  function handleSubmit() {
    try {
      axios
        .post(process.env.REACT_APP_HOST_URL + "/schedule/submission", {
          submissions,
        })
        .then((res) => {
          if (res.data.status) {
            props.sendToast("success", "Submisision List Added!");
          } else {
            props.sendToast("error", res.data.data);
          }
        });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  function handleReturn() { }

  return (
    <>
      <div className="curriculum-container">
        <h2
          className="bold"
          style={{
            fontSize: "1.75rem",
          }}
        >
          Submissions
        </h2>
        <div className="curriculum-row">
          <Grid container>
            <Grid item xs={2}>
              Index
            </Grid>
            <Grid item xs={2}>
              Student_id
            </Grid>
            <Grid item xs={2}>
              Submission Time
            </Grid>
            <Grid item xs={2}>
              File
            </Grid>
            <Grid item xs={2}>
              Grade
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                Action
              </Box>
            </Grid>
          </Grid>
        </div>
        {submissions.map((submission, index) => {
          return (
            <div className="curriculum-row">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={2} sm={2}>
                      {index}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {submission.student_id}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {submission.time}
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      {submission.file}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {submission.grade}
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <Button>Grade Now</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
}
