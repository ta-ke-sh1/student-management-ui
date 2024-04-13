import { useEffect, useState } from "react";
import { Drawer, Box, Fab, Card, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonalInfo from "./views/personalInfo/personalInfo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduleHome from "./views/schedule/schedule";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ViewListIcon from "@mui/icons-material/ViewList";
import CurriculumTab from "./views/curriculum/curriculum";
import { Main, drawerWidth } from "../../../common/drawer/drawer";
import CoursesUser from "./views/courses/courses";
import { ToastContainer, toast } from "react-toastify";
import AttendaceTab from "./views/attendance/attendance";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import RequestsTab from "./views/request/requests";
import ArchiveIcon from "@mui/icons-material/Archive";
import { decodeToken } from "../../../utils/utils";
import AttendanceTab from "../../course/attendanceTab";

export default function UserHome(props) {
    const token = decodeToken(localStorage.getItem("access_token"));
    const _container =
        window !== undefined ? () => window.document.body : undefined;
    const [current, setCurrent] = useState(props.index ?? 2);
    const [mobileOpen, setMobileOpen] = useState(true);

    const [course, setCourse] = useState({});

    const nav_tabs =
        token.role === 1
            ? [
                  {
                      title: "Navigation",
                      tabs: [
                          {
                              name: "Home",
                              id: 0,
                              icon: <HomeIcon />,
                          },
                          {
                              name: "Personal Info",
                              id: 1,
                              icon: <AccountCircleIcon />,
                          },
                          {
                              name: "Schedule",
                              id: 2,
                              icon: <EventNoteIcon />,
                          },
                          {
                              name: "Curriculum",
                              id: 3,
                              icon: <ViewListIcon />,
                          },
                          {
                              name: "Requests",
                              id: 4,
                              icon: <ArchiveIcon />,
                          },
                      ],
                  },
              ]
            : [
                  {
                      title: "Navigation",
                      tabs: [
                          {
                              name: "Home",
                              id: 0,
                              icon: <HomeIcon />,
                          },
                          {
                              name: "Personal Info",
                              id: 1,
                              icon: <AccountCircleIcon />,
                          },
                          {
                              name: "Schedule",
                              id: 2,
                              icon: <EventNoteIcon />,
                          },
                          {
                              name: "Requests",
                              id: 4,
                              icon: <ArchiveIcon />,
                          },
                      ],
                  },
              ];

    function sendToast(type, message) {
        const opt = {
            position: "bottom-left",
        };
        switch (type) {
            case "error":
                toast.error(message, opt);
                break;
            case "success":
                toast.success(message, opt);
                break;
            default:
                toast(message, opt);
                break;
        }
    }

    function handleSelectTab(index) {
        setCurrent(index);
    }

    function handleChangeAttendance() {
        setCurrent(5);
    }

    const components = [
        <CoursesUser sendToast={sendToast} handleSelectTab={handleSelectTab} />,
        <PersonalInfo
            sendToast={sendToast}
            handleSelectTab={handleSelectTab}
        />,
        <ScheduleHome
            handleChangeAttendance={handleChangeAttendance}
            sendToast={sendToast}
            handleSelectTab={handleSelectTab}
        />,
        <CurriculumTab
            sendToast={sendToast}
            handleSelectTab={handleSelectTab}
        />,
        <RequestsTab sendToast={sendToast} handleSelectTab={handleSelectTab} />,
        <AttendanceTab
            course={course}
            handleSelectTab={handleSelectTab}
            sendToast={sendToast}
        />,
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="drawer">
            <Toolbar />
            {nav_tabs.map((tab) => {
                return (
                    <>
                        <h3>{tab.title}</h3>
                        {tab.tabs.map((tab) => (
                            <>
                                <ListItem
                                    sx={{
                                        padding: "5px 10px",
                                    }}
                                    key={tab.name}
                                    onClick={() => {
                                        handleSelectTab(tab.id);
                                    }}>
                                    <ListItemButton
                                        sx={{
                                            backgroundColor:
                                                tab.id === current
                                                    ? "#F0F7FF"
                                                    : "white",
                                            borderRadius: "5px",
                                        }}>
                                        <ListItemIcon
                                            sx={{
                                                color:
                                                    tab.id === current
                                                        ? "#1976d2"
                                                        : "#757575",
                                                padding: 0,
                                            }}>
                                            {tab.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{
                                                color:
                                                    tab.id === current
                                                        ? "#1976d2"
                                                        : "#757575",
                                            }}
                                            primary={tab.name}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}
                    </>
                );
            })}
        </div>
    );

    return (
        <>
            <Box sx={{ display: "flex" }} style={{ zIndex: -1 }}>
                <Box
                    component="nav"
                    sx={{
                        zIndex: 10,
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders">
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
                                marginTop: "20px",
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
                        className="course-head-banner"
                        style={{
                            backgroundImage:
                                `url(${process.env.PUBLIC_URL}/banner/banner` +
                                5 +
                                ".jpg)",
                        }}></div>
                    <div className="admin-container">
                        <div
                            className="big-widget"
                            style={{
                                width: "97.5%",
                                overflowY: "auto",
                                padding: "20px",
                            }}>
                            {components[current]}
                        </div>
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

            <ToastContainer />
        </>
    );
}
