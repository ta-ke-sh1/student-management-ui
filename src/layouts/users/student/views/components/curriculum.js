import { Box, Grid, useThemeProps } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CurriculumTab(props) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = () => {
    axios.get(process.env.REACT_APP_HOST_URL + "/user/curriculum?id=" + props.user.id).then((res) => {
      if (!res.data.status) {
        toast.error(res.data.data, {
          position: "bottom-left",
        });
      } else {
        setSubjects(res.data.data);
      }
    });
  };

  return (
    <>
      <div className="curriculum-container">
        <h2
          className="bold"
          style={{
            fontSize: "1.75rem",
          }}
        >
          Curriculum
        </h2>
        <div className="curriculum-row">
          <Grid container>
            <Grid item xs={2}>
              Index
            </Grid>
            <Grid item xs={2}>
              Code
            </Grid>
            <Grid item xs={6}>
              Name
            </Grid>
            <Grid item xs={1}>
              Term
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                Grade
              </Box>
            </Grid>
          </Grid>
        </div>
        {subjects.map((subject, index) => {
          return (
            <div className="curriculum-row">
              <Grid container>
                <Grid item xs={2}>
                  {index}
                </Grid>
                <Grid item xs={2}>
                  {subject.id}
                </Grid>
                <Grid item xs={6}>
                  {subject.name}
                </Grid>
                <Grid item xs={1}>
                  {subject.term}
                </Grid>
                <Grid item justify="flex-end" xs={1}>
                  <Box display="flex" justifyContent="flex-end">
                    {subject.grade ? <>{subject.grade}</> : <>Not yet</>}
                  </Box>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
}
