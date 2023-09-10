import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, Typography, TableContainer, TableRow, TableCell, Table, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SubmmissionAccordion(props) {
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
                    <Typography>Assignment 1 - Deadline: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Opened at: </p>
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
        </>

    )
}