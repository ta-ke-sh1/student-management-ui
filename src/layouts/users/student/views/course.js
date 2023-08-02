import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Hidden, Paper, Typography, TableContainer, TableRow, TableCell, Table } from "@mui/material"
import { useFetchCourses } from "../hooks/useFetchCourse"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from "../../../../footer";

export default function CourseUser() {

    // const { courseData } = useFetchCourses("test");

    const course = {
        class: "COMP-1787",
        teacher: "VinhNT",
        semester: "Spring 2023",
        name: "Requirements Management",
    }


    return (
        <>
            <div className="main-container">
                <div className="course-head-banner" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 1 + ".jpg)",
                    backgroundSize: 'contain',
                    borderBottomLeftRadius: '50px'
                }}>
                </div>
                <div className="page-content">
                    <div className="serif" style={{
                        fontSize: '4rem',
                        marginLeft: '40px',
                        marginBottom: '40px'
                    }}>
                        {course.class} - {course.teacher} - {course.name}
                    </div>
                    <Grid container columns={12}>
                        <Hidden mdDown>
                            <Grid item md={3} className="course-nav-col" >
                                <h2>Navigation</h2>
                                <Divider sx={{ margin: '20px 0' }} />
                                <h3>Courseworks</h3>
                                <p>Assignment 1 - Deadline:</p>
                                <p>Assignment 2 - Deadline:</p>
                                <Divider sx={{ margin: '20px 0' }} />
                                <h3>Materials</h3>
                                <p>Slides</p>
                                <p>Assignment</p>
                                <p>Notes & Guides</p>

                            </Grid>
                        </Hidden>

                        <Grid item xs={12} md={9} className="course-main-col">
                            <div className='course-item-title'>
                                <h2>Welcome</h2>
                            </div>
                            <p>
                                This site will provide you all the key information and learning resources for this module. Please ensure you familiarise yourself with the University of Greenwich Vietnam's Handbook where you will find all the information regarding the module, weekly schedule, assessments and more.
                                If you have any questions or no content is being shown in this CMS Page, please get in touch with your lecturer in the first instance. Alternatively, you may wish to contact your Programme Leader or Head of Department/School.
                            </p>
                            <p>
                                If you experience technical difficulties please visit: https://www.gre.ac.uk/it-and-library
                            </p>
                            <Divider sx={{ margin: '20px 0' }} />
                            <div className='course-item-title'>
                                <h2>Courseworks</h2>
                            </div>
                            <br />
                            <Accordion >
                                <AccordionSummary
                                    sx={{
                                        borderBottom: '3px solid #F11A7B'
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>Assignment 1 - Deadline: </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>Opened at: </p>
                                    <p>Deadline: </p>
                                    <h4>Submission Status</h4>
                                    <TableContainer component={Paper} className="submission-table" elevation={0} >
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
                                                <TableCell className="col-1">Time Remaining</TableCell>
                                                <TableCell className="col-2"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="col-1">Submission</TableCell>
                                                <TableCell className="col-2"><input type="file" name="" id="" /></TableCell>
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                    <br />
                                    <p>
                                        <span className="alert">*Note: </span> Any submission beyond the deadline for under 12 hours will be penalized and those that are later are not accepted.
                                    </p>
                                </AccordionDetails>
                            </Accordion>
                            <br />
                            <Accordion >
                                <AccordionSummary
                                    sx={{
                                        borderBottom: '3px solid #F11A7B'
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Assignment 2 - Deadline:</Typography>
                                </AccordionSummary>
                                <AccordionDetails></AccordionDetails>
                            </Accordion>
                            <br />
                            <Divider sx={{ margin: '20px 0' }} />
                            <div className='course-item-title'>
                                <h2>Materials</h2>
                            </div>
                            <br />
                            <Accordion TransitionProps={{ unmountOnExit: true }} >
                                <AccordionSummary
                                    sx={{
                                        borderBottom: '3px solid #F11A7B'
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>Slides</Typography>
                                </AccordionSummary>
                                <AccordionDetails></AccordionDetails>
                            </Accordion>
                            <br />
                            <Accordion TransitionProps={{ unmountOnExit: true }} >
                                <AccordionSummary
                                    sx={{
                                        borderBottom: '3px solid #F11A7B'
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>Assignment Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails></AccordionDetails>
                            </Accordion>
                            <br />
                            <Accordion TransitionProps={{ unmountOnExit: true }} >
                                <AccordionSummary
                                    sx={{
                                        borderBottom: '3px solid #F11A7B'
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>Notes & Guides</Typography>
                                </AccordionSummary>
                                <AccordionDetails></AccordionDetails>
                            </Accordion>
                            <br />
                        </Grid>
                    </Grid>
                </div>
            </div >
            <Hidden smUp>
                <br /><br /><br /><br />
            </Hidden>
            <Footer />
        </>
    )
}