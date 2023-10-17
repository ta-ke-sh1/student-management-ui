import { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { fromMilisecondsToDisplayFormatDateString } from "../../utils/utils";

export default function ScheduleTab(props) {

    const [schedules, setSchedules] = useState([{
        session: 1,
        lecturer: "tungdt",
        date: 1697553920,
        slot: 2,
    }, {
        session: 2,
        lecturer: "tungdt",
        date: 1697553920,
        slot: 3,
    }, {
        session: 3,
        lecturer: "tungdt",
        date: 1697640320,
        slot: 2,
    }, {
        session: 4,
        lecturer: "tungdt",
        date: 1697640320,
        slot: 3,
    }])

    const [participants, setParticipants] = useState([{
        id: "trunght",
        firstName: "Trung",
        lastName: "Ha The"
    }])

    useEffect(() => {

    }, [])

    const takeAttendance = () => {

    }

    return (
        <div >
            <p>
                This site will provide you all the key information and learning resources for this module. Please ensure you familiarise yourself with the University of Greenwich Vietnam's Handbook where you will find all the information regarding the module, weekly schedule, assessments and more.
                If you have any questions or no content is being shown in this CMS Page, please get in touch with your lecturer in the first instance. Alternatively, you may wish to contact your Programme Leader or Head of Department/School.
            </p>
            <h2 className="bold" style={{
                fontSize: '1.75rem',
            }}>Schedules</h2>

            <div className="curriculum-row" style={{
                paddingBottom: "10px",
                borderBottom: "1px solid black",
                marginBottom: "8px"
            }}>
                <Grid container>
                    <Grid item xs={2}>Session Number</Grid>
                    <Grid item xs={3}>Lecturer</Grid>
                    <Grid item xs={2}>Date</Grid>
                    <Grid item xs={2}>Slot Number</Grid>
                    {<Grid item xs={3}>
                        <Box display="flex" justifyContent="flex-end">
                            Action
                        </Box>
                    </Grid>}
                </Grid>
            </div>
            {schedules.map((schedule, index) => {
                return (
                    <div className="curriculum-row" style={{
                        marginBottom: '15px'
                    }}>
                        <Grid container>
                            <Grid item xs={2}>{schedule.session}</Grid>
                            <Grid item xs={3}>{schedule.lecturer}</Grid>
                            <Grid item xs={2}>{fromMilisecondsToDisplayFormatDateString(schedule.date * 1000)}</Grid>
                            <Grid item xs={2}>{schedule.slot}</Grid>
                            {<Grid item xs={3}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button onClick={takeAttendance} variant="contained">Take Attendance</Button>
                                </Box>
                            </Grid>}
                        </Grid >
                    </div>
                )
            })}
        </div >
    )
}