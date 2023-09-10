import { Grid, Divider } from "@mui/material"

export default function CourseForm(props) {
    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    maxWidth: "500px",
                }}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Join Course</h2>
                    <p>Join a course using the given code by your lecturer</p>
                </Grid>
                <Divider />
            </Grid>
        </>
    )
}