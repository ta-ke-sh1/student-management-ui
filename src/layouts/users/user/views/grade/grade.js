import { Divider, Grid, Hidden, Paper, TableContainer, TableRow, TableCell, Table } from "@mui/material";

import Footer from "../../../../../footer";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function GradeUser() {
  // const { courseData } = useFetchCourses("test");
  const { id } = useParams();

  const [course, setCourse] = useState({
    class: "COMP-1787",
    teacher: "VinhNT",
    semester: "Spring 2023",
    name: "Requirements Management",
  });

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = () => {
    console.log(id);
    axios.get(process.env.REACT_APP_HOST_URL + "/grade?q=" + id).then((res) => {
      if (!res.data.status) {
        toast.error(res.data.data, {
          position: "bottom-left",
        });
      } else {
        setCourse(res.data.data);
      }
    });
  };

  return (
    <>
      <div className="main-container">
        <div
          className="course-head-banner"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 1 + ".jpg)",
            backgroundSize: "contain",
            borderBottomLeftRadius: "50px",
          }}
        ></div>
        <div className="page-content">
          <div
            className="serif"
            style={{
              fontSize: "4rem",
            }}
          >
            {course.class} - {course.teacher} - {course.name}
          </div>
          <Grid container columns={12}>
            <Hidden mdDown>
              <Grid item md={3} className="course-nav-col">
                <h2>Navigation</h2>
                <Divider sx={{ margin: "20px 0" }} />
                <h3>Courseworks</h3>
                <p>Assignment 1 - Deadline:</p>
                <p>Assignment 2 - Deadline:</p>
                <Divider sx={{ margin: "20px 0" }} />
                <h3>Materials</h3>
                <p>Slides</p>
                <p>Assignment</p>
                <p>Notes & Guides</p>
              </Grid>
            </Hidden>
            <Grid item xs={12} md={9} className="course-main-col">
              <div className="course-item-title">
                <h2>Grading Report - Assigment 1</h2>
              </div>
              <p>Opened on:</p>
              <p>Deadline:</p>
              <p>Status: Graded</p>
              <br />
              <div className="course-item-title">
                <h2>Submission Status</h2>
              </div>
              <br />
              <TableContainer component={Paper} className="submission-table" elevation={0}>
                <Table fullWidth>
                  <TableRow>
                    <TableCell className="col-1">Submission Status</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="col-1">Grading Status</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="col-1">Grading criteria</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="col-1">Submission</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <br />
              <br />
              <div className="course-item-title">
                <h2>Feedbacks</h2>
              </div>
              <br />
              <TableContainer component={Paper} className="submission-table" elevation={0}>
                <Table fullWidth>
                  <TableRow>
                    <TableCell className="col-1">Grade</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="col-1">Graded on</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="col-1">Graded By</TableCell>
                    <TableCell className="col-2"></TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </div>
      <Hidden smUp>
        <br />
        <br />
        <br />
        <br />
      </Hidden>
      <Footer />
      <ToastContainer />
    </>
  );
}
