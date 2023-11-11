import { useEffect, useState } from "react";
import { Grid, Box, Card } from "@mui/material";

export default function ParticipantsTab(props) {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        setParticipants([
            {
                id: "trunght",
                firstName: "Trung",
                lastName: "Ha The",
            },
            {
                id: "ducvm",
                firstName: "Duc",
                lastName: "Vu Minh",
            },
            {
                id: "ductm",
                firstName: "Duc",
                lastName: "Trinh Minh",
            },
            {
                id: "sonnt",
                firstName: "Son",
                lastName: "Nguyen The",
            },
        ]);
    }, []);

    return (
        <div>
            <h2
                className="bold"
                style={{
                    fontSize: "1.75rem",
                }}>
                Participants
            </h2>

            <div
                className="curriculum-row"
                style={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid black",
                    marginBottom: "8px",
                }}>
                <Grid container>
                    <Grid item xs={1}>
                        Index
                    </Grid>
                    <Grid item xs={2}>
                        Id
                    </Grid>
                    <Grid item xs={2}>
                        First Name
                    </Grid>
                    <Grid item xs={2}>
                        Last Name
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={1}>
                        <Box display="flex" justifyContent="flex-end">
                            Status
                        </Box>
                    </Grid>
                </Grid>
            </div>
            {participants.map((participant, index) => {
                return (
                    <div
                        className="curriculum-row"
                        style={{
                            marginBottom: "15px",
                        }}>
                        <Card
                            sx={{
                                padding: "20px",
                            }}>
                            <Grid container alignItems="center">
                                <Grid item xs={1}>
                                    {index + 1}
                                </Grid>
                                <Grid item xs={2}>
                                    {participant.id}
                                </Grid>
                                <Grid item xs={2}>
                                    {participant.firstName}
                                </Grid>
                                <Grid item xs={2}>
                                    {participant.lastName}
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={1}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end">
                                        Activated
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
