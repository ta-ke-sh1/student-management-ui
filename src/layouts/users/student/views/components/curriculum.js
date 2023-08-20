import { Box, Grid } from "@mui/material"
import { useEffect, useState } from "react"

export default function CurriculumTab() {

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        setSubjects([
            {
                id: "SSC101",
                name: "Business Communication",
                term: 1,
            },
            {
                id: "VIE1053",
                name: "Fundamental in IT",
                term: 1,
            },
            {
                id: "1619",
                name: "	Networking",
                term: 1,
            },
            {
                id: "1618",
                name: "Programming",
                term: 1,
            },
            {
                id: "1633",
                name: "Website Design & Development",
                term: 2,
            },
            {
                id: "1620",
                name: "Professional Practice",
                term: 2,
            },
            {
                id: "1622",
                name: "Data Structure & Algorithms",
                term: 2,
            },
            {
                id: "1631",
                name: "Managing a Successful Computing Project",
                term: 2,
            }
        ])
    }, [subjects])

    return (
        <>
            <div className="curriculum-container">
                <h2 className="bold" style={{
                    fontSize: '1.75rem',
                }}>Curriculum</h2>
                <div className="curriculum-row">
                    <Grid container>
                        <Grid item xs={2}>Index</Grid>
                        <Grid item xs={2}>Code</Grid>
                        <Grid item xs={6}>Name</Grid>
                        <Grid item xs={1}>Term</Grid>
                        <Grid item xs={1}>
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
                                <Grid item xs={2}>{index}</Grid>
                                <Grid item xs={2}>{subject.id}</Grid>
                                <Grid item xs={6}>{subject.name}</Grid>
                                <Grid item xs={1}>{subject.term}</Grid>
                                <Grid item justify="flex-end" xs={1}>
                                    <Box display="flex" justifyContent="flex-end">
                                        {subject.grade ? <>{subject.grade}</> : <>Not yet</>}
                                    </Box>
                                </Grid>
                            </Grid >
                        </div>

                    )
                })}
            </div>
        </>
    )
}