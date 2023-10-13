import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, Typography, TableContainer, TableRow, TableCell, Table, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { fromMilisecondsToDateString, subtractTime } from "../../../utils/utils";
import axios from "axios";

export default function SubmmissionAccordion(props) {

    const [submission, setSubmission] = useState({})
    const [file, setFile] = useState(undefined)

    const remainingTime = subtractTime(new Date() / 1000, props.assignment.deadline);
    const openTime = props.assignment.start - (new Date() / 1000)
    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST_URL + "/submission?id=" + props.course.id + "&user=" + props.decoded.user + "&assignment=" + props.assignment.id).then((res) => {
            console.log(res.data)
            if (res.data.status) {
                console.log(res.data.data)
                setSubmission(res.data.data)
            }
        })
    }, [])

    return (
        <>
            <Accordion >
                <AccordionSummary
                    sx={{
                        borderBottom: '3px solid #F11A7B'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>{props.assignment.id} - Deadline: {fromMilisecondsToDateString(props.assignment.deadline * 1000)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>Submission Status</h4>
                    <TableContainer component={Paper} className="submission-table" elevation={0} >
                        <Table fullWidth>
                            <TableRow>
                                <TableCell className="col-1">Submission Status</TableCell>
                                <TableCell className="col-2">{submission.status ?? "Not submitted"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="col-1">Grading Status</TableCell>
                                <TableCell className="col-2">{submission.grade ?? "Not graded"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="col-1">Open time</TableCell>
                                <TableCell className="col-2">{fromMilisecondsToDateString(props.assignment.start * 1000)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="col-1">Time Remaining</TableCell>
                                <TableCell className="col-2">{remainingTime}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="col-1">Submission</TableCell>
                                <TableCell className="col-2"><input type="file" name="" id="" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="col-1"></TableCell>
                                <TableCell className="col-2">{
                                    openTime < 0 ?
                                        <Button variant="contained">Submit</Button> : <Button variant="contained" disabled={true}>Not yet open for submission</Button>
                                }</TableCell>
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
        </>

    )
}