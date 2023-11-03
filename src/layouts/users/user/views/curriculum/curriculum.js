import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { decodeToken } from "../../../../../utils/utils";

export default function CurriculumTab(props) {
  const token = decodeToken(localStorage.getItem("access_token"));
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = () => {
    try {
      axios.get(process.env.REACT_APP_HOST_URL + "/user/curriculum?id=" + token.id).then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          setSubjects(res.data.data);
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
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
            <Grid item xs={2}>
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
                <Grid item justify="flex-end" xs={2}>
                  <Box display="flex" justifyContent="flex-end">
                    {subject.grade ? <>{subject.grade}</> : <>Not yet</>}
                  </Box>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
}
