import { Grid } from "@mui/material";
import { useFetchHomeData } from "./hooks/useFetchHomeData";
import CoursesCards from "./coursesCards";

export default function CommonHome() {
    const { coursesRegistration } = useFetchHomeData();

    return (
        <div className="body">
            <div
                className="banner relative-container"
                style={{
                    backgroundImage: `url(${
                        process.env.PUBLIC_URL + "/banner/website.png"
                    })`,
                }}>
                <div className="relative-container">
                    <div className="intro-text">
                        <div className="intro-headlines medium">Welcome to</div>
                        <div className="intro-headlines bold">
                            University of Greenwich Vietnam
                        </div>
                        <div className="intro-headlines medium">
                            Student Portal
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="relative-container w-90"
                style={{
                    marginTop: "100vh",
                }}>
                <div className="ml-75">
                    <h1>Courses & Schedule</h1>
                    <CoursesCards courses={coursesRegistration} />
                </div>
            </div>
            <div className="relative-container w-100 mt-50">
                <div className="ml-75">
                    <h1>Reports</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                    </Grid>
                </div>
            </div>
            <div className="relative-container w-100 mt-50">
                <div className="ml-75">
                    <h1>Registration & Feedback</h1>
                    <Grid container>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                    </Grid>
                </div>
            </div>
            <div className="relative-container w-100 mt-50">
                <div className="ml-75">
                    <h1>Information Access</h1>
                    <Grid container>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                    </Grid>
                </div>
            </div>
            <div className="relative-container w-100 mt-200">
                <div className="ml-75">
                    <h1>Regulations</h1>
                    <Grid container>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}></Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
