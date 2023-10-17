import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";

export default function ParticipantsTab(props) {
    const [participants, setParticipants] = useState([])

    useEffect(() => {
        setParticipants([
            {
                id: "trunght",
                firstName: "Trung",
                lastName: "Ha The",

            }, {
                id: "ducvm",
                firstName: "Duc",
                lastName: "Vu Minh",

            }, {
                id: "ductm",
                firstName: "Duc",
                lastName: "Trinh Minh",

            }, {
                id: "sonnt",
                firstName: "Son",
                lastName: "Nguyen The",

            },
        ])
    }, [])

    return (
        <div >
            <p>
                This site will provide you all the key information and learning resources for this module. Please ensure you familiarise yourself with the University of Greenwich Vietnam's Handbook where you will find all the information regarding the module, weekly schedule, assessments and more.
                If you have any questions or no content is being shown in this CMS Page, please get in touch with your lecturer in the first instance. Alternatively, you may wish to contact your Programme Leader or Head of Department/School.
            </p>
            <h2 className="bold" style={{
                fontSize: '1.75rem',
            }}>Participants</h2>

            <div className="curriculum-row" style={{
                paddingBottom: "10px",
                borderBottom: "1px solid black",
                marginBottom: "8px"
            }}>
                <Grid container>
                    <Grid item xs={1}>Index</Grid>
                    <Grid item xs={2}>Id</Grid>
                    <Grid item xs={2}>First Name</Grid>
                    <Grid item xs={2}>Last Name</Grid>
                    <Grid item xs={4}>Image</Grid>
                    <Grid item xs={1}>
                        <Box display="flex" justifyContent="flex-end">
                            Status
                        </Box>
                    </Grid>
                </Grid>
            </div>
            {participants.map((participant, index) => {
                return (
                    <div className="curriculum-row" style={{
                        marginBottom: '15px'
                    }}>
                        <Grid container>
                            <Grid item xs={1}>{index + 1}</Grid>
                            <Grid item xs={2}>{participant.id}</Grid>
                            <Grid item xs={2}>{participant.firstName}</Grid>
                            <Grid item xs={2} >{participant.lastName}</Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={1}>
                                <Box display="flex" justifyContent="flex-end">
                                    Activated
                                </Box>
                            </Grid>
                        </Grid >
                    </div>
                )
            })}
        </div >
    )
}