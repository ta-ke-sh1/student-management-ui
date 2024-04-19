import { useEffect, useState } from "react";
import { Grid, Box, Card } from "@mui/material";
import axios from "axios";
import { cacheData, getArrayCache, items, lecturerItems } from "../../utils/dataOptimizer";

export default function ParticipantsTab(props) {
    const course = props.course;

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        let data = getArrayCache(lecturerItems.Participants);
        if (data.length > 0) {
            setParticipants(data)
        } else {
            fetchParticipants();
        }

    }, [course]);

    function fetchParticipants() {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/participants?id=" + course.id).then((res) => {
                if (res.data.status) {
                    setParticipants(res.data.data);

                    cacheData(lecturerItems.Participants, res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            });
        } catch (e) {
            props.sendToast("error", e.toString())
        }
    }

    return (
        <div>
            <h2
                className="bold"
                style={{
                    fontSize: "1.75rem",
                }}>
                Participants
            </h2>
            <Grid container spacing={4}>
                {participants.map((participant, index) => {
                    console.log(participant)
                    return (
                        <Grid item sm={4}>
                            <Card sx={{ padding: '15px' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={3}>
                                        No. {index + 1}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {participant.student_id}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box display="flex"
                                            justifyContent="flex-end">
                                            {participant.status === true ? "Activated" : "Disabled"}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
