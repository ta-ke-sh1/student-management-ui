import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, Typography, TableContainer, TableRow, TableCell, Table, Button, Modal, Dialog, DialogContent, Snackbar } from "@mui/material"
import { useFetchCourses } from "../users/student/hooks/useFetchCourse"
import { useState, useMemo, useEffect } from "react";
import { Drawer, Box, Fab } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import EventNoteIcon from '@mui/icons-material/EventNote';
import ViewListIcon from '@mui/icons-material/ViewList';
import { styled } from "@mui/material/styles";
import GradingIcon from '@mui/icons-material/Grading';

import { useAuth } from "../../hooks/auth/useAuth";
import { decodeToken } from "../../utils/utils";
import CourseworkTab from "./courseworkTab";
import CourseworkFormModal from "./components/modal/coursework_form_modal";
import CourseworkMaterialModal from "./components/modal/coursework_material_modal";
import { useParams } from "react-router-dom";
import axios from "axios";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleTab from "./scheduleTab";
import ParticipantsTab from "./participants.Tab";

const drawerWidth = 240;

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

export default function CourseUser() {
    const auth = useAuth()
    const decoded = useMemo(() => decodeToken(auth.token), [auth])
    const { id } = useParams();

    const [openToast, setOpenToast] = useState(false);
    const [error, setError] = useState("")

    const _container =
        window !== undefined ? () => window.document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(true);
    // const { courseData } = useFetchCourses("test");
    const [current, setCurrent] = useState(1);

    const [openCourseworkModal, setOpenCourseworkModal] = useState(false)
    const [openMaterialModal, setOpenMaterialModal] = useState(false)

    const memo_course = useMemo(() => fetchCourse(), [id])



    useEffect(() => {
        console.log(id)
        fetchCourse();

        console.log(memo_course)
    }, [])



    function fetchCourse() {
        let c = {};
        axios.get(process.env.REACT_APP_HOST_URL + "/course/details/?id=" + id).then((res) => {
            if (res.data.status) {
                c = res.data.data
                setCourse(res.data.data)
            } else {
                setError(res.data.data)
                setOpenToast(true)
            }
        })

        return c;
    }

    const [course, setCourse] = useState({});

    const handleOpenCourseworkModal = () => {
        setOpenCourseworkModal(true)
    }

    const handleOpenMaterialModal = () => {
        setOpenMaterialModal(true)
    }

    const components = [
        <CourseworkTab decoded={decoded} course={course} handleOpenCourseworkModal={handleOpenCourseworkModal} handleOpenMaterialModal={handleOpenMaterialModal} />,
        <ScheduleTab />,
        <ParticipantsTab />
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const nav_tabs = [
        {
            title: "Navigation",
            tabs: [
                {
                    name: "Coursework",
                    id: 0,
                    icon: <GradingIcon />,
                },
                {
                    name: "Schedule",
                    id: 1,
                    icon: <EventNoteIcon />,
                },
                {
                    name: "Participants",
                    id: 2,
                    icon: <ViewListIcon />,
                },
            ],
        },
    ]

    const drawer = (
        <div className="drawer">
            <Toolbar />
            {
                nav_tabs.map((tab) => {
                    return (
                        <>
                            <h3>{tab.title}</h3>
                            {
                                tab.tabs.map((tab) =>
                                    <>
                                        <ListItem
                                            sx={{
                                                padding: '5px 10px',
                                            }}
                                            key={tab.name}
                                            onClick={() => {
                                                setCurrent(tab.id);
                                            }}>
                                            <ListItemButton sx={{
                                                backgroundColor: tab.id === current ? '#F0F7FF' : 'white',
                                                borderRadius: '5px'
                                            }}>
                                                <ListItemIcon sx={{ color: tab.id === current ? '#1976d2' : '#757575', padding: 0 }}>{tab.icon}</ListItemIcon>
                                                <ListItemText sx={{ color: tab.id === current ? '#1976d2' : '#757575' }} primary={tab.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                            }
                        </>
                    )
                })
            }
        </div>
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Snackbar open={openToast} message={error} autoHideDuration={2000} action={action} />
            <Box sx={{ display: "flex" }} style={{ zIndex: -1 }}>
                <Box
                    component="nav"
                    sx={{
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
                    <div className="course-head-banner" style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
                    }}>
                    </div>
                    <div className="admin-container">
                        <div className="big-widget" style={{
                            width: '97.5%',
                            overflowY: 'auto',
                            padding: '20px'
                        }}>
                            <div className="serif" style={{
                                fontSize: '3rem',
                            }}>
                                {course.group} - {course.lecturer} - {course.name}
                            </div>
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
            <Dialog
                maxWidth="md"
                open={openCourseworkModal}
                onClose={() => setOpenCourseworkModal(false)}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}
                    className={"modal"}>
                    <CourseworkFormModal closeHandler={() => setOpenCourseworkModal(false)} />
                </DialogContent>
            </Dialog>
            <Dialog
                className="modal"
                fullWidth={true}
                open={openMaterialModal}
                onClose={() => setOpenMaterialModal(false)}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}
                    className={"modal"}>
                    <CourseworkMaterialModal closeHandler={() => setOpenMaterialModal(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}

