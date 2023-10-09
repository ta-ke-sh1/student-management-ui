import { useEffect, useState } from "react";
import { Grid, Hidden, IconButton, Tooltip } from "@mui/material";
import { Drawer, Box, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonalInfo from "./views/components/personalInfo"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleHome from "./views/components/schedule/schedule";
import EventNoteIcon from '@mui/icons-material/EventNote';
import ViewListIcon from '@mui/icons-material/ViewList';
import CurriculumTab from "./views/components/curriculum";
import ClassIcon from '@mui/icons-material/Class';

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

export default function UserHome(props) {
    const _container =
        window !== undefined ? () => window.document.body : undefined;
    const [current, setCurrent] = useState(props.index ?? 0)
    const [mobileOpen, setMobileOpen] = useState(true);

    const components = [
        <PersonalInfo />,
        <ScheduleHome />,
        <CurriculumTab />,
    ];

    const nav_tabs = [
        {
            title: "Navigation",
            tabs: [
                {
                    name: "Personal Info",
                    id: 0,
                    icon: <AccountCircleIcon />,
                },
                {
                    name: "Schedule",
                    id: 1,
                    icon: <EventNoteIcon />,
                },
                {
                    name: "Curriculum",
                    id: 2,
                    icon: <ViewListIcon />,
                },
                {
                    name: "Courses",
                    id: 3,
                    icon: <ClassIcon />,
                },
            ],
        },
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
        </>
    )
}
