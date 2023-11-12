import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { decodeToken, normalizeIndex } from "../../../../../utils/utils";

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
        {subjects.map((subject, index) => {
          return (
            <div className="curriculum-row">
              <Card sx={{
                display: "flex",
              }}>
                <CardMedia sx={{
                  width: "150px",
                  backgroundImage:
                    `url(${process.env.PUBLIC_URL}/banner/banner` +
                    normalizeIndex(index + 1) +
                    ".jpg)",
                }}>
                </CardMedia>
                <CardContent sx={{
                  padding: "20px",
                  flex: "1 0 auto",
                }}>
                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <strong style={{ marginRight: '10px' }}>{subject.id}</strong>
                    </Grid>
                    <Grid item xs={6}>
                      <strong style={{ marginRight: '10px' }}></strong> {subject.name}
                    </Grid>
                    <Grid item justify="flex-end" xs={2}>
                      <Box display="flex" justifyContent="flex-end">
                        <strong style={{ marginRight: '10px' }}>Grade:</strong> {subject.grade ? <>{subject.grade}</> : <>Not yet</>}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

            </div>
          );
        })}
      </div>
    </>
  );
}
