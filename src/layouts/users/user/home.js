import { useEffect, useState } from "react";
import { Drawer, Box, Fab } from "@mui/material";
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
import ClassIcon from "@mui/icons-material/Class";
import { Main, drawerWidth } from "../../../common/drawer/drawer";
import CoursesUser from "./views/courses/courses";
import { ToastContainer, toast } from "react-toastify";

export default function UserHome(props) {
  const _container = window !== undefined ? () => window.document.body : undefined;
  const [current, setCurrent] = useState(props.index ?? 1);
  const [mobileOpen, setMobileOpen] = useState(true);

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
  };

  function handleSelectTab(index) {
    setCurrent(index);
  };

  const components = [
    <PersonalInfo sendToast={sendToast} handleSelectTab={handleSelectTab} />,
    <ScheduleHome sendToast={sendToast} handleSelectTab={handleSelectTab} />,
    <CurriculumTab sendToast={sendToast} handleSelectTab={handleSelectTab} />,
    <CoursesUser sendToast={sendToast} handleSelectTab={handleSelectTab} />,
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
                  }}
                >
                  <ListItemButton
                    sx={{
                      backgroundColor: tab.id === current ? "#F0F7FF" : "white",
                      borderRadius: "5px",
                    }}
                  >
                    <ListItemIcon sx={{ color: tab.id === current ? "#1976d2" : "#757575", padding: 0 }}>{tab.icon}</ListItemIcon>
                    <ListItemText sx={{ color: tab.id === current ? "#1976d2" : "#757575" }} primary={tab.name} />
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
          aria-label="mailbox folders"
        >
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
            anchor="left"
          >
            {drawer}
          </Drawer>
        </Box>
        <Main open={mobileOpen}>
          <div
            className="course-head-banner"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 5 + ".jpg)",
            }}
          ></div>
          <div className="admin-container">
            <div
              className="big-widget"
              style={{
                width: "97.5%",
                overflowY: "auto",
                padding: "20px",
              }}
            >
              {components[current]}
            </div>
          </div>
        </Main>
      </Box>

      <div className={"fab"}>
        <Fab onClick={handleDrawerToggle}>
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
            <g id="Menu / Hamburger_MD">
              <path id="Vector" d="M5 17H19M5 12H19M5 7H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </Fab>
      </div>

      <ToastContainer />
    </>
  );
}
