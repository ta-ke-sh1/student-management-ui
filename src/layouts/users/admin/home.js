import { Drawer, Grid, Box, Button, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MailIcon from "@mui/icons-material/Mail";
import CampusAdmin from "./components/campus";
import CourseAdmin from "./components/course";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

export default function AdminHome() {
    const _container =
        window !== undefined ? () => window.document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [current, setCurrent] = useState(0);

    const facilities_tabs = [
        {
            name: "Facilities",
            id: 0,
            icon: <InboxIcon />,
        },
        {
            name: "Users",
            id: 1,
            icon: <InboxIcon />,
        },
        {
            name: "Classes",
            id: 2,
            icon: <InboxIcon />,
        },
    ];

    const scheduling_tabs = [
        {
            name: "Registrations",
            id: 3,
            icon: <InboxIcon />,
        },
        {
            name: "Semesters",
            id: 4,
            icon: <InboxIcon />,
        },
    ];

    const courses_tabs = [
        {
            name: "List",
            id: 5,
            icon: <InboxIcon />,
        },
        {
            name: "Schedules",
            id: 6,
            icon: <InboxIcon />,
        },
        {
            name: "Grades",
            id: 7,
            icon: <InboxIcon />,
        },
    ];

    const components = [<CampusAdmin />, <CourseAdmin />, <h1>Class 3</h1>];

    const drawer = (
        <div className="drawer">
            <Toolbar />
            <h3>Facilities</h3>
            <List>
                {facilities_tabs.map((tab, index) => (
                    <ListItem
                        key={tab.name}
                        disablePadding
                        onClick={() => {
                            console.log(tab.id);
                            setCurrent(tab.id);
                        }}>
                        <ListItemButton>
                            <ListItemIcon>{tab.icon}</ListItemIcon>
                            <ListItemText primary={tab.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <h3>Scheduling</h3>
            <List>
                {scheduling_tabs.map((tab, index) => (
                    <ListItem
                        key={tab.name}
                        disablePadding
                        onClick={() => setCurrent(tab.id)}>
                        <ListItemButton>
                            <ListItemIcon>{tab.icon}</ListItemIcon>
                            <ListItemText primary={tab.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <h3>Courses</h3>
            <List>
                {courses_tabs.map((tab, index) => (
                    <ListItem
                        key={tab.name}
                        disablePadding
                        onClick={() => setCurrent(tab.id)}>
                        <ListItemButton>
                            <ListItemIcon>{tab.icon}</ListItemIcon>
                            <ListItemText primary={tab.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Box sx={{ display: "flex" }} style={{ zIndex: -1 }}>
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        elevation={0}
                        container={_container}
                        open={mobileOpen}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                                borderWidth: 0,
                                marginTop: "70px",
                            },
                            border: "none",
                        }}
                        variant="persistent"
                        anchor="left">
                        {drawer}
                    </Drawer>
                </Box>
                <Main open={mobileOpen}>
                    <div
                        className="admin-container"
                        style={{
                            marginTop: "120px",
                        }}>
                        {components[current]}
                    </div>
                </Main>
            </Box>

            <div className={"fab"}>
                <Fab onClick={handleDrawerToggle}>
                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none">
                        <g id="Menu / Hamburger_MD">
                            <path
                                id="Vector"
                                d="M5 17H19M5 12H19M5 7H19"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </Fab>
            </div>
        </>
    );
}
