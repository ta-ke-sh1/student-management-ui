import { Grid } from "@mui/material";
import { useFetchHomeData } from "./hooks/useFetchHomeData";
import CoursesCards from "./coursesCards";
import Footer from "../../footer";
import { Link } from "react-router-dom";

export default function CommonHome() {
    const { coursesRegistration } = useFetchHomeData();

    const infomationAccessItems = [
        {
            id: 1,
            title: "View Weekly Schedule",
            banner: "image2.jpg",
            link: ""
        },
        {
            id: 2,
            title: "View Weekly Schedule",
            banner: "image3.jpg",
            link: ""
        },
        {
            id: 3,
            title: "View Weekly Schedule",
            banner: "image4.jpg",
            link: ""
        },
        {
            id: 4,
            title: "View Weekly Schedule",
            banner: "image5.jpg",
            link: ""
        }
    ]

    const regulationItems = [
        {
            id: 1,
            title: "Test Regulations",
            banner: "image2.jpg",
            link: ""
        },
        {
            id: 2,
            title: "University Code of Conduct",
            banner: "image3.jpg",
            link: ""
        },
        {
            id: 3,
            title: "Published Articles Awarding Regulations",
            banner: "image4.jpg",
            link: ""
        }
    ]

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
                        {infomationAccessItems.map((item) => <NavItem imageUrl={item.banner} title={item.title} />)}
                    </Grid>
                </div>
                <div className="relative-container w-100 mt-50">
                    <h1>Regulations</h1>
                    <Grid container spacing={3}>
                        {regulationItems.map((item) => <NavItem imageUrl={item.banner} title={item.title} />)}
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const NavItem = (props) => {
    return (
        <Grid item xs={12} md={3}>
            <Link to={props.link}>
                <div className="home-nav-btn">
                    <div className="nav-item-img" style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL + "/banner/" + props.imageUrl})`
                    }}></div>
                    <div className="nav-text">
                        {props.title}
                    </div>
                </div>
            </Link>
        </Grid>
    )
}
