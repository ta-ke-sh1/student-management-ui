import { Grid } from "@mui/material";
import { useFetchHomeData } from "./hooks/useFetchHomeData";
import CoursesCards from "./coursesCards";
import Footer from "../../footer";

export default function CommonHome() {
    const { coursesRegistration } = useFetchHomeData();

    return (
        <div className="body">
            <div
                className="banner relative-container"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/banner/website.png"
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
            <div className="body-container">
                <div
                    className="relative-container w-90"
                    style={{
                        marginTop: "105vh",
                    }}>
                    <h1>Your Courses</h1>
                    <CoursesCards courses={coursesRegistration} />
                </div>
                <div className="relative-container w-100 mt-50">
                    <h1>Information Access</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    View Weekly Schedule
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    View Class Timetable
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    Attendance Report
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    Mark Report
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="relative-container w-100 mt-50">
                    <h1>Regulations</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    Test Regulations
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    University Code of Conduct
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="home-nav-btn">
                                <div className="nav-text">
                                    Published Articles Awarding Regulations
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    );
}
